import axios from "axios";
import { useQuery } from "react-query";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";


export const fetchProducts = () => {
  return axios.get(URLS.fetchProducts, OPTIONS.stripeOptions);
}

export const useFetchProducts = () => {
  return useQuery('fetch-products', fetchProducts);
}