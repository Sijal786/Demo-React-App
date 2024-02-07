
import { useQuery } from "react-query";
import Stripe from "stripe";

const stripe2 = new Stripe(
    "sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT"
  );

export const createSubscription = async (customerId: any, priceId: any) => {
  return await stripe2?.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
      },
    ],
    trial_end: "now",
  });
  
};

export const useCreateSubscription = (customerId: any, priceId: any) => {
  return useQuery("create-subscription", () =>
    createSubscription(customerId, priceId) , {enabled : false}
  );
};
