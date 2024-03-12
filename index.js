const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const DB_1 = require("./DB/conn")


try {
  DB_1(mongoose)

} catch (error) {
  console.log("error >>> ", error);
}
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());

app.use('/api/file', express.static(path.join(__dirname, '/uploads')));

// Import and use main routes
const mainRoutes = require('./mainroutes'); 
app.use(mainRoutes);

app.listen(PORT, () => {
    console.log(`Listening at port number ${PORT}`);
});
