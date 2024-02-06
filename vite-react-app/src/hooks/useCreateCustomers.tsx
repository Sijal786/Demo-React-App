import { useQuery } from "react-query";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT"
);

export const createCustomers = (name: string, email: string, phone: string) => {
  return stripe.customers.create({
    name: name,
    email: email,
    phone: phone,
  });
};

export const useCreateCustomers = ({ name, email, phone }: any) => {
    console.log("name", name);
    console.log("email", email);
    console.log("phone", phone);
  return useQuery("fetch-pricing", () => createCustomers(name, email, phone), {
    enabled: false,
  });
};
