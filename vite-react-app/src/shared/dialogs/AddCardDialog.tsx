import * as React from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Stripe from "stripe";
import getCustomerCredentialsFromLocalStorage from "../helper/getCustomerCredentialsFromLocalStorage";
import { Routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import setItemInLocalStorage from "../helper/setItemInLocalStorage";
import { useState } from "react";
import ShowAlert from "../components/ShowAlert";
import { useResumeSubscription } from "../../services/hooks/useResumeSubscription";

const stripe2 = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddCardDialog = ({
  handleClose,
  open,
  setOpen,
  price,
  productId,
}: any) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { customerId, customerName, customerEmail }: any =
    getCustomerCredentialsFromLocalStorage();
  const [successAlert, setSuccessAlert] = useState(false);

  console.log("CustomerId from Add Card Dialog", customerId);
  console.log("CustomerEmail from Add Card Dialog", customerEmail);
  console.log("CustomerName from Add Card Dialog", customerName);

  const cardElementOptions = {
    iconStyle: "solid",
    style: {
      base: {
        margin: "20px auto",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
      },
      invalid: { iconColor: "red", color: "red" },
    },
  };

  const handleAddCard = async () => {
    console.log("Add ");

    const paymentMethod = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement)!,
      billing_details: {
        name: customerName,
        email: customerEmail,
      },
    } as any);

    console.log(paymentMethod);

    const paymentMethodId: any = paymentMethod?.paymentMethod?.id;
    console.log("-----------------paymentMethodId", paymentMethodId);
    console.log("-----------------Customer id", customerId);

    setItemInLocalStorage("PaymentMethod", paymentMethodId);

    if (paymentMethodId) {
      const attachPaymentMethodToCustomer =
        await stripe2?.paymentMethods?.attach(paymentMethodId, {
          customer: customerId,
        });
      console.log(
        "-----------------attachPaymentMethodToCustomer",
        attachPaymentMethodToCustomer
      );
    } else {
      console.error("Payment method ID is undefined");
    }

    const defaultPaymentMethod = await stripe2.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    console.log("--------------- Default Payment Method", defaultPaymentMethod);
    console.log("Add card functionality is completed");

    setOpen(false);
    setSuccessAlert(true);
    navigate(Routes.Checkout, { state: { price, productId } });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle variant="h5" sx={{ color: "#0096FF" }}>
          {"Add Card Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" mb={2}>
            Enter your card details to join the club and enjoy premium benefits
          </DialogContentText>
          <CardElement options={cardElementOptions as any} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAddCard}>Add</Button>
        </DialogActions>
      </Dialog>
      {successAlert && (
        <ShowAlert
          severity="success"
          content="The subscription is cancelled"
          setSuccessAlert={setSuccessAlert}
        />
      )}
    </React.Fragment>
  );
};
export default AddCardDialog;
