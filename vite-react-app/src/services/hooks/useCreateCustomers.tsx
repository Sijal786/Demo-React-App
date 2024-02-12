import { useMutation } from "react-query";
import { URLS } from "../URLS";
import { OPTIONS } from "../Options";
import axios from "axios";

export const createCustomers = (customerData: any) => {
  return axios.post(URLS.customers, customerData, OPTIONS.stripeOptions);
};

export const useCreateCustomers = () => {
  return useMutation(createCustomers);
};
