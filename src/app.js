const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const User = require('./models/user')

const bodyParser = require('body-parser') 
require('./db/mongoose') 
const express = require('express') 
const path = require('path') 
const main_router = require('./routers/main')
const auth_router = require('./routers/auth')
const oauth2_router = require("./routers/bitsmail-oauth2")
const cookieParser = require('cookie-parser') 
/*const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema')*/
const jwt = require('express-jwt') 
const http =require('http')
const socketio = require("socket.io")

const app = express() 
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public') 

app.set('view engine', 'ejs')
app.set('views', publicDirectoryPath) 


const authmiddleware = jwt({
    secret: process.env.SECRET_KEY,
    credentialsRequired : false
})

//Setup Admin Panel
AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  resources: [User],
  rootPath: "/admin",
});
const router = AdminBroExpress.buildRouter(adminBro);

// This middleware provides us user as req.user . We can check if user is authenticated by checking for req.user
app.use(authmiddleware)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath, {index: '_'})) 


// Next 5 lines help in parsing input and getting req.body
app.use(bodyParser.urlencoded({ extended: false })) ;
// parse application/json
app.use(bodyParser.json()) ;
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) 

// parses cookies and gives an object req.cookies
app.use(cookieParser()) 

app.use(adminBro.options.rootPath, router)

app.use(main_router)
app.use(auth_router)
app.use(oauth2_router)

/*app.use('/graphql', graphqlHTTP(req => ({
    schema: schema,
    graphiql: true,
    context: {
        user : req.user
    }
}))
)*/


module.exports = {server,io};
