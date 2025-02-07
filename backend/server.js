const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const addressRoutes = require('./routes/address');
const register=require('./routes/register')
const login=require('./routes/login')
const SearchList = require('./routes/books');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use('/api', addressRoutes);
app.use('/api',register)
app.use('/api',login)
app.use('/api',SearchList)
app.use('/uploads',express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected les gouw'))
.catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
