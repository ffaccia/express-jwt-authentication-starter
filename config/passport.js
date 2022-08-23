var fs = require('fs');
var path = require('path');
const {User} = require('../models/user')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;

//const User = require('mongoose').model('User');


console.log("----------------")
console.log(User)

var pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
var PUB_KEY = fs.readFileSync(pathToKey, 'utf8');


var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

//console.log(options)
var strategy = new JwtStrategy(options, (payload, done) => {
    User.findOne( { _id: payload.sub })
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => console.log("Errore findOne "+err))
})

// TODO
module.exports = (passport) => {
    passport.use(strategy)
}