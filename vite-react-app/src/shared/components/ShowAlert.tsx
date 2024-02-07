import React from 'react'
import Alert from '@mui/material/Alert';
import { styled } from '@mui/system';


const ShowSuccessAlert = ({severity, content} : any) => {

    const CenteredAlert = styled('div')({
        position: "absolute",
        left: "50%",
        bottom : "100px",
        transform: "translate(-50%, -50%)",
      });

  return (
    <CenteredAlert>
    <Alert severity={severity}>
      {content}
    </Alert>
  </CenteredAlert>
  )
}

export default ShowSuccessAlert