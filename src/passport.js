const passport = require('passport')
const User = require('./models/user')

passport.serializeUser(function(user, done) {
	done(null, user.id)
})

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	})
})

var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {} 

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt']
    }
    return token
}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() 
opts.secretOrKey = process.env.SECRET_KEY 

passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
	User.findOne({_id: jwt_payload._id}, function(err, user) {
		if (err) {
			return done(err, false)
		}
		if (user) {
			return done(null, user)
		} else {
			return done(null, false)
			// or you could create a new account
		}
	})
}))

opts = {} 
opts.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor]);
opts.secretOrKey = process.env.SECRET_KEY 

passport.use('cookie', new JwtStrategy(opts, function(jwt_payload, done) {
	console.log("jwtpayload is : ", jwt_payload, jwt_payload.sub)
	User.findById(jwt_payload._id, function(err, user) {
		if (err) {
			return done(err, false)
		}
		console.log(user)
		if (user) {
			return done(null, user)
		} else {
			return done(null, false)
			// or you could create a new account
		}
	})
}))

module.exports = passport 