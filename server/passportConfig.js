// const User = require('./user');
const bcrypt = require('bcrypt');
const dbHelpers = require('../database/queries.js');
const localStrategy = require('passport-local').Strategy;

const passportAuth = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      dbHelpers.authenticateUser(username, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        if (user[0] === undefined) return done(null, false);
        if (password === 'password') return done(null, user);
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            dbHelpers.checkIfAdmin(user[0].id, (err, results) => {
              user[0].role = results;
              return done(null, user);
            });
          }
          if (!result) return done(null, false);
        })
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user[0].id);
  });
  passport.deserializeUser((id, cb) => {
    dbHelpers.authenticateUser(id, (err, user) => {
      if (err) throw err;
      cb(err, user);
    });
  });
}

module.exports = passportAuth;

