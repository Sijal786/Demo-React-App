const setUserSignInInLocalStorage = (customerData : any ) => {
    localStorage.setItem("CustomerID" , customerData.token);
    localStorage.setItem("CustomerName" , customerData?.name);
    localStorage.setItem("CustomerEmail" , customerData?.email);
  }

export default setUserSignInInLocalStorage;