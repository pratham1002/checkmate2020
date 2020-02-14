const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')


const typeDefs = `
	type User{
	    username : String!
	    score : Int!
	    correctly_answered : [ID]
	}
	type Question{
	    _id : ID!
	    question : String!
	    score_increment : Int!
	    score_decrement : Int!
	}
	type Query{
	    info : User
	    allUsers: [User]
	    allQuestions  ( zone : Int! ): [Question]
	}
    input UserInput{
        username : String!
        password : String!
        id_1 : String!
        id_2 : String
	}
	type Mutation{
	    register (input : UserInput ) : String
	    login (username : String!, password : String!) : String
	}
` 

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = schema
