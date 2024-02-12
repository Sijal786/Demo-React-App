import { useMutation } from "react-query";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";
import axios from "axios";

export const createCustomers = (customerData: any) => {
  return axios.post(URLS.customers, customerData, OPTIONS.stripeOptions);
};

export const useCreateCustomers = () => {
  return useMutation(createCustomers);
};
