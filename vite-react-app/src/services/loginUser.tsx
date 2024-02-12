import { OPTIONS } from "../services/Options";
import axios from "axios";
import { URLS } from "./URLS";

const options: any = OPTIONS.jwtOptions;

export async function loginUser(email: any, password: any) {
  options.url = URLS.login;
  options.data = JSON.stringify({
    email: email,
    password: password,
  });

  try {
    const response = await axios.request(options);
    return response.data.token;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
}
