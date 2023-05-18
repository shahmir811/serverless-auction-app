import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function closeAuction(auction) {
	const params = {
		TableName: process.env.AUCTIONS_TABLE_NAME,
		Key: { id: auction.id },
		UpdateExpression: 'set #status = :status', // status is a reserved key word in Dynamo
		ExpressionAttributeValues: {
			':status': 'CLOSED',
		},
		ExpressionAttributeNames: {
			'#status': 'status',
		},
	};

	const result = await dynamodb.update(params).promise();
	return result;
}
