import StripeCheckout from 'react-stripe-checkout';



export default function PaymentModule(){

    const onToken = (token : any) => (
        console.log(token)
    )
    return (
        // ...
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_51ObKZ9EVITF2DHVDaMpdNhSHKAaP45uFYEQZv26Dxp8z6Soi50kvaAFKaY7OFnrpifu5EZFRQBXJL23MlvDCadxn00It49ff4c"
        />
      )
}