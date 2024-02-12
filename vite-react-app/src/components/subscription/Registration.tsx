import Typography from "@mui/material/Typography";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { styled } from "@mui/system";
import AddCutomerDetails from "./AddCustomerDetails";
import AddCardDetails from "./AddCardDetails";
import { useLocation } from "react-router-dom";

interface State {
  productId: string;
  price: any;
}

export default function Registration() {
  const location = useLocation();
  const { state }: { state: State } = location;
  const { price, productId } = state;

  const [activeComponent, setActiveComponent] = useState("Register");

  const StyledBar = styled("hr")({
    position: "absolute",
    bottom: "-8px",
    left: "0",
    right: "0",
    border: "3px solid #0096FF",
    borderRadius: 3,
  });

  return (
    <>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            width="100%"
          >
            <div
              style={{
                width: "50%",
                textAlign: "center",
                position: "relative",
              }}
              onClick={() => setActiveComponent("Register")}
            >
              <Typography variant="h5">Customer Details </Typography>
              {activeComponent === "Register" && <StyledBar />}
            </div>
            <div
              style={{
                width: "50%",
                textAlign: "center",
                position: "relative",
              }}
              onClick={() => setActiveComponent("AddCard")}
            >
              <Typography variant="h5">Card Details</Typography>
              {activeComponent === "AddCard" && <StyledBar />}
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
      <div>
        {activeComponent === "Register" ? (
          <AddCutomerDetails price={price} productId={productId} />
        ) : (
          <AddCardDetails price={price} productId={productId} />
        )}
      </div>
    </>
  );
}
