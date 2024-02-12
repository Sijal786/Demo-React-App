import { useMutation, useQuery } from "react-query";
import { URLS } from "../URLS";
import { OPTIONS } from "../Options";
import axios from "axios";
import { useQueryClient } from "react-query";

export const cancelSubscription = async (subscriptionId: any) => {
  console.log("from use quetryr----------", subscriptionId);
  return axios.delete(
    `${URLS.subscriptions}/${subscriptionId}`,
    OPTIONS.stripeOptions
  );
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();
  // update cache data
  return useMutation(cancelSubscription, {
    onSuccess: (data) => {
      queryClient.setQueryData("fetch-subscriptions", (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
