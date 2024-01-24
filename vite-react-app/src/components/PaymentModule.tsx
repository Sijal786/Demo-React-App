import StripeCheckout from 'react-stripe-checkout';



export default function PaymentModule(){

    const onToken = (token : any) => (
        console.log(token)
    )
    return (
        // ...
        <StripeCheckout
          token={onToken}
          stripeKey="sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT"
        />
      )
}