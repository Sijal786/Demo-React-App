import { useQuery } from "react-query";
import axios from "axios";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";

const loginUser = (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) => {
  return axios.post(
    URLS.login,
    {
      email: email,
      password: password,
    },
    OPTIONS.jwtOptions
  );
};

export function useLoginUser(email: FormDataEntryValue | null, password: FormDataEntryValue | null) {
    console.log("From useQuery", email);
    console.log("from useQuery", password);
  
    return useQuery("loginUser", () => loginUser(email, password), {
      enabled: false,
    });
  }