import { OPTIONS } from "../services/Options";
import axios from "axios";
import { URLS } from "../services/URLS";
import { useQuery } from "react-query";

const signUpUser = (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
  uniqueRoleId: string
) => {
  return axios.post(
    URLS.signUp,
    {
      email: email,
      password: password,
      role: uniqueRoleId,
    },
    OPTIONS.jwtOptions
  );
};

export function useSignUpUser(
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
  uniqueRoleId: string
) {
  console.log("From useQuery", email);
  console.log("from useQuery", password);

  return useQuery(
    "signup-user",
    () => signUpUser(email, password, uniqueRoleId),
    {
      enabled: false,
    }
  );
}
