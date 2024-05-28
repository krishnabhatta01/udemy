const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');
const passport = require('passport');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.MONGO_URI);


const app = express();
authRoutes(app);

app.use(
  cookieSession({
    maxAge: 2592000000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
