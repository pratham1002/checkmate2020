const User = require('../models/user')
const Question = require('../models/question')
const bcrypt = require('bcryptjs')


const resolvers = {
	Query: {
		async allUsers(){
			return User.find().select("username score").sort({
				score: -1 // Sort in Descending order
			}).limit(10)
		},
		async info(_, args, context){
			return await User.findById(context.user._id)
		},
		async allQuestions(_, { zone }){
			return Question.find({
				zone : zone
			}).select("-answer")
		}
	},
	Mutation: {
		async register(_, { input }){
			const user = await User.create(input);
			return await user.generateAuthToken()
		},
		async login ( _, { username, password } ){
			const user = await User.findOne({ username: username }) ;
			if (!user) {
				throw Error("Invalid username")
			} else {
				const match = await bcrypt.compare(password, user.password);
				if (!match)
					throw Error("Incorrect password") ;
				else
					return await users.generateAuthToken() ;
			}
		}
	}
} 

module.exports = resolvers