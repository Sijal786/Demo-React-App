import { postAPIResult } from "../../services/axios";

interface AttachPaymentMetodToCustomerPrams {
    paymentMethodId : String  | undefined
    customer : String
} 

export function AttachPaymentMethodToCustomer({ paymentMethodId , customer } : AttachPaymentMetodToCustomerPrams) {
    const url = "https://api.stripe.com/v1/payment_methods/:id/attach";
    const postData = JSON.stringify({
        paymentMethodId ,
        customer
    });

    const data = postAPIResult(url, postData);
    console.log(data);

}





