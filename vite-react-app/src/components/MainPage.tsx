import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Routes } from "../shared/routes/Routes";
import { useContext } from "react";
import { ProductContext } from "../App";
import { ProductContextType } from "../shared/interfaces/Interface";
import { SearchContext } from "./context/SearchContext";

export default function MainPage({ isAuthenticated, setIsAuthenticated }: any) {

  const navigate = useNavigate();
  const { search } = useContext(SearchContext);
  const contextValue: ProductContextType | undefined = useContext(ProductContext);
  const products = contextValue?.products;

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  return (
    <>
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" gutterBottom mt={4}>
              WELCOME
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don't simply skip over it entirely.
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              useFlexGap
              spacing={2}
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Button
                variant="outlined"
                onClick={() => navigate(Routes.Register)}
              >
                {" "}
                Subscribe{" "}
              </Button>
              {isAuthenticated ? (
                <Button variant="outlined" onClick={handleLogout}>
                  {" "}
                  Logout{" "}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => navigate(Routes.Login)}
                >
                  {" "}
                  Login{" "}
                </Button>
              )}
            </Stack>
          </Container>
        </div>
        <Container style={{ padding: "20px 0px" }} maxWidth="md">
          <Grid
            container
            maxWidth="md"
            style={{ marginTop: "10px" }}
            spacing={4}
          >
            {products?.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
              .map((product: any) => (
              <Grid key={product.id} item xs={12} sm={6} md={4}>
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                  onClick={() => navigate(`${Routes.ProductDetails.replace(":id", product.id)}`, { state: { product } })}
                  >
                    <CardMedia
                      style={{ paddingTop: "56.25%" }}
                      sx={{ height: "90px" }}
                      image={product.images[0] || "fallback_image_url.jpg"}
                      title={product.id}
                    />
                    <CardContent style={{ flexGrow: "1" }}>
                      <Typography variant="h4">{product.name}</Typography>
                      <Typography>{product.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => navigate(`${Routes.ProductDetails.replace(":id", product.id)}`, { state: { product } })}
                      >
                        Subscribe
                      </Button>
                    </CardActions>
                  </Card>
                
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
