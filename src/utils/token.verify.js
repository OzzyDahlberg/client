// Function to validate the token
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  try {
    // Decode the JWT
    const decoded = jwtDecode(token);

    // Check if the token has expired (exp is in seconds, so multiply by 1000)
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    if (error) {
      return false;
    }
    return false;
  }
};

export default isTokenValid;
