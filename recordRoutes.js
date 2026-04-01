
const express = require('express');
const router = express.Router();
const Record = require('../models/Record');
const auth = require('../middleware/auth');

router.post('/', auth(['admin']), async (req,res)=>{
  const record = await Record.create(req.body);
  res.json(record);
});

router.get('/', auth(['admin','analyst','viewer']), async (req,res)=>{
  const {page=1, limit=5} = req.query;
  const records = await Record.find()
    .skip((page-1)*limit)
    .limit(parseInt(limit));
  res.json(records);
});

router.put('/:id', auth(['admin']), async (req,res)=>{
  const updated = await Record.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updated);
});

router.delete('/:id', auth(['admin']), async (req,res)=>{
  await Record.findByIdAndDelete(req.params.id);
  res.json({msg:"Deleted"});
});

module.exports = router;
