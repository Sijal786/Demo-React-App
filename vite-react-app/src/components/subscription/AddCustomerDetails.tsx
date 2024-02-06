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
import { styled } from '@mui/system';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import setCustomerCredentialsInLocalStorage from "../../shared/helper/setCustomerCredentialsInLocalStorage";


import Stripe from "stripe";


const defaultTheme = createTheme();
const stripe2 = new Stripe('sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT');

const registerCustomers = async (name: string, email: string, phone: string) => {
        
  const result  = await stripe2.customers.create({
    name: name,
    email: email,
    phone : phone
  });
      return result;
    };
      
   
   

const AddCutomerDetails = () => {

    const [successStatus, setSuccessStatus] = useState({
        isSuccessAlert : false, 
        isLoading : false
    });

    const CenteredAlert = styled('div')({
        position: "absolute",
        left: "50%",
        bottom : "100px",
        transform: "translate(-50%, -50%)",
      });

      const CenteredLoadingBox = styled(Box)({
        position: "absolute",
        left: "50%",
        top : "50%",
        transform: "translate(-50%, -50%)",
      });

      const hideAlertTimeout = setTimeout(() => {
        setSuccessStatus(prevState => ({
            ...prevState,
            isSuccessAlert: false,
          }));
      }, 5000);

    
      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;

        console.log("=========Form Data Name", name);
        console.log("=========Form Data Email", email);

        setSuccessStatus(prevState => ({...prevState,
            isLoading: true
        }));
        const result = await registerCustomers(name, email, phone);
        console.log("===========Post Api Result" , result);
        const customerCredentials = {
          customerId: result.id,
          customerName: result.name, 
          customerEmail : result.email
        }

        setCustomerCredentialsInLocalStorage(customerCredentials);
        setSuccessStatus(prevState => ({...prevState,
        isSuccessAlert: true,
        isLoading: false
        }));

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
        {successStatus.isSuccessAlert && (
  <CenteredAlert>
    <Alert severity="success">
      The customer is registered successfully
    </Alert>
  </CenteredAlert>
)}

      </Container>
      {successStatus.isLoading && (
  <CenteredLoadingBox>
  <CircularProgress />
</CenteredLoadingBox>
)}
    </ThemeProvider>
    
  )
}

export default AddCutomerDetails