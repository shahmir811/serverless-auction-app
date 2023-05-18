import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import AWS from 'aws-sdk';
import createError from 'http-errors';
import { v4 as uuid } from 'uuid';

import commonMiddleware from '../lib/commonMiddleware';
import createAuctionSchema from '../lib/schemas/createAuctionSchema';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
	const { title } = event.body;
	const { email } = event.requestContext.authorizer;

	const now = new Date();
	const endDate = new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // after 01 hour

	const auction = {
		id: uuid(),
		title,
		status: 'OPEN',
		createdAt: now.toISOString(),
		endingAt: endDate,
		highestBid: {
			amount: 0,
		},
		seller: email,
	};

	try {
		await dynamodb
			.put({
				TableName: process.env.AUCTIONS_TABLE_NAME,
				Item: auction,
			})
			.promise();
	} catch (error) {
		console.error(error);
		throw new createError.InternalServerError(error);
	}

	return {
		statusCode: 201,
		body: JSON.stringify(auction),
	};
}

export const handler = commonMiddleware(createAuction).use(
	validator({
		eventSchema: transpileSchema(createAuctionSchema),
		ajvOptions: {
			strict: false,
		},
	})
);
