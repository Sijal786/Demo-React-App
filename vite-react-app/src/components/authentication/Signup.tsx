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

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const uniqueRoleId = uuidv4();
  const [password, setPassword] = useState("");

  const onSuccess = () => {
    console.log("Sign up successfully");
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

  // useEffect(() => {
  //   if (!isLoading && !isError && data) {
  //     console.log("Sign up successfully");
  //     navigate(Routes.Login);
  //     console.log(data);
  //   }
  // }, [isLoading, isError, data]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    signUpUser({ email, password, uniqueRoleId });
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
