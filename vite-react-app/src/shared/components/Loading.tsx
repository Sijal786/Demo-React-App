import { styled } from "@mui/system";
import { CircularProgress, Box } from "@mui/material";

const CenteredLoadingBox = styled(Box)({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

const Loading = () => {
  return (
    <CenteredLoadingBox>
      <CircularProgress />
    </CenteredLoadingBox>
  );
};

export default Loading;
