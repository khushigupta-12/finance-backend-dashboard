
const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

router.get('/summary', async (req,res)=>{
  const records = await Record.find();
  let income=0, expense=0;

  records.forEach(r=>{
    if(r.type==='income') income+=r.amount;
    else expense+=r.amount;
  });

  res.json({income, expense, balance: income-expense});
});

module.exports = router;
