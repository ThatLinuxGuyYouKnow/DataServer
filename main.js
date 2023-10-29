const express = require('express');
const app = express()
const request = require('request');
const bodyParser = require('body-parser');
const paystack_secret_key = 'sk_test_59cff139324b201a3f4bff60dc0675f9a281edb4';

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const amount = req.body.amount;  // get the payment amount from the request body
const userPhoneNumberAndEmailConcat= req.body.phone +"prestigiousDataPlugServices@gmail.com"
    // Call the Paystack API to initialize a transaction
    const event = req.body;

    // Process the webhook event
    if (event && event.type === 'message') {
      const message = event.message;
      const sender = event.sender;
  
      // Add your logic here to handle the message event
      console.log(`Received message from ${sender}: ${message}`);
    }
  
    // Send a response back to the WhatsApp API
    res.sendStatus(200);
    const options = {
        url: 'https://api.paystack.co/transaction/initialize',
        headers: {
            'Authorization': `Bearer ${paystack_secret_key}`,
            'Content-Type': 'application/json'
        },
        json: {
            'email': userPhoneNumberAndEmailConcat,
            'amount': amount
        }
    };

    request.post(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const access_code = body.data.access_code;
            const authorization_url =body.data.authorization_url;
            const reference_code = body.data.reference;
            res.json({ 'message': 'Transaction initialized successfully', 'access_code': access_code, "authorization_url":authorization_url,"reference":reference_code });
            console.log(access_code);
        } else {
            res.json({ 'message': 'Failed to initialize transaction', 'error': body });
            console.log('message: Failed to initialize transaction', 'error: ', body)
        }
    });
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
