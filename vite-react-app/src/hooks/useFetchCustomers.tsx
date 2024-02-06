import axios from "axios";
import { useQuery } from "react-query";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";

export const fetchCustomers = () => {
  return axios.get(URLS.customers, OPTIONS.stripeOptions);
};

export const useFetchCustomers = () => {
  return useQuery("fetch-pricing", fetchCustomers);
};
