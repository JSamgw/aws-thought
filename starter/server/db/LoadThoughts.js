const AWS = require('aws-sdk'); //Interface for dynamoDB
const fs = require('fs'); //Filse system package to read user data
//DocumentClient() class 
//this time to create the dynamodb service object
AWS.config.update({
    region: 'us-east-2',
  });
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
  });

//fs paakage will be used to assign all objects to allUsers.
console.log('Importing thoughts into DynamoDB. Please wait.');
const allUsers = JSON.parse(
  fs.readFileSync('./server/seed/users.json', 'utf8'),
);

//Loop through all users and create a params obj
allUsers.forEach(user => {
    const params = {
      TableName: "Thoughts",
      Item: {
        "username": user.username,
        "createdAt": user.createdAt,
        "thought": user.thought
      }
    };

    dynamodb.put(params, (err, data) => {
        if (err) {
          console.error("Unable to add thought", user.username, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("PutItem succeeded:", user.username);
        }
      });
    });