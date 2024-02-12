import getCustomerCredentialsFromLocalStorage from "./getCustomerCredentialsFromLocalStorage";

const { email } = getCustomerCredentialsFromLocalStorage();

export default function isCustomerExisted(customersData : any) {

 
  const existedCustomer: any = customersData?.find(
    (customer: any) => customer.email == email
  );

  if(!!existedCustomer) {
    console.log("This Customer is already existed in stripe", existedCustomer);
    return true;
  } else {
    return false
  }

}