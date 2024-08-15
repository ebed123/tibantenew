const express = require('express');
const bodyParser = require('body-parser');
const midtransClient = require('midtrans-client');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create Snap API instance
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-Dcq_-_hybNGJUS0jg2xWGjU0',
});

app.post('/create-transaction', (req, res) => {
    const {
      name, email, phone, quantity,
    } = req.body;
    console.log('Received data:', { name, email, phone, quantity });
  
    const gross_amount = 100000 * quantity; // Mengasumsikan setiap barang berharga 100000
  
    const parameter = {
      transaction_details: {
        order_id: `order-${Date.now()}`,
        gross_amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: name.split(' ')[0],
        last_name: name.split(' ')[1] || '',
        email,
        phone,
      },
    };
  
    snap.createTransaction(parameter)
      .then((transaction) => {
        console.log('Transaction created:', transaction);
        const transactionToken = transaction.token;
        res.json({ transactionToken });
      })
      .catch((error) => {
        console.error('Midtrans Error:', error);
        res.status(500).json({ error: error.message });
      });
  });
  
