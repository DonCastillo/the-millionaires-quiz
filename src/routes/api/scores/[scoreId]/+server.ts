import { MONGODB_PASSWORD, MONGODB_USER_NAME } from "$lib/env";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const BASE_URI = `mongodb+srv://${MONGODB_USER_NAME}:${MONGODB_PASSWORD}@cluster0.tdex8lk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(BASE_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export const GET = async ({ params }) => {
	console.log("Getting A Scores");
    console.log("params: ", params.scoreId)
	try {
		await client.connect();
		await client.db("millionaire-quiz").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");

		const database = client.db("millionaire-quiz");
		const collection = database.collection("scores");
        const scoreId = params.scoreId;
        const query = { _id: new ObjectId(scoreId) };
        const document = await collection.findOne(query);
		
		return new Response(
			JSON.stringify({ data: document ? document : {} }),
			{ status: 200 }
		);

	} catch(error: any) {
		console.log("error: ", error.message)	
		return new Response(
			// JSON.stringify({ error: error.message }),
			// { status: 400 }
			JSON.stringify({ data: {} }),
			{ status: 200 }
		);
	} finally {
		await client.close();
	}
	
};