import { useForm } from "react-hook-form";
import * as yup from "yup";
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
import { useState } from "react";
import { useSignUpUser } from "./services/useUserSignUp";
import Loading from "../../shared/components/Loading";
import { useEffect } from "react";
import { Routes } from "../../shared/routes/Routes";
import { useCreateCustomers } from "../../services/hooks/useCreateCustomers";
import setItemInLocalStorage from "../../shared/helper/setItemInLocalStorage";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultTheme = createTheme();

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(17, "Name does not contain more than 17 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function SignUp() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState<any>("");
  const uniqueRoleId = uuidv4();

  // const [email, setEmail] = useState("");
  // const uniqueRoleId = uuidv4();

  // const [password, setPassword] = useState("");

  const onSuccess = () => {
    console.log("Sign up successfully");
    navigate(Routes.Login);
  };

  // const onError = () => {
  //   console.log(error?.response.data.errors);
  // };

  const {
    isLoading: signUpUserLoading,
    error: signUpUserErrorData,
    isError,
    mutate: signUpUser,
  }: any = useSignUpUser(onSuccess);

  const {
    mutate: addCustomer,
    isError: addCustomerError,
    error: addCustomerErrorData,
    isLoading: addCustomerLoading,
    data: addCustomerData,
  }: any = useCreateCustomers();

  useEffect(() => {
    if (!addCustomerLoading && !addCustomerError && addCustomerData) {
      console.log("Add Customers successfully");
      navigate(Routes.Login);
      setItemInLocalStorage("CustomerID", addCustomerData?.data?.id);
      setItemInLocalStorage("CustomerName", addCustomerData?.data?.name);
      setItemInLocalStorage("CustomerEmail", addCustomerData?.data?.email);
    }
  }, [addCustomerLoading, isError, addCustomerData]);

  if (addCustomerLoading && signUpUserLoading) {
    return <Loading />;
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    const userCredentials = {
      email: data.email,
      password: data.password,
      role: uniqueRoleId,
    };
    console.log("I am sending", userCredentials);
    signUpUser(userCredentials);
    addCustomer({ name: data.name, email: data.email });
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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              {...register("name")}
              required
              fullWidth
              id="name"
              label="Name"
              autoComplete="name"
              autoFocus
              error={errors.name ? true : false}
              helperText={errors.name && errors.name.message}
            />
            <TextField
              margin="normal"
              {...register("email")}
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              margin="normal"
              {...register("password")}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password ? true : false}
              helperText={errors.password && errors.password.message}
            />
            <TextField
              margin="normal"
              {...register("confirmPassword")}
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              error={errors.confirmPassword ? true : false}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
            {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to={Routes.Login}>Already have an account? Sign In</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {isLoading && <Loading />}
    </ThemeProvider>
  );
}
