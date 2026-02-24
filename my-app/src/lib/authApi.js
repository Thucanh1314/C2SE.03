export const loginApi = async (email, password) => {
  // mock API
  if (email === "test@gmail.com" && password === "123456") {
    return {
      id: 1,
      name: "Test User",
      email,
      token: "fake-jwt-token",
    };
  }
  throw new Error("Sai email hoặc mật khẩu");
};

export const registerApi = async (name, email, password) => {
  // mock API
  return {
    id: Date.now(),
    name,
    email,
    token: "fake-jwt-token",
  };
};