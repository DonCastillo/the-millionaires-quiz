import { MONGODB_PASSWORD, MONGODB_USER_NAME } from "$lib/env";
import { MongoClient, ServerApiVersion } from "mongodb";

const BASE_URI = `mongodb+srv://${MONGODB_USER_NAME}:${MONGODB_PASSWORD}@cluster0.tdex8lk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(BASE_URI, {

	serverApi: {
		version: ServerApiVersion.v1,
		deprecationErrors: false,
		strict: true,
	}
});

console.log("BASE_URI: ", BASE_URI)

export const GET = async ({request, url}) => {
	console.log("Getting All Scores");
	const limit = Number(url.searchParams.get("limit")) ?? 10;

	try {
		await client.connect();
		await client.db("millionaire-quiz").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");

		const database = client.db("millionaire-quiz");
		const collection = database.collection("scores");

		let documents = await collection.find().sort({ prize: -1, date: -1 }).limit(limit).toArray();

		return new Response(
			JSON.stringify({ data: documents }),
			{ status: 200 }
		);

	} catch(error: any) {
		console.log("error: ", error);
		return new Response(
			JSON.stringify({ data: [] }),
			{ status: 200 }
		);
	} finally {
		await client.close();
	}
	
};


export const POST = async ({request}) => {
	console.log("Adding A Scores");
	const body = await request.json();
	const { username, prize } = body;
	console.log("BODY: ", body)

	if(!username) throw new Error("Name undefined.");
	if(isNaN(prize)) throw new Error("Prize invalid.");
	

	try {
		await client.connect();
		await client.db("millionaire-quiz").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");

		const database = client.db("millionaire-quiz");
		const collection = database.collection("scores");

		const documents = await collection.insertOne({ username, prize: parseInt(prize), date: new Date() });
		console.log("documents: ", documents)

		return new Response(
			JSON.stringify({ data: documents }),
			{ status: 201 }
		);

	} catch(error: any) {
		return new Response(
			JSON.stringify({ error: error.message }),
			{ status: 400 }
		);
	} finally {
		await client.close();
	}
};


