const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser')

//####################### cores ##############################################
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
  next();
})

//######################### body parser #########################################
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


//########################### routers ############################################
const userRoutes = require('./app/Router/userRouter');
app.use(userRoutes)
app.use('/', (req, res) => {
  res.json({
    result: "working fine",
  })
})
mongoose.connect('mongodb://localhost:27017/newProject', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
  console.log("connected")
  app.listen(8000);
})
