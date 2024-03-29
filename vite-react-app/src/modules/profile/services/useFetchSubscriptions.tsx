import { useQuery } from "react-query";
import { URLS } from "../URLS";
import { OPTIONS } from "../Options";
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
