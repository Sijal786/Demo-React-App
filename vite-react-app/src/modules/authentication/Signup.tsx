import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Copyright } from "../../shared/components/Copyright";
import { useState } from "react";
import { useSignUpUser } from "../../services/hooks/useUserSignUp";
import Loading from "../../shared/components/Loading";
import { useEffect } from "react";
import { Routes } from "../../shared/routes/Routes";
import { useCreateCustomers } from "../../services/hooks/useCreateCustomers";
import setItemInLocalStorage from "../../shared/helper/setItemInLocalStorage";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const uniqueRoleId = uuidv4();
  const [name, setName] = useState<any>("");
  const [password, setPassword] = useState("");

  const onSuccess = () => {
    console.log("Sign up successfully");
    setItemInLocalStorage("CustomerName", name);
    navigate(Routes.Login);
  };

  const onError = () => {
    console.log(error?.response.data.errors);
  };

  const {
    isLoading,
    error,
    isError,
    mutate: signUpUser,
  }: any = useSignUpUser(onSuccess, onError);

  const {
    mutate: addCustomer,
    isError: addCustomerError,
    error: addCustomerErrorData,
    isLoading: addCustomerLoading,
    data: addCustomerData,
  }: any = useCreateCustomers();

  useEffect(() => {
    if (!addCustomerLoading && !addCustomerError && addCustomerData) {
      console.log("Sign up successfully");
      navigate(Routes.Login);
      setItemInLocalStorage("CustomerID", addCustomerData?.data?.id);
      setItemInLocalStorage("CustomerEmail", addCustomerData?.data?.email);
    }
  }, [isLoading, isError, addCustomerData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    signUpUser({ email, password, uniqueRoleId });
    console.log(name, email);
    const customerData = {
      name: name,
      email: email,
    };
    console.log("Customer Data ", customerData);
    addCustomer(customerData);
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
            {" "}
            Sign Up{" "}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {isError && (
              <Typography variant="body1" color="error">
                {" "}
                {error?.response?.data?.errors}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign UP
            </Button>
            <Grid container>
              <Grid item>
                <Link to={Routes.Login}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {isLoading && <Loading />}
    </ThemeProvider>
  );
}
