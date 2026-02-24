// import { useState } from "react";

// export default function ForgotPassword({ onBack }) {
//   const [email, setEmail] = useState("");
//   const [step, setStep] = useState(1); // 1: nhập email | 2: thông báo thành công

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setStep(2); // fake gửi mail thành công
//   };

//   return (
//     <>
//       <h2>Quên mật khẩu</h2>

//       {step === 1 ? (
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Nhập email để khôi phục mật khẩu"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <button type="submit">Nhận mã qua email</button>

//           <p className="switch">
//             <button type="button" onClick={onBack}>
//               Quay lại đăng nhập
//             </button>
//           </p>
//         </form>
//       ) : (
//         <div className="success-box">
//           <p>Link đặt lại mật khẩu đã được gửi về email:</p>
//           <b>{email}</b>

//           <button className="back-btn" onClick={onBack}>
//             Quay lại đăng nhập
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

import { useState } from "react";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        // Backend không trả JSON
        console.error("Response is not JSON", jsonErr);
      }

      if (!res.ok) {
        setError(data?.message || "Gửi email thất bại. Kiểm tra backend.");
        return;
      }

      setMessage("Đã gửi email khôi phục mật khẩu. Vào mail kiểm tra nha 📩");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Không kết nối được tới server (http://localhost:5000)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Quên mật khẩu</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Nhập email đã đăng ký"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Đang gửi..." : "Gửi link khôi phục"}
        </button>
      </form>

      <p className="switch">
        <button type="button" onClick={onBack}>
          ← Quay lại đăng nhập
        </button>
      </p>
    </>
  );
}