import { OPTIONS } from "../Options";
import axios from "axios";
import { URLS } from "../URLS";
import { useMutation } from "react-query";

const signUpUser = (signUpData: any) => {
  return axios.post(
    URLS.signUp,
    {
      email: signUpData.email,
      password: signUpData.password,
      role: signUpData.uniqueRoleId,
    },
    OPTIONS.jwtOptions
  );
};

export function useSignUpUser(onSuccess: any, onError: any) {
  return useMutation(signUpUser, { onSuccess, onError });
}
