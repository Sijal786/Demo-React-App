import { Button, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Divider } from "@mui/material"
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';




export default function MainPage({isAuthenticated, setIsAuthenticated} : any ) {

    interface Product {
        id: string;
        name: string;
        images: string[];
        description : string;
        
      }

    
    const navigate = useNavigate();
    console.log(isAuthenticated);

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const options = {
            headers: {
                Authorization: "Bearer sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT"
            }
        }
      const response = await fetch('https://api.stripe.com/v1/products', options as any); 
      const data = await response.json();
      console.log("data for products: ", data.data)
      setProducts(data.data);
    };
  

  useEffect(() => {
    fetchProducts();
  }, []);

   console.log(products);

//   useEffect(() => {
//     setIsAuthenticated(!!localStorage.getItem("token"));
//   }, [isAuthenticated]); 


function handleLogout(){
    localStorage.removeItem("token");
    setIsAuthenticated(false);

 }

    return (
        <>
        <main>
            <div>
            <Container maxWidth= "sm">
                <Typography variant = "h1" align="center" gutterBottom >
                    Photo Album
                </Typography>
                <Typography variant = "h5" align="center" paragraph>
                Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.
                </Typography>
                <Stack direction= {{xs : "column" ,md : "row"}} useFlexGap spacing={2} flexWrap="wrap" justifyContent="center" alignItems='center' divider = {<Divider orientation="vertical" flexItem />}> 
                    <Button variant="outlined" onClick={() => navigate("/register")} > 
                        Subscribe
                    </Button>
                    {isAuthenticated ? <Button variant="outlined" onClick={handleLogout}> 
                        Logout
                    </Button> : <Button variant="outlined" onClick={() => navigate("/login")}> 
                        Login
                    </Button>  }
                </Stack>
            </Container>
            </div>
            <Container style={{ padding : '20px 0px'}} maxWidth = "md">
                <Grid container maxWidth="md" style={{ marginTop : '10px'}} spacing={4}>
                    {products.map((product ) => (
                        <Grid key = {product.id}item xs = {12} sm = {6} md = {4} >
                        <Card style={{ display: 'flex' , flexDirection : "column", height  :"100%"}}  >
                            <CardMedia style={{ paddingTop : '56.25%'}} sx ={{height : "90px"}}
                            image = {product.images[0]}
                            title = {product.id}
                            />    
                           <CardContent style={{flexGrow : "1"}} >
                            <Typography variant = "h4"  >
                                {product.name}
                            </Typography>
                            <Typography>
                               {product.description}
                            </Typography>
                           </CardContent>
                           <CardActions>
                            <Button variant="contained" color = "primary" size = "small" >Subscribe</Button>
                            
                           </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
        <footer style={{backgroundColor : "white", margin : "20px 0px" }}>
            <Typography variant="h5" align="center" gutterBottom>
                Footer 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
                This is the footer give them anything to give it purpose 
            </Typography>
        </footer>
        </>
    )
};

