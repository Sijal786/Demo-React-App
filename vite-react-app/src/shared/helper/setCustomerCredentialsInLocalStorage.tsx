const setCustomerCredentialsInLocalStorage = ({email, name , phone} : any) => {

  localStorage.setItem("CustomerName" , name);
  localStorage.setItem("CustomerEmail" , email); 
  localStorage.setItem("CustomerPhone" , phone);
}

export default setCustomerCredentialsInLocalStorage;