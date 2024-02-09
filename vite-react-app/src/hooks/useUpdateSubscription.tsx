import { useQuery } from "react-query";
import { URLS } from "../services/URLS";
import { OPTIONS } from "../services/Options";
import axios from "axios";

export const updateSubscriptions = async (itemId: any ,currentPlan : any, subscriptionId : string) => {
    const postData = {
          items: [
            {
              id: itemId,
              plan: currentPlan,
            },
          ],
        }
    return axios.post(`${URLS.subscriptions}/${subscriptionId}`, postData, OPTIONS.stripeOptions);
}

export const useUpdateSubscriptions = (itemId: any, currentPlan : any, subscriptionId : string) => {
    
  return useQuery('fetch-subscriptions', () => updateSubscriptions(itemId,currentPlan, subscriptionId), {enabled : false});
}