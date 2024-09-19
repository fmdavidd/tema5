const express = require('express');
const app = express();
const path = require('path');

const exchangeRates = {
  USD: 1,
  EUR: 0.94,
  GBP: 0.82,
  JPY: 143.87,
  ARS: 1240,
};

app.use(express.static('public'));

app.get('/api/convert', (req, res) => {
  const { from, to, amount } = req.query;
  
  if (!exchangeRates[from] || !exchangeRates[to]) {
    return res.status(400).json({ error: 'Divisa no soportada' });
  }

  const amountNumber = parseFloat(amount);
  if (isNaN(amountNumber)) {
    return res.status(400).json({ error: 'Cantidad inválida' });
  }

  const conversionRate = exchangeRates[to] / exchangeRates[from];
  const convertedAmount = amountNumber * conversionRate;

  res.json({
    from,
    to,
    originalAmount: amountNumber,
    convertedAmount: convertedAmount.toFixed(2),
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
