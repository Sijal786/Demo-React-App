import axios from "axios";
import { useQuery } from "react-query";
import { URLS } from "../URLS";
import { OPTIONS } from "../Options";

export const fetchProductPricing = (productId: string) => {
  const fetchProductPricingUrl = `${URLS.fetchProductPricing}${productId}`;
  return axios.get(fetchProductPricingUrl, OPTIONS.stripeOptions);
};

export const useFetchProductPricing = (productId: string) => {
  return useQuery("fetch-pricing", () => fetchProductPricing(productId));
};
