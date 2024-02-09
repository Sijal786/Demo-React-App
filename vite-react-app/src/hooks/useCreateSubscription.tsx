import { useQuery } from "react-query";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";
import axios from "axios";

export const createSubscription = async (customerId: any, priceId: any) => {
  return axios.post(
    URLS.subscriptions,
    {
      customer: customerId,
      items: [{ price: priceId }],
      trial_end: "now",
      payment_behavior: "default_incomplete",
    },
    OPTIONS.stripeOptions
  );
};

export const useCreateSubscription = (customerId: any, priceId: any) => {
  return useQuery(
    "create-subscription",
    () => createSubscription(customerId, priceId),
    { enabled: false }
  );
};
