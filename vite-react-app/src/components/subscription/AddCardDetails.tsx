import { Typography } from "@mui/material";
import { styled } from '@mui/system';
import { useState } from "react";
import * as React from 'react';
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { loadStripe } from "@stripe/stripe-js";
import AddCardDialog from "../../shared/dialogs/AddCardDialog";

const stripePromise = loadStripe("pk_test_51ObKZ9EVITF2DHVDaMpdNhSHKAaP45uFYEQZv26Dxp8z6Soi50kvaAFKaY7OFnrpifu5EZFRQBXJL23MlvDCadxn00It49ff4c");


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const AddCardBox = styled('div')({
  position: 'absolute',
  left: "100px",
  top: "150px",
  border: '3px dashed black',
  borderRadius: 3,
  height: "100px",
  width: "350px",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});


const AddCardDetails = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  return (
    <>
    <Elements stripe={stripePromise}>
    <AddCardBox onClick={() => setOpen(true)} >
      <Typography variant="h5" sx = {{color : "black"}}>Add Card</Typography>
    </AddCardBox>

   {/* Dialog of Add card */}

   <AddCardDialog handleOpen={handleClickOpen} handleClose={handleClose} open={open}/>   
    </Elements>
    </>
  )
}

export default AddCardDetails;
