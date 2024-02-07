const setCustomerCredentialsInLocalStorage = (customerData : any ) => {
    localStorage.setItem("CustomerID" , customerData.customerId);
    localStorage.setItem("CustomerName" , customerData?.customerName);
    localStorage.setItem("CustomerEmail" , customerData?.customerEmail);
  }

export default setCustomerCredentialsInLocalStorage;