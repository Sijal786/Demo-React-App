import axios from "axios";
import { useQuery } from "react-query";
import { URLS } from "../services/URLS";



export const fetchProducts = () => {
  return axios.get(URLS.fetchProducts, {
    headers: {
      Authorization:
        "Bearer sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export const useFetchProducts = () => {
  return useQuery('fetch-products', fetchProducts);
}