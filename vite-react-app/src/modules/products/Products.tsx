import React, { useState } from "react";
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
  Box,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../shared/styled/Styled";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShowProducts from "./ShowProducts";
import styled from "styled-components";

const Products = () => {
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");
  // // const products: any = useContext(ProductContext);
  // const [products, setProducts] = useState([]);

  // function handleLogout() {
  //   localStorage.clear();
  // }

  const ProductsHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "30px",
  }));

  return (
    <>
      <main>
        <ProductsHeader>
          <Typography variant="h2"> Explore Our Products </Typography>
          <Typography variant="body1">
            All the solutions to your problems under one marketplace. Get
            financial apps, business apps and much more!{" "}
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search> */}
        </ProductsHeader>
        <Container style={{ padding: "20px 0px" }} maxWidth="md">
          <Grid
            container
            maxWidth="md"
            style={{ marginTop: "10px" }}
            spacing={4}
          >
            <ShowProducts />
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Products;
