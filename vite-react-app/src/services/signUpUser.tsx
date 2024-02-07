import { OPTIONS } from "../services/Options";
import axios from "axios";
import { URLS } from "./URLS";

const options: any = OPTIONS.jwtOptions;

export async function signUpUser(formData: any, uniqueRoleId: any) {
  options.url = URLS.signUp;
  options.data = JSON.stringify({
    email: formData.get("email"),
    password: formData.get("password"),
    role: uniqueRoleId,
  });

  try {
    const response = await axios.request(options);
    return response.data.token;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
}
