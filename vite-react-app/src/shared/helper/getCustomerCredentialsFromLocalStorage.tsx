

const getCustomerCredentialsFromLocalStorage = () => {
    const customerId = localStorage.getItem("CustomerID");
    const customerName = localStorage.getItem("CustomerName");
    const customerEmail = localStorage.getItem("CustomerEmail");

    const customerData = {
        customerId,
        customerName ,
        customerEmail 
    }

    return customerData;

}

export default getCustomerCredentialsFromLocalStorage;
