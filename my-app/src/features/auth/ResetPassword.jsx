// import { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";

// export default function ResetPassword() {
//   const [params] = useSearchParams();
//   const token = params.get("token");
//   const navigate = useNavigate();

//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!password || !confirm) {
//       return setError("Vui lòng nhập đầy đủ thông tin");
//     }

//     if (password.length < 6) {
//       return setError("Mật khẩu phải ít nhất 6 ký tự");
//     }

//     if (password !== confirm) {
//       return setError("Mật khẩu nhập lại không khớp");
//     }

//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:5000/api/auth/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           token,
//           newPassword: password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Đổi mật khẩu thất bại");
//       } else {
//         setSuccess("Đổi mật khẩu thành công! Đang chuyển về đăng nhập...");
//         setTimeout(() => navigate("/login"), 1500);
//       }
//     } catch (err) {
//       setError("Không kết nối được tới server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page">
//       <div className="auth-card">
//         <h2 style={{ color: "#fff", marginBottom: 12 }}>Đặt lại mật khẩu</h2>

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <input
//             type="password"
//             placeholder="Mật khẩu mới"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Nhập lại mật khẩu"
//             value={confirm}
//             onChange={(e) => setConfirm(e.target.value)}
//           />

//           {error && <div className="error-text">{error}</div>}
//           {success && (
//             <div style={{ color: "#9dffb0", fontSize: 13 }}>{success}</div>
//           )}

//           <button type="submit" disabled={loading}>
//             {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirm) {
      return setError("Vui lòng nhập đầy đủ thông tin");
    }

    if (!token) {
      return setError("Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn");
    }

    if (password.length < 6) {
      return setError("Mật khẩu phải ít nhất 6 ký tự");
    }

    if (password !== confirm) {
      return setError("Mật khẩu nhập lại không khớp");
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (e) {
  console.log("Response không phải JSON:", e);
}

      if (!res.ok) {
        setError(data.message || "Đổi mật khẩu thất bại");
      } else {
        setSuccess("Đổi mật khẩu thành công! Đang chuyển về đăng nhập...");
        setTimeout(() => navigate("/"), 1500); // vì bạn đang dùng mode login
      }
    } catch (e) {
      console.log(e);
      setError("Không kết nối được tới server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="auth-card">
        <h2 style={{ color: "#fff", marginBottom: 12 }}>Đặt lại mật khẩu</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && <div className="error-text">{error}</div>}
          {success && (
            <div style={{ color: "#9dffb0", fontSize: 13 }}>{success}</div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
}