const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieparse = require('cookie-parser');

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded( {extended:true} ));
app.use(cors());
app.use(cookieparse());

require('./DB/conn');

app.use('/files',express.static('Files/index.html'));
require('./mainroutes')(app);

app.listen(PORT,() => {
    console.log(`listening at port number ${PORT}`);
})