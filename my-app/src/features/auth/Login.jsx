// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext";

// function randomCaptcha() {
//   return Math.random().toString(36).substring(2, 7).toUpperCase();
// }

// export default function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [captcha, setCaptcha] = useState(randomCaptcha());
//   const [captchaInput, setCaptchaInput] = useState("");

//   const reloadCaptcha = () => {
//     setCaptcha(randomCaptcha());
//     setCaptchaInput("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (captchaInput !== captcha) {
//       alert("Captcha sai!");
//       reloadCaptcha();
//       return;
//     }

//     login({ name: "User", email });
//   };

//   return (
//     <>
//       <h2>Đăng nhập</h2>

//       <form className="auth-form" onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Mật khẩu"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {/* CAPTCHA ROW */}
//         <div className="captcha-row">
//           <div className="captcha-code">{captcha}</div>

//           <button
//             type="button"
//             className="refresh-captcha"
//             onClick={reloadCaptcha}
//             title="Tải lại captcha"
//           >
//             ↻
//           </button>
//            <input
//           type="text"
//           placeholder="Nhập captcha"
//           value={captchaInput}
//           onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
//           required
//         />
//         </div>

       

//         <button type="submit">Đăng nhập</button>
//       </form>
//     </>
//   );
// }

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function randomCaptcha() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

export default function Login({ onForgot }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(randomCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

  const reloadCaptcha = () => {
    setCaptcha(randomCaptcha());
    setCaptchaInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      alert("Captcha sai!");
      reloadCaptcha();
      return;
    }

    login({ name: "User", email });
  };

  return (
    <>
      <h2>Đăng nhập</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* CAPTCHA ROW */}
        <div className="captcha-row">
          <div className="captcha-code">{captcha}</div>

          <button
            type="button"
            className="refresh-captcha"
            onClick={reloadCaptcha}
            title="Tải lại captcha"
          >
            ↻
          </button>

          <input
            className="captcha-input"
            type="text"
            placeholder="Nhập captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
            required
          />
        </div>

        {/* Quên mật khẩu */}
        <p className="forgot-password">
          <button type="button" onClick={onForgot}>
            Quên mật khẩu?
          </button>
        </p>

        <button type="submit">Đăng nhập</button>
      </form>
    </>
  );
}