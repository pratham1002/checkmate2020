const mongoose = require('mongoose') 
/*const Question = require('../models/question')
const fs = require('fs')
const path = require('path')*/

const MONGODB_URL = "mongodb+srv://anshal:anshal@cluster0-vf9ly.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true // To use the new Server Discover and Monitoring engine
}).then(async (db)=>{
	console.log("Successfully connected to database :)") ;
/*	Can see this code i case you need to seed the database
	const count = await mongoose.connection.db.collection("questions").countDocuments()
	if (count === 0){
		console.log("Seeding the database..") ;
		const questions = JSON.parse(fs.readFileSync(path.join(__dirname, './fixture.json')));
		var question_input;
		for (question_input of questions.questions){
			const question = await Question.create(question_input) ;
			question.save() ;
		}
		console.log("Seeded the database")
	}*/
}).catch(error => {
	console.log(error) 
	console.log("Not able to connect to database :(")
})
