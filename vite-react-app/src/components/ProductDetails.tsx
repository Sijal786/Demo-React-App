import { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { CartContextType } from "./context/CartContext";
import { CartContext } from "./context/CartContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { tiers } from "../shared/data/tiers";
import { footers } from "../shared/data/footers"; 
import { Copyright } from "../shared/components/Copyright";



  const ProductDetails = () => {
    const location = useLocation();
    const product = location.state?.product;
    const contextValue: CartContextType | undefined = useContext(CartContext);
    const addToCart = contextValue?.addToCart;

    const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const defaultTheme = createTheme();

  const handleSubscribe = () => {
    // Step 1: Retrieve customer email from local storage
    const customerEmail = localStorage.getItem("email");
    console.log("======Customer Email", customerEmail);

    // Step 2: Make an API request to Stripe
    axios
      .get("https://api.stripe.com/v1/customers", {
        headers: {
          Authorization:
          "Bearer sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Step 3: Search for customer by email
        const result = response.data;
        const customers = result.data;
        console.log(customers);
        const matchingCustomer = customers.find(
          (customer: any) => customer.email == customerEmail
        );

        console.log(matchingCustomer);

        // Step 4: Handle match or mismatch
        if (matchingCustomer) {
          handleOpenPopup();
        } else {
          console.log("Customer is not registered with Stripe");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching customer data from Stripe:", error);
      });
  };


    return (
      <>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
            marginTop: "70px",
          }}
        >
          <Typography variant="h2" align="center" fontWeight={100}>
            {product.name}
          </Typography>
          <Typography variant="h4" align="center" mt={4}>
            Swift & precise calculations, complete contract lifecycle coverage,
            multiple calculation types{" "}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            mt={3}
            fontSize={22}
            align="center"
            color="text.secondary"
          >
            {product.description}
          </Typography>
          <img src={product.images[0]} alt="This is my image" />
        </Container>

        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
          />
          <CssBaseline />
          <Container
            disableGutters
            maxWidth="sm"
            component="main"
            sx={{ pt: 8, pb: 6 }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Pricing
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              component="p"
            >
              We have several powerful plans to best fit your businessneeds.
              Choose the one which works for you!
            </Typography>
          </Container>
          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier) => (
                <Grid
                  item
                  key={tier.title}
                  xs={12}
                  sm={tier.title === "Enterprise" ? 12 : 6}
                  md={4}
                >
                  <Card>
                    <CardHeader
                      title={tier.title}
                      subheader={tier.subheader}
                      titleTypographyProps={{ align: "center" }}
                      action={tier.title === "Pro" ? <StarIcon /> : null}
                      subheaderTypographyProps={{
                        align: "center",
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          mb: 2,
                        }}
                      >
                        <Typography
                          component="h2"
                          variant="h3"
                          color="text.primary"
                        >
                          ${tier.price}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          /mo
                        </Typography>
                      </Box>
                      <ul>
                        {tier.description.map((line) => (
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={line}
                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant={tier.buttonVariant as "outlined" | "contained"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubscribe();
                        }}
                      >
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          <Container
            maxWidth="md"
            component="footer"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              mt: 8,
              py: [3, 6],
            }}
          >
            <Grid container spacing={4} justifyContent="space-evenly">
              {footers.map((footer) => (
                <Grid item xs={6} sm={3} key={footer.title}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    {footer.title}
                  </Typography>
                  <ul>
                    {footer.description.map((item) => (
                      <li key={item}>
                        <Link href="#" variant="subtitle1" color="text.secondary">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Company name
            </Typography>
            <nav>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Features
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Enterprise
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Support
              </Link>
            </nav>
            <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
       
      </>
    );
  };

export default ProductDetails;
