import { useMutation } from "react-query";
import axios from "axios";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";

const loginUser = (data: any) => {
  return axios.post(URLS.login, data, OPTIONS.jwtOptions);
};

export function useLoginUser(onSuccess: any) {
  return useMutation(loginUser, { onSuccess });
}
