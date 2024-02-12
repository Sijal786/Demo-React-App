import { useQuery, useMutation } from "react-query";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";
import axios from "axios";

export const createSubscription = async (subscriptionData: any) => {
  return axios.post(
    URLS.subscriptions,
    subscriptionData,
    OPTIONS.stripeOptions
  );
};

export const useCreateSubscription = () => {
  return useMutation(createSubscription);
};
