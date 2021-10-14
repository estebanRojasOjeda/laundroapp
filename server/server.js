const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./configuration/db.config');
const app = express();
const port = 8000;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use( cookieParser() );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db;

require('./route/user.route')(app);
require('./route/customer.route')(app);
require('./route/wash.cycle.route')(app);



app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
