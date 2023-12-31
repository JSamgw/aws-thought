//Create SDK Package
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
  });

//DynamoDB service object - dynamodb
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

//params will hold the schema and teh metadata.
const params = {
    TableName: 'Thoughts',
    KeySchema: [
      { AttributeName: 'username', KeyType: 'HASH' }, // Partition key
      { AttributeName: 'createdAt', KeyType: 'RANGE' }, // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'username', AttributeType: 'S' },
      { AttributeName: 'createdAt', AttributeType: 'N' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  //params db object - dynamodb can now be used to the
  //DynamoDB
  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2),
      );
    } else {
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2),
      );
    }
  });