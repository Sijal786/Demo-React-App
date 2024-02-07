import { postAPIResult } from "../../services/axios"


interface CreateSubscriptionPrams {
    customerId : string,
    priceId : string,
    defaultPaymentMethod : string  | undefined
}


export function CreateSubscription({ customerId, priceId, defaultPaymentMethod } : CreateSubscriptionPrams) {
    const url = "https://api.stripe.com/v1/subscriptions";
    const postData = JSON.stringify({
        customer : customerId,
        priceId,
        defaultPaymentMethod
    });

    const data = postAPIResult(url, postData);
    console.log(data);

}