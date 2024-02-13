import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { Copyright } from "./Copyright";

const FooterContainer = styled("div")(() => ({
  textAlign: "center",
  width: "100% !important",
  height: "100px !important",
  backgroundColor: "808080",
  paddingBottom: "22px",
  marginTop: "110px",
}));

function Footer() {
  return (
    <FooterContainer>
      <Typography variant="h5">Conatct Us</Typography>
      <Typography variant="body1"> support@netsolapp.io</Typography>
      <Typography variant="body1"> +1 818 222 9195</Typography>
      <Copyright />
    </FooterContainer>
  );
}

export default Footer;
