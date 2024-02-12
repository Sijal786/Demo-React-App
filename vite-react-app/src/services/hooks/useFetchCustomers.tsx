import axios from "axios";
import { useQuery } from "react-query";
import { URLS } from "../URLS";
import { OPTIONS } from "../Options";

export const fetchCustomers = () => {
  return axios.get(URLS.customers, OPTIONS.stripeOptions);
};

export const useFetchCustomers = () => {
  return useQuery("fetch-pricing", fetchCustomers);
};
