import { useQuery } from "react-query";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";
import axios from "axios";

export const createCustomers = (name: string, email: string, phone: string) => {
  return axios.post(
    URLS.customers,
    {
      name: name,
      email: email,
      phone: phone,
    },
    OPTIONS.stripeOptions
  );
};

export const useCreateCustomers = ({ name, email, phone }: any) => {
  console.log("name", name);
  console.log("email", email);
  console.log("phone", phone);
  return useQuery("fetch-pricing", () => createCustomers(name, email, phone), {
    enabled: false,
  });
};
