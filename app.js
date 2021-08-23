const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const User_route = require('./routes/user_routes');
const Places_route = require('./routes/places_routes')
const SubPlaces_route = require('./routes/subPlaces_routes')
const { static } = require('express');


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use('/images',static(__dirname + "/images"))

app.use(User_route);
app.use(Places_route);
app.use(SubPlaces_route);

app.listen(90)