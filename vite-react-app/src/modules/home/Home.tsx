import styled from "styled-components";
import ShowProducts from "../products/ShowProducts";
import { Typography, Box, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const HomeHeader = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }));

  return (
    <div>
      <img
        src=".\src\assets\homeimage.PNG"
        alt="This is my image"
        width="100%"
      />
      <Container style={{ padding: "20px 0px" }} maxWidth="md">
        <HomeHeader>
          <Typography variant="h4"> Explore Our Products</Typography>
          <Link to="/products"> Show All Products</Link>
        </HomeHeader>
        <Grid container maxWidth="md" style={{ marginTop: "10px" }} spacing={4}>
          <ShowProducts />
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
