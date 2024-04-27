const midtransClient = require('midtrans-client');
const otpGenerator = require('otp-generator');

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'YOUR-SERVER-KEY',
});

module.exports = {
  midtrans: async (req, res) => {
    const { grossAmount, firstName, lastName, email, phone } = req.body;
    let parameter = {
      transaction_details: {
        order_id: otpGenerator.generate(6),
        gross_amount: grossAmount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
      },
    };

    snap.createTransaction(parameter).then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;
      console.log('transactionToken:', transactionToken);
      res.json({transactionToken})
    });
  },
};
