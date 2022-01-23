import AWS from 'aws-sdk';

// Update AWS config
AWS.config.update({
  accessKeyId: process.env.DB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
  region: process.env.DB_REGION,
});

// Create DynamoDB service object
const dynamoDbClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: 'latest',
});

export default dynamoDbClient;
