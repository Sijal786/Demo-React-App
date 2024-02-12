import { useMutation } from "react-query";
import Stripe from "stripe";

const stripe2 = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

const resumeSubscription = async (subscriptionId: string) => {
  console.log("from handle", subscriptionId);
  return await stripe2?.subscriptions.resume(subscriptionId, {
    billing_cycle_anchor: "now",
  });
};

export const useResumeSubscription = () => {
  return useMutation(resumeSubscription);
};
