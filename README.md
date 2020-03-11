# CHECKMATE-2020

## Assigned Responsibilities
 - Mention the responsibilities assigned to you in the following format
 - Name : Responsibilities and Assigned Games

### File structure

- public [ Will contain frontend files ]
- src
    - db
        - mongoose.js
    - graphql [ We won't be using graphql for this project initially, we can try shifting from REST to GraphQL later]
        - resolvers.js
        - schema.js
    - models
        - user.js
    - routers
        - main.js [ General endpoints ]
        - user.js [ User Management and auth]
    - app.js
    - index.js
    - passport.js
    - .gitignore

### TODO
- Add endpoints for Login and Registration in src/routers/auth.js

### Requirements
- Node, npm, mongodb should be installed in your system.
- In case you don't have node and npm, download it from <https://nodejs.org/en/download/>
- In case you don't have mongodb, install it from <https://www.mongodb.com/download-center/community>
- Go to the root directory of the project and execute this in terminal to install node_modules
```
npm install
```

### Starting up the server
- Start the mongo database using 
```
cd {path-to-mongodb}/mongodb/bin
./mongod --dbpath {path-to-data-directory-for-mongo}/mongodb-data
```
- Navigate to the root directory of the project in another terminal window.
- To run the project in development mode, run ```npm run dev```
- To run the project in production mode, run ```npm run start```
- Go to <localhost:3000> in your browser.


## Note
- Each of you shall be working in a separate router file under the folder src/routers
- Depending on the requirements of the game, think whether you need a separate model for the game and accordingly add one under the folder src/models
- Each of you shall work in a separate model
- After you start making your router, make sure that you configure that router in src/app.js by adding app.use(router_name)
- Code for various algorithms like participant matching should be kept in src/routers in a separate file
- Environment variables can be set in config/dev.env
- Whenever there is a change in package.json, you have to install new node_modules using :
```
npm install
```
- We will use ejs for dynamic rendering of content. If you are not familiar with it, learn it from <https://www.npmjs.com/package/ejs>


## Contributing [Important]
- Make sure that you don't push code with bugs
- Before making any commit pull the changes from the head repository
- Don't make changes in portion assigned to other person without informing him
- Make meaningful commits
- Avoid using upload files, use the Command line for git
- Avoid pushing unnecessary files like your IDE files. Make use of .gitignore . Currently vscode and webstorm ide files are only removed from git vcs.