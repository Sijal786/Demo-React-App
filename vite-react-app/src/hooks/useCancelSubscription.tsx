import { useQuery } from "react-query";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";
import axios from "axios";

export const cancelSubscription = async (subscriptionId: any) => {
  return axios.delete(
    `https://api.stripe.com/v1/subscriptions/${subscriptionId}`,
    OPTIONS.stripeOptions
  );
};

export const useCancelSubscription = (subscriptionId: any) => {
  console.log("from use quetryr----------", subscriptionId);

  return useQuery(
    "cancel-subscriptions",
    () => cancelSubscription(subscriptionId),
    { enabled: false }
  );
};
