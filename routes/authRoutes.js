const passport = require('passport');

module.exports= (app) => {

// First time login user (doesn't have a google code)
  app.get('/auth/google',passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
  
  // accessing account info on user (have a google code)
  app.get('/auth/google/callback',passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
   
  });

 app.get('/api/user',(req,res) => {
    res.send(req.user);
 });
};

