const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	id_1: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator : function (id) {
				return /201[0-9][A-Za-z0-9]{4}[0-9]{4}[pP]/.test(id)
			}
		}
	},
	id_2: {
		type: String,
		trim: true,
		validate: {
			validator : function (id) {
				if (id.length===0) return true ;
				else return /201[0-9][A-Za-z0-9]{4}[0-9]{4}[pP]/.test(id)
			}
		}
	},
	score: {
		type: Number,
		default: 0
	},
	correctly_answered : [{
		type: mongoose.Schema.Types.ObjectId,
	}],
	tokens: [{
		token: {
			type: String,
		}
	}],
}, {
	timestamps: true
})

userSchema.pre('save', async function (next) {
	const user = this 
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
}) 

userSchema.methods.toJSON = function () {
	const user = this 
	const userObject = user.toObject() 

	delete userObject.password 
	delete userObject.tokens 

	return userObject
} 

userSchema.methods.generateAuthToken = async function () {
	const user = this 
	const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY) 

	user.tokens = user.tokens.concat({ token }) 
	await user.save() 

	return token
} 


const User = mongoose.model('User', userSchema)

module.exports = User