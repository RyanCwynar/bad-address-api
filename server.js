require('babel-polyfill');
const apiKey = 'EZAKbe388faaf8904b22ae32c03c79bbc051zPeTobMx9YbMRHdK7At46w'
const EasyPost = require('@easypost/api');
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const get = require('lodash/get')	

const ep = new EasyPost(apiKey);

const validateAddress = async (req, res, next) => {
  const addressToVerify = Object.assign({ verify: ["delivery"] }, get(req, 'body', {}))
  const toAddress = new ep.Address(addressToVerify)
  try{
    await toAddress.save()
    res.json(toAddress)
  }catch(e){
    res.json(e.errors)
  }
}

app.use(bodyParser())
app.post('/validate-address', validateAddress)


app.listen(3000, () => {
	console.log('listening on 3000')
})
