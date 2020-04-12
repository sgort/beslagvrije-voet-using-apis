# mongodb-atlas-restful-api-node-js
Prototype code base for business use case(s) illustrating usage of a RESTful API with Node.js and Express Framework

- morgan is used for logging requests to the console
- nodemon is used for automatically restarting the server when your code changes
- bcrypt is used for uer token creation (ie signup & login)
- jsonwebtoken is used for route protection POST, PATCH & DELETE requests (ie requires Authorization)

`npm start` is all you need after cloning the repo

```
steven@steven-K501LX:~/Development/mongodb-atlas-restful-api-node-js$ npm start

> mongodb-atlas-restful-api-node-js@1.0.0 start /home/steven/Development/mongodb-atlas-restful-api-node-js
> nodemon app.js

[nodemon] 2.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Connected to `demo`!

```

First use case to apply this with is process(es) concerning beslagvrije voet. See this [Google Doc](https://docs.google.com/document/d/1WwMV-4PNYnkiR3LTojHhvF5ZQY_YsWHdQPLP_F5iSW8/edit?usp=sharing) (in Dutch)

Currently support these endpoints:
### Natuurlijk Persoon
- GET a specific Natuurlijk Persoon via [Haal Centraal BRP API](https://github.com/VNG-Realisatie/Haal-Centraal-BRP-bevragen/blob/master/docs/getting-started.md)
`localhost:3000/inschrijvingbrp/:BSN`

### Users
- GET all users from the collection
`localhost:3000/users`
- POST a new user into the collection
`localhost:3000/users/signup`
- DELETE a specific user from the collection
`localhost:3000/users/:userId`
- POST a JSON Web Token for a specific user (raw body input) to login (ie use the protected routes)
`localhost:3000/users/login`

Where `userId` is the MongoDB Schema.Types.ObjectId

### Invorderingen
- GET all invorderingen of the collection
`localhost:3000/invorderingen`
- POST a single invordering into the collection
`localhost:3000/invorderingen/insert`
- GET a single invordering from the collection
`localhost:3000/invorderingen/:invorderingId`
- DELETE a single invordering from the collection
`localhost:3000/invorderingen/:invorderingId`
- PATCH a single invordering in the collection
`localhost:3000/invorderingen/:invorderingId`

Where `:invorderingId` is the MongoDB Schema.Types.ObjectId

### Gemeenten
- GET all gemeenten of the collection
`localhost:3000/gemeenten`
- POST a single and/or a serie of gemeenten into the collection
`localhost:3000/gemeenten/insert`
- GET a single gemeente from the collection
`localhost:3000/gemeenten/:GemeentecodeGM`
- DELETE a single gemeente from the collection
`localhost:3000/gemeenten/:GemeentecodeGM`
- PATCH a single gemeente in the collection
`localhost:3000/gemeenten/:GemeentecodeGM`

### Waterschappen
- GET all waterschappen of the collection
`localhost:3000/waterschappen`
- POST a single and/or a serie of waterschappen into the collection
`localhost:3000/waterschappen/insert`
- GET a single waterschap from the collection
`localhost:3000/waterschappen/:WaterschapKey`
- DELETE a single waterschap from the collection
`localhost:3000/waterschappen/:WaterschapKey`
- PATCH a single waterschap in the collection
`localhost:3000/waterschappen/:WaterschapKey`

### Preview of DisciplMongoDB Atlas
![Screenshot from 2020-04-10 10-44-54](https://user-images.githubusercontent.com/25812095/78977434-6e689280-7b18-11ea-81da-fd4789d2ba1a.png)
