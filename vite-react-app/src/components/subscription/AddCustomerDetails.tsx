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
import setCustomerCredentialsInLocalStorage from "../../shared/helper/setCustomerCredentialsInLocalStorage";
import Loading from "../../shared/components/Loading";
import ShowAlert from "../../shared/components/ShowAlert";
import ShowDialog from "../../shared/dialogs/ShowDialog";
import isAuthenticated from "../../shared/helper/isAuthenticated";
import { useCreateCustomers } from "../../hooks/useCreateCustomers";
import { useEffect } from "react";
import setItemInLocalStorage from "../../shared/helper/setItemInLocalStorage";

const defaultTheme = createTheme();

const AddCutomerDetails = () => {
  const [status, setStatus] = useState({
    showSuccessAlert: false,
    showAuthenticatedErrorAlert: false,
  });

  const [customerCredentials, setCustomerCredentials] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const {
    mutate: addCustomerData,
    isError,
    error,
    isLoading,
    data,
  }: any = useCreateCustomers();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      console.log(data);
      console.log(data?.data?.id);
      setItemInLocalStorage("CustomerID", data?.data?.id);
    }
  }, [isLoading, isError, data]);

  // const [customersData, setCustomersData] = useState([]);
  // const [showDialog, setShowDialog] = useState(false);

  // const { isLoading, isError, data } = useFetchCustomers();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCustomerCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    console.log("These are customer credentials ", customerCredentials);

    if (isAuthenticated()) {
      addCustomerData(customerCredentials);
      console.log("current ", data);
      console.log("current ", data?.data?.id);
      if (isError) {
        return (
          <ShowAlert
            severity="error"
            content="Please login fisrt to register yourself"
          />
        );
      } else {
        setCustomerCredentialsInLocalStorage(customerCredentials);

        console.log("The customer is registered", customerCredentials);
        setStatus((prevState) => ({
          ...prevState,
          showSuccessAlert: true,
        }));
      }
    } else {
      setStatus((prevState) => ({
        ...prevState,
        showAuthenticatedErrorAlert: true,
      }));
    }

    // if (isAuthenticated()) {
    //   setStatus((prevState) => ({ ...prevState, isLoading: true }));

    //   if (!!customersData) {
    //     if (isCustomerExisted(customersData, name, email)) {
    //       setStatus((prevState) => ({
    //         ...prevState,
    //         isErrorAlert: true,
    //         isLoading: false,
    //       }));

    //       const customer: any = customersData.find(
    //         (customer: any) => customer.name == name && customer.email == email
    //       );

    //       const customerCredentials = {
    //         customerId: customer?.id,
    //         customerName: customer?.name,
    //         customerEmail: customer?.email,
    //       };

    //       setCustomerCredentialsInLocalStorage(customerCredentials);

    //       navigate(Routes.Checkout, { state: { price, productId } });

    //       console.log("The customer is registered");
    //     } else {
    //       const result = await registerCustomers(name, email, phone);
    //       console.log("===========Post Api Result", result);

    //       const customerCredentials = {
    //         customerId: result.id,
    //         customerName: result.name,
    //         customerEmail: result.email,
    //       };

    //       setCustomerCredentialsInLocalStorage(customerCredentials);
    //       setStatus((prevState) => ({
    //         ...prevState,
    //         isSuccessAlert: true,
    //         isLoading: false,
    //       }));
    //     }
    //   }
    // } else {
    //   setShowDialog(true);
    // }

    // hideAlertTimeout;
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
            {isError && (
              <Typography variant="body1" color="error">
                {" "}
                {error?.response?.data.error.message}
              </Typography>
            )}
            {status.showAuthenticatedErrorAlert && (
              <ShowDialog
                title="Sign In"
                content="Sign in to subscribe the offers "
              />
            )}
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
      </Container>
      {isLoading && <Loading />}
      {status.showSuccessAlert && (
        <ShowAlert
          severity="success"
          content="Successfully registered, Add your Card Details to subscribe the offers"
        />
      )}
    </ThemeProvider>
  );
};

export default AddCutomerDetails;
