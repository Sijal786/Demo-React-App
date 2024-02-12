import { useEffect, useState } from "react";
import Stripe from "stripe";
import getCustomerCredentialsFromLocalStorage from "../../shared/helper/getCustomerCredentialsFromLocalStorage";
import { Typography } from "@mui/material";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../shared/routes/Routes";
import { useFetchSubscriptions } from "../../services/hooks/useFetchSubscriptions";
import { useCancelSubscription } from "../../services/hooks/useCancelSubscription";
import ShowAlert from "../../shared/components/ShowAlert";
import { useResumeSubscription } from "../../services/hooks/useResumeSubscription";

const ShowAllSubscriptions = () => {
  const { customerId } = getCustomerCredentialsFromLocalStorage();
  const { customerName, customerEmail } =
    getCustomerCredentialsFromLocalStorage();
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const { isLoading, error, isError, data }: any =
    useFetchSubscriptions(customerId);

  const { isLoading: cancelSubscriptionLoading, mutate: cancelSubscription } =
    useCancelSubscription();

  const {
    isLoading: resumeSubscriptionLoading,
    isError: resumeSubscriptionError,
    error: resumeSubscriptionErrorData,
    mutate: resumeSubscription,
  } = useResumeSubscription();

  const handleCancelSubscription = async (subscriptionId: string) => {
    setSubscriptionId(subscriptionId);
    console.log("from handleCancel", subscriptionId);
    cancelSubscription(subscriptionId);
    setSuccessAlert(true);
  };

  const handleResumeSubscription = async (subscriptionId: string) => {
    console.log("from handle", subscriptionId);
    resumeSubscription(subscriptionId);
    // const resumeSubscription = await stripe2?.subscriptions.resume(
    //   subscriptionId,
    //   {
    //     billing_cycle_anchor: 'now',
    //   }
    // );
    console.log("Resume Subscription", resumeSubscription);
  };

  const handleUpdateSubscription = async (subscription: any) => {
    console.log("Subsription from update Subscription ", subscription);
    navigate(Routes.UpdateSubscription, {
      state: { subscription: subscription },
    });
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setSubscriptions(data.data.data);
      setSubscriptionId(subscriptionId);
      console.log("from useEffect", subscriptionId);
      console.log("Subscriptions updates ", data.data.data);
    }
  }, [isLoading, isError, data, handleCancelSubscription]);

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <Typography variant="h3" align="center" mb={2} mt={3}>
        {" "}
        Subscriptions
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={8}>
          <Typography variant="h6" align="center" mb={3} color="textSecondary">
            Welcome to your subscription dashboard! Here, you can easily manage
            and keep track of all your active subscriptions in one place.
            Whether it's a monthly service, an annual plan, or a customized
            package, you'll find all the details you need right here.
          </Typography>
          <Typography variant="h6" align="center" mb={7} color="textSecondary">
            Browse through your subscriptions to view important information such
            as billing details, renewal dates, and plan features. You can easily
            modify your subscription preferences, upgrade or downgrade your
            plan, or cancel a subscription if necessary.
          </Typography>
        </Grid>
      </Grid>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center">
          {subscriptions?.map((subscription: any) => (
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
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent style={{ flexGrow: "1" }}>
                  <Typography variant="body1" sx={{ color: " #008080" }}>
                    {" "}
                    {subscription.id}
                  </Typography>
                  <Typography variant="body1">
                    {" "}
                    Name: {customerName + " | " + subscription.customer}
                  </Typography>
                  <Typography variant="body1" mb={2} sx={{ color: "#0000FF" }}>
                    {customerEmail}
                  </Typography>
                  <hr />

                  <Typography variant="body1">
                    Status : {subscription.status}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#008000" }}>
                    Creation :{" "}
                    {new Date(
                      subscription.current_period_start * 1000
                    ).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#FF0000" }}>
                    Ended :{" "}
                    {new Date(
                      subscription.current_period_end * 1000
                    ).toLocaleDateString()}
                  </Typography>

                  <Typography variant="h4" mt={2} gutterBottom>
                    {subscription.plan.amount +
                      subscription.plan.currency +
                      " / " +
                      subscription.plan.interval}
                  </Typography>

                  <Typography variant="body1" color="textSecondary">
                    A draft invoice for {subscription.plan.amount}{" "}
                    {subscription.plan.currency} / {subscription.plan.interval}{" "}
                    to mahnoor.afzal@gmail.com was finalized. This represents
                    the agreed-upon subscription plan and outlines the details
                    of the services provided.
                  </Typography>
                </CardContent>
                <CardActions>
                  {subscription.status !== "cancel" && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleCancelSubscription(subscription.id)}
                    >
                      Cancel
                    </Button>
                  )}
                  {subscription.status !== "cancel" && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleUpdateSubscription(subscription)}
                    >
                      Update
                    </Button>
                  )}
                  {subscription.status == "canceled" && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      // onClick={() => handleResumeSubscription(subscription.id)}
                    >
                      Resume
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {successAlert && (
          <ShowAlert
            severity="success"
            content="The subscription is cancelled"
            setSuccessAlert={setSuccessAlert}
          />
        )}
        {/* {cancelSubscriptionLoading && <Loading />} */}
      </Container>
    </div>
  );
};

export default ShowAllSubscriptions;
