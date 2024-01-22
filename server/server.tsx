
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('pk_test_51ObKZ9EVITF2DHVDaMpdNhSHKAaP45uFYEQZv26Dxp8z6Soi50kvaAFKaY7OFnrpifu5EZFRQBXJL23MlvDCadxn00It49ff4c');

const app = express();
app.use(express.json());

app.post('/v1/customers', async (req, res) => {
  try {
    const { email, name } = req.body;

    const customer = await stripe.customers.create({
      email,
      name,
    });

    res.json({ customerId: customer.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
