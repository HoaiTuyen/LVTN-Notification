import { systemLogin } from "../servicers/AuthServicer";

export const handleLogin = async (username, password, navigate) => {
  try {
    const response = await systemLogin(username, password);

    if (response?.data?.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      const tokenPayload = JSON.parse(
        atob(response.data.access_token.split(".")[1])
      );
      const roles = tokenPayload.role || [];
      const authority =
        roles.length > 0 ? roles[0].authority.toLowerCase() : "student";

      if (authority === "admin") {
        navigate("/admin");
      } else if (authority === "lecturer") {
        navigate("/giang-vien");
      } else if (authority === "student") {
        navigate("/sinh-vien");
      } else {
        throw new Error("Unknown user role");
      }
      return response;
    }
  } catch (error) {
    if (error) {
      const errMsg = error.response?.data?.message || "Đăng nhập thất bại";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleLogout = (navigate) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  navigate("/");
};
