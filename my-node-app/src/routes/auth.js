const express = require("express");
const bcrypt = require("bcrypt"); 
const { v4: uuidv4 } = require("uuid");
const { sql, connectDB } = require("../config/mssql");
const { sendMail } = require("../utils/sendMail");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Thiếu email" });

    const pool = await connectDB();

    // Tìm user
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT UserId, email FROM Users WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    // Tạo token
    const token = uuidv4();
    const expire = new Date(Date.now() + 15 * 60 * 1000);

    // Lưu token
    await pool
      .request()
      .input("token", sql.VarChar, token)
      .input("expire", sql.DateTime, expire)
      .input("email", sql.VarChar, email)
      .query(`
       UPDATE Users SET resetToken = @token, resetTokenExpire = @expire WHERE email = @email
      `);

    // 4️⃣ Gửi mail
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    await sendMail({
      to: email,
      subject: "Đặt lại mật khẩu",
      html: `
        <h3>Đặt lại mật khẩu</h3>
        <p>Bấm link dưới đây để đặt lại mật khẩu (hết hạn sau 15 phút):</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.json({ message: "Đã gửi email reset mật khẩu" });
  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Thiếu token hoặc mật khẩu mới" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Mật khẩu phải ít nhất 6 ký tự" });
    }

    const pool = await connectDB();

    // 1️⃣ Tìm user theo token
    const result = await pool
      .request()
      .input("token", sql.VarChar, token)
      .query(`
        SELECT UserId, resetTokenExpire
        FROM Users
        WHERE resetToken = @token
      `);

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: "Token không hợp lệ" });
    }

    const user = result.recordset[0];

    // 2️⃣ Check hết hạn
    if (!user.resetTokenExpire || new Date(user.resetTokenExpire) < new Date()) {
      return res.status(400).json({ message: "Token đã hết hạn" });
    }

    // 3️⃣ Hash mật khẩu
    const hashed = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Update password + clear token
    await pool
      .request()
      .input("hashed", sql.VarChar, hashed)
      .input("userId", sql.NVarChar, user.UserId) // 🔥 NVARCHAR đúng với DB
      .query(`
        UPDATE Users
        SET Password = @hashed,
            resetToken = NULL,
            resetTokenExpire = NULL,
            UpdatedAt = GETDATE()
        WHERE UserId = @userId
      `);

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;