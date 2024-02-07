import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import setCustomerCredentialsInLocalStorage from "../../shared/helper/setCustomerCredentialsInLocalStorage";
import isCustomerExisted from "../../shared/helper/isCustomerExisted";
import Stripe from "stripe";
import { useFetchCustomers } from "../../hooks/useFetchCustomers";
import Loading from "../../shared/components/Loading";
import ShowAlert from "../../shared/components/ShowAlert";
import ShowDialog from "../../shared/dialogs/ShowDialog";
import isAuthenticated from "../../shared/helper/isAuthenticated";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../shared/routes/Routes";

const defaultTheme = createTheme();
const stripe2 = new Stripe(
  "sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT"
);

const registerCustomers = async (
  name: string,
  email: string,
  phone: string
) => {
  const result = await stripe2.customers.create({
    name: name,
    email: email,
    phone: phone,
  });
  return result;
};

const AddCutomerDetails = ({ price, productId }: any) => {
  const [successStatus, setSuccessStatus] = useState({
    isSuccessAlert: false,
    isErrorAlert: false,
    isLoading: false,
  });

  const navigate = useNavigate();

  const [customersData, setCustomersData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const { isLoading, isError, data } = useFetchCustomers();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setCustomersData(data.data.data);
      console.log("CustomerData", customersData);
    }
  }, [isLoading, isError, data]);

  const hideAlertTimeout = setTimeout(() => {
    setSuccessStatus((prevState) => ({
      ...prevState,
      isSuccessAlert: false,
      isErrorAlert: false,
    }));
  }, 5000);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    if (isAuthenticated()) {
      setSuccessStatus((prevState) => ({ ...prevState, isLoading: true }));

      if (!!customersData) {
        if (isCustomerExisted(customersData, name, email)) {
          setSuccessStatus((prevState) => ({
            ...prevState,
            isErrorAlert: true,
            isLoading: false,
          }));

          const customer: any = customersData.find(
            (customer: any) => customer.name == name && customer.email == email
          );

          const customerCredentials = {
            customerId: customer?.id,
            customerName: customer?.name,
            customerEmail: customer?.email,
          };

          setCustomerCredentialsInLocalStorage(customerCredentials);

          navigate(Routes.Checkout, { state: { price, productId } });

          console.log("The customer is registered");
        } else {
          const result = await registerCustomers(name, email, phone);
          console.log("===========Post Api Result", result);

          const customerCredentials = {
            customerId: result.id,
            customerName: result.name,
            customerEmail: result.email,
          };

          setCustomerCredentialsInLocalStorage(customerCredentials);
          setSuccessStatus((prevState) => ({
            ...prevState,
            isSuccessAlert: true,
            isLoading: false,
          }));
        }
      }
    } else {
      setShowDialog(true);
    }

    hideAlertTimeout;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              autoComplete="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              autoComplete="phone"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        {successStatus.isErrorAlert && (
          <ShowAlert
            severity={"error"}
            content="User with this email and passowrd already existed"
          />
        )}
        {successStatus.isSuccessAlert && (
          <ShowAlert
            severity={"success"}
            content="The User is registered successfully"
          />
        )}
      </Container>
      {successStatus.isLoading && <Loading />}
      {showDialog && (
        <ShowDialog
          title="Sign In"
          content="Sign in to subscribe the offers "
        />
      )}
    </ThemeProvider>
  );
};

export default AddCutomerDetails;
