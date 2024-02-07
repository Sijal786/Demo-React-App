import { useQuery } from "react-query";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT"
);

export const attachPaymentMethod = (name: string, email: string, phone: string) => {
  return stripe.customers.create({
    name: name,
    email: email,
    phone: phone,
  });
};

export const useAttachPaymentMethod = ({ name, email, phone }: any) => {
  return useQuery("fetch-pricing", () => attachPaymentMethod(name, email, phone), {
    enabled: false,
  });
};
