import { useMutation } from "react-query";
import axios from "axios";
import { URLS } from "../URLS";
import { OPTIONS } from "../Options";
import { useQueryClient } from "react-query";
import setItemInLocalStorage from "../../shared/helper/setItemInLocalStorage";

const loginUser = (data: any) => {
  return axios.post(URLS.login, data, OPTIONS.jwtOptions);
};

export function useLoginUser() {
  const queryClient = useQueryClient();

  return useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(data.data);
      // setItemInLocalStorage("token", data.data)
    },
  });
}
