import { useMutation } from "react-query";
import { URLS } from "../URLS";
import { OPTIONS } from "../Options";
import axios from "axios";

export const createSubscription = async (subscriptionData: any) => {
  return axios.post(
    URLS.subscriptions,
    subscriptionData,
    OPTIONS.stripeOptions
  );
};

export const useCreateSubscription = () => {
  return useMutation("create-subscription", createSubscription);
};
