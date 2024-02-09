import { useFetchCustomers } from "../../hooks/useFetchCustomers";
const { isLoading, isError, data } = useFetchCustomers();
console.log("Fetching customers data", data?.data.data);

export default function isCustomerExisted(
  customersData: any,
  name: string,
  email: string
) {
  const existedCustomer: any = data?.data.data.find(
    (customer: any) => customer.name === name && customer.email === email
  );
  
  return existedCustomer !== undefined;
}
