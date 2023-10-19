import { MONGODB_PASSWORD, MONGODB_USER_NAME } from "$lib/env";
import type ScoreInterface from "$lib/interfaces/score.interface";
import axios from "axios";
import * as Realm from "realm-web";
const app = new Realm.App({ id: "data-mzvcu" });
const MONGO_USER_EMAIL = "don.qcastillo@yahoo.com";
const MONGO_USER_PASSWORD = "1234567890";
const MONGO_COLLECTION = "scores";
const MONGO_DB = "millionaire-quiz";
const MONGO_DB_SOURCE = "Cluster0";
const MONGO_BASE_URI =
	"https://us-west-2.aws.data.mongodb-api.com/app/data-mzvcu/endpoint/data/v1";

// const BASE_URI = `mongodb+srv://${MONGODB_USER_NAME}:${MONGODB_PASSWORD}@cluster0.tdex8lk.mongodb.net/?retryWrites=true&w=majority`;

const getAccessToken = async () => {
	const credentials = Realm.Credentials.emailPassword(
		MONGO_USER_EMAIL,
		MONGO_USER_PASSWORD
	);
	const user = await app.logIn(credentials);
	console.assert(user.id === app?.currentUser?.id);
	return user;
};

const getHeader = async () => {
	const user = await getAccessToken();
	return {
		"Content-Type": "application/json",
		"Access-Control-Request-Headers": "*",
		Authorization: `Bearer ${user.accessToken}`,
	};
};

// const user = await loginEmailPassword('<USER_EMAIL>', '<USER_PASSWORD>');
// return user.accessToken;

// const client = new MongoClient(BASE_URI);

// const connect = async () => {
//     await client.connect();
//     await client.db("millionaire-quiz").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// }

// const disconnect = async () => {
//     await client.close();
// }

// export const submitScore = async (username: string | null, prize: number = 0) => {
//     // return new Promise(async (resolve, reject) => {
//     //     console.log('submitting score ...');
//     //     if(!username) reject(new Error('Invalid username'));
//     //     await axios.post(`${BASE_ENDPOINT}`, {
//     //         username,
//     //         prize
//     //     }).then((response) => {
//     //         if(response.status !== 201) throw new Error();
//     //         if(!response.data.data.insertedId) throw new Error();
//     //         resolve(response.data.data.insertedId)
//     //     })
//     //     .catch((error) => reject(new Error('Cannot submit score.')))
//     // });
// };

export const getScores = async (limit: number = 10) => {
	console.log("getting Scores..");
	return new Promise<ScoreInterface[]>(async (resolve, reject) => {
		try {
			const data = JSON.stringify({
				collection: MONGO_COLLECTION,
				database: MONGO_DB,
				dataSource: MONGO_DB_SOURCE,
				sort: { date: -1, prize: -1 },
				limit: limit,
			});

			var config = {
				method: "post",
				url: `${MONGO_BASE_URI}/action/find`,
				headers: await getHeader(),
				data: data,
			};

			await axios(config).then((response) => {
				if (response.status !== 200) throw new Error();
				let documents = response.data.documents;
                console.log("documents: ", (documents))
				resolve(documents);
			});
		} catch (error: any) {
			reject(new Error("Cannot retrieve scores."));
		}
	});
};

// export const getScore = async (id: string) => {
//     // return new Promise<ScoreInterface>(async (resolve, reject) => {
//     //     console.log('retrieving score ...');
//     //     await axios.get(`${BASE_ENDPOINT}/${id}`).then((response) => {
//     //         if(response.status !== 200) throw new Error();
//     //         if(!response.data.data) throw new Error();
//     //         resolve(response.data.data);
//     //     })
//     //     .catch((error) => reject(new Error('Cannot retrieve score.')))
//     // });
// }
