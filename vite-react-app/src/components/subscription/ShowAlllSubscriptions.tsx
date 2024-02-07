import { useEffect, useState } from 'react';
import Stripe from "stripe";
import getCustomerCredentialsFromLocalStorage from '../../shared/helper/getCustomerCredentialsFromLocalStorage';
import { Typography } from '@mui/material';
import { Grid, Card, CardContent, CardActions, Button , Container} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../shared/routes/Routes';


const stripe2 = new Stripe('sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT');

const ShowAlllSubscriptions = () => {

    const { customerId } = getCustomerCredentialsFromLocalStorage();
    const [subscriptions , setSubscriptions] = useState<any>();
    const navigate = useNavigate();
    const {customerName, customerEmail}: any= getCustomerCredentialsFromLocalStorage();
    

    const fetchSubscriptions = async () => {
        try {
            const subscriptions = await stripe2.subscriptions.list({
                customer: customerId,
                status: "all"
            });
            setSubscriptions(subscriptions.data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };


    useEffect(() => {
        fetchSubscriptions();
    }, [customerId]);

    console.log("Subscriptions " , subscriptions);


    const handleCancelSubscription = async (subscriptionId : string) => {
        const cancelSubscription = await stripe2?.subscriptions.cancel(
            subscriptionId
          );
          console.log("------Cancel Subscription", cancelSubscription);
    }

    // const handleResumeSubscription = async( subscriptionId : string) => {
    //   console.log("from handle", subscriptionId);
    //   const resumeSubscription = await stripe2?.subscriptions.resume(
    //     subscriptionId,
    //     {
    //       billing_cycle_anchor: 'now',
    //     }
    //   );
    //   console.log("Resume Sunscription", resumeSubscription)
    // }

    const handleUpdateSubscription = async(subscription : any) => {

      console.log("Subsription from update Subscription " , subscription);
      navigate (Routes.UpdateSubscription, {state : { subscription : subscription }});
      
    }

    return (
        <div>
            <Typography variant = "h3" align='center' mb={2} mt={3}> Subscriptions</Typography>
            <Grid container justifyContent="center">
  <Grid item xs={12} sm={8} md={6} lg={8}>
    <Typography variant="h6" align="center" mb={3} color="textSecondary">
      Welcome to your subscription dashboard! Here, you can easily manage and keep track of all your active subscriptions in one place. Whether it's a monthly service, an annual plan, or a customized package, you'll find all the details you need right here.
    </Typography>
    <Typography variant="h6" align="center" mb={7} color="textSecondary">
      Browse through your subscriptions to view important information such as billing details, renewal dates, and plan features. You can easily modify your subscription preferences, upgrade or downgrade your plan, or cancel a subscription if necessary.
    </Typography>
  </Grid>
</Grid>
            <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center">
            {subscriptions && subscriptions.map((subscription: any) => (
                <Grid
                item
                xs={12}
                md={6}
                justifyContent="center"
                alignItems="center"
              >
                <Card
                  sx={{
                    height: "100%",
                    width : "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                    <CardContent style={{ flexGrow: "1" }}>
                    <Typography variant="body1" sx = {{color :  " #008080"}}> { subscription.id }</Typography>
                    <Typography variant="body1"> Name: { customerName + " | " + subscription.customer }</Typography>
                    <Typography variant="body1" mb={2} sx = {{color :  "#0000FF"}}>{ customerEmail }</Typography>
                    <hr />
                    
                    <Typography variant="body1" >Status : { subscription.status }</Typography>
                    <Typography variant="body1" sx = {{color :  "#008000"}}>Creation : {new Date(subscription.current_period_start
 * 1000).toLocaleDateString()}</Typography>
                    <Typography variant="body1" sx = {{color :  "#FF0000"}}>Ended : {new Date(subscription.current_period_end
 * 1000).toLocaleDateString()}</Typography>



                    


                      <Typography variant="h4" mt = {2} gutterBottom>{subscription.plan.amount +subscription.plan.currency  + " / " +  subscription.plan.interval}</Typography>
                      
                      <Typography variant="body1" color="textSecondary">
                      A draft invoice for {subscription.plan.amount} {subscription.plan.currency} / {subscription.plan.interval} to mahnoor.afzal@gmail.com was finalized. 
  This represents the agreed-upon subscription plan and outlines the details of the services provided. 
</Typography>
                    </CardContent>
                    <CardActions>
                      {(subscription.status == "incomplete") && 
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleCancelSubscription(subscription.id)}
                      >
                        Cancel
                      </Button> }
                      {(subscription.status == "incomplete") && 
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleUpdateSubscription(subscription)}
                      >
                        Update
                      </Button> }
                      {(subscription.status == "canceled") && 
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        // onClick={() => handleResumeSubscription(subscription.id)}
                      >
                        Resume
                      </Button> }
                    </CardActions>
                  </Card>
              </Grid>
            ))}
            </Grid>
            </Container>
        </div>
    );
}

export default ShowAlllSubscriptions;
