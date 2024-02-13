import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Copyright } from "../../shared/components/Copyright";
import { Routes } from "../../shared/routes/Routes";
import setUserSignInInLocalStorage from "../../shared/helper/setUserSignInInLocalStaorage";
import { useState } from "react";
import Loading from "../../shared/components/Loading";
import { loginUser } from "../../services/loginUser";

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState<any>("");
  
  const [password, setPassword] = useState<any>("");
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    try {
      setIsLoading(true);
      const token = await loginUser(email, password);
      setUserSignInInLocalStorage(token, email);
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      console.log("My error", error);
      setIsError(error.response.data.errors);
      setIsLoading(false);
    }
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
            Sign in{" "}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            
            <TextField
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {!!isError && (
              <Typography variant="body1" color="error">
                {" "}
                {isError}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/SignUp">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {isLoading && <Loading />}
    </ThemeProvider>
  );
}
