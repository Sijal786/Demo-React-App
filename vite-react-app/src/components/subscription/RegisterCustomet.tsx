// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { postAPIResult } from "../../services/axios";

// const defaultTheme = createTheme();

// export default function RegisterCustomers() {
//   const registerCustomers = async (
//     name: string,
//     email: string,
//     phone: string
//   ) => {
//     const url = "https://api.stripe.com/v1/customers";

//     const postData = JSON.stringify({
//       name,
//       email,
//       phone,
//     });

//     const result = await postAPIResult(url, postData);
//     console.log(result);
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const phone = formData.get("phone") as string;

//     registerCustomers(name, email, phone);
//     console.log("The customer is registered successfully");
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Register
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="name"
//               label="Name"
//               name="name"
//               autoFocus
//               autoComplete="name"
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="email"
//               label="Email"
//               type="email"
//               id="email"
//               autoComplete="email"
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="phone"
//               label="Phone"
//               type="phone"
//               id="phone"
//               autoComplete="phone"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }
