import { styled } from "@mui/material";
import { Alert } from "@mui/material";
import { useEffect } from "react";

const ShowAlert = ({ severiy, content, setSuccessAlert }: any) => {
  const CenteredAlert = styled("div")({
    position: "absolute",
    left: "50%",
    bottom: "100px",
    transform: "translate(-50%, -50%)",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [setSuccessAlert]);

  return (
    <CenteredAlert>
      <Alert severity={severiy}>{content}</Alert>
    </CenteredAlert>
  );
};

export default ShowAlert;
