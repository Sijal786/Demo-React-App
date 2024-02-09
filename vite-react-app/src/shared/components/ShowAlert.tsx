import { styled } from "@mui/material";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const ShowAlert = ({ severity, content, setStatus }: any) => {
  const [open, setOpen] = useState(true);

  const CenteredAlert = styled("div")({
    position: "absolute",
    left: "50%",
    bottom: "100px",
    transform: "translate(-50%, -50%)",
  });

  useEffect(() => {
    setTimeout(() => {
      // setStatus((prevState: any) => ({
      //   ...prevState,
      //   showSuccessAlert: false,
      //   showAuthenticatedErrorAlert: false,
      // }));
      setOpen(false);
    }, 3000);
  }, [setStatus]);

  return (
    <CenteredAlert>
      {open && <Alert severity={severity}>{content}</Alert>}
    </CenteredAlert>
  );
};

export default ShowAlert;
