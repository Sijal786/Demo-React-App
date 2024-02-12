const getCustomerCredentialsFromLocalStorage = () => {
    const customerId = localStorage.getItem("CustomerID");
    const customerName = localStorage.getItem("CustomerName");
    const customerEmail = localStorage.getItem("CustomerEmail");
    const paymentMethod = localStorage.getItem("PaymentMethod");

    const customerData = {
        customerId,
        customerName ,
        customerEmail , 
        paymentMethod
    }

    return customerData;

}

export default getCustomerCredentialsFromLocalStorage;