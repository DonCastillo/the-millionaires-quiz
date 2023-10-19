import { MONGO_APP_ID, MONGO_BASE_URI, MONGO_COLLECTION, MONGO_DB, MONGO_DB_SOURCE, MONGO_USER_EMAIL, MONGO_USER_PASSWORD } from "$lib/env"
import type ScoreInterface from "$lib/interfaces/score.interface";
import axios from "axios";
import * as Realm from "realm-web";

const app = new Realm.App({ id: MONGO_APP_ID });

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


export const submitScore = async (username: string | null, prize: number = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
			const data = JSON.stringify({
				collection: MONGO_COLLECTION,
				database: MONGO_DB,
				dataSource: MONGO_DB_SOURCE,
                document: {
                    username: username,
                    prize: prize,
                    date: new Date()
                }
			});

			var config = {
				method: "post",
				url: `${MONGO_BASE_URI}/action/insertOne`,
				headers: await getHeader(),
				data: data,
			};

			await axios(config).then((response) => {
				if (response.status !== 201) throw new Error();
                if(!response.data.insertedId) throw new Error();
				resolve(response.data.insertedId);
			});
		} catch (error: any) {
			reject(new Error("Cannot retrieve scores."));
		}
    });
};

export const getScores = async (limit: number = 10) => {
	console.log("getting Scores..");
	return new Promise<ScoreInterface[]>(async (resolve, reject) => {
		try {
			const data = JSON.stringify({
				collection: MONGO_COLLECTION,
				database: MONGO_DB,
				dataSource: MONGO_DB_SOURCE,
				sort: { prize: -1, date: -1, },
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
				resolve(documents);
			});
		} catch (error: any) {
			reject(new Error("Cannot retrieve scores."));
		}
	});
};

export const getScore = async (id: string) => {
    return new Promise<ScoreInterface>(async (resolve, reject) => {
        try {
			const data = JSON.stringify({
				collection: MONGO_COLLECTION,
				database: MONGO_DB,
				dataSource: MONGO_DB_SOURCE,
                filter: { _id: { "$oid": id } }
			});

			var config = {
				method: "post",
				url: `${MONGO_BASE_URI}/action/findOne`,
				headers: await getHeader(),
				data: data,
			};

			await axios(config).then((response) => {
				if (response.status !== 200) throw new Error();
				let documents = response.data.document;
                if(Object.keys(documents).length === 0) throw new Error("No such score found.");
				resolve(documents);
			});
		} catch (error: any) {
			reject(new Error("Cannot retrieve score."));
		}
    });
}
