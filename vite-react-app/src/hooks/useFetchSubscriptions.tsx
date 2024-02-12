import { useQuery } from "react-query";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";
import axios from "axios";

export const fetchSubscriptions = async (customerId: string | null) => {
  return axios.get(
    `${URLS.subscriptions}?customer=${customerId}`,
    OPTIONS.stripeOptions
  );
};

export const useFetchSubscriptions = (customerId: string | null) => {
  return useQuery("fetch-subscriptions", () => fetchSubscriptions(customerId));
};
