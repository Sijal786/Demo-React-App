import axios from "axios"
import { Container } from "@mui/system"


export default function Weather(){

    async function fetchData() {
        const options = {
            method: 'GET',
            url: 'https://cities-temperature.p.rapidapi.com/weather/v1',
            params: {city: 'Kamoke '},
            headers: {
              'X-RapidAPI-Key': '5190cdf797mshe5f92a18298a6cbp1d1edfjsnaff3e2eee45e',
              'X-RapidAPI-Host': 'cities-temperature.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
          } catch (error) {
              console.error(error);
          }

        }
      
      fetchData();

    return (
        <>
        <Container > 
        

        </Container>
        </>
    )
}