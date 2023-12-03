import { jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken(), { header: true });
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = jwtDecode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    if (window.location.pathname === "/account") {
      window.location.assign("/");
      return;
    }
    window.location.reload();
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}
const Auth = new AuthService();

export default Auth;
