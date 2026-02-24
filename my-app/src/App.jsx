// import { useState } from "react";
// import "./App.css";

// import Login from "./features/auth/Login";
// import Register from "./features/auth/Register";
// import ForgotPassword from "./features/auth/ForgotPassword";
// import { useAuth } from "./context/AuthContext";

// function App() {
//   const { user, logout } = useAuth();
//   const [mode, setMode] = useState("login"); 
//   // login | register | forgot

//   return (
//     <div className="page">
//       <div className="auth-card">
//         {user ? (
//           <>
//             <h2>Xin chào, {user.name} 👋</h2>
//             <p>Email: {user.email}</p>
//             <button onClick={logout}>Đăng xuất</button>
//           </>
//         ) : (
//           <>
//             {mode === "login" && <Login onForgot={() => setMode("forgot")} />}
//             {mode === "register" && <Register />}
//             {mode === "forgot" && <ForgotPassword onBack={() => setMode("login")} />}

//             {mode !== "forgot" && (
//               <p className="switch">
//                 {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
//                 <button
//                   onClick={() => setMode(mode === "login" ? "register" : "login")}
//                 >
//                   {mode === "login" ? "Đăng ký" : "Đăng nhập"}
//                 </button>
//               </p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";   // 👈 thêm file này
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, logout } = useAuth();
  const [mode, setMode] = useState("login"); 
  // login | register | forgot

  return (
    <Routes>
      {/* Trang auth (login / register / forgot) */}
      <Route
        path="/"
        element={
          <div className="page">
            <div className="auth-card">
              {user ? (
                <>
                  <h2>Xin chào, {user.name} 👋</h2>
                  <p>Email: {user.email}</p>
                  <button onClick={logout}>Đăng xuất</button>
                </>
              ) : (
                <>
                  {mode === "login" && <Login onForgot={() => setMode("forgot")} />}
                  {mode === "register" && <Register />}
                  {mode === "forgot" && (
                    <ForgotPassword onBack={() => setMode("login")} />
                  )}

                  {mode !== "forgot" && (
                    <p className="switch">
                      {mode === "login"
                        ? "Chưa có tài khoản?"
                        : "Đã có tài khoản?"}
                      <button
                        onClick={() =>
                          setMode(mode === "login" ? "register" : "login")
                        }
                      >
                        {mode === "login" ? "Đăng ký" : "Đăng nhập"}
                      </button>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        }
      />

      {/* Trang reset password mở từ link email */}
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Mấy route linh tinh → đá về trang chủ */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;