import axios from "axios";
import { useQuery } from "react-query";
import { URLS } from "../URLS";
import { OPTIONS } from "../Options";

export const fetchProductById = (id: string) => {
  const fetchProductByIdUrl = `${URLS.fetchProductById}/${id}`;
  return axios.get(fetchProductByIdUrl, OPTIONS.stripeOptions);
};

export const useFetchProductById = (id: string) => {
  return useQuery("fetch-products-by-id", () => fetchProductById(id));
};
