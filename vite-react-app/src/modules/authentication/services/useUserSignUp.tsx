import { OPTIONS } from "../Options";
import axios from "axios";
import { URLS } from "../URLS";
import { useMutation } from "react-query";

const signUpUser = (signUpData: any) => {
  return axios.post(
    URLS.signUp,
    signUpData,
    OPTIONS.jwtOptions
  );
};

export function useSignUpUser(onSuccess: any) {
  return useMutation(signUpUser, { onSuccess });
}
