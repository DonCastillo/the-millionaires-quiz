import type ScoreInterface from "$lib/interfaces/score.interface";
import axios from "axios";

const BASE_ENDPOINT = "/api/scores/";

export const submitScore = async (username: string | null, prize: number = 0) => {
    return new Promise(async (resolve, reject) => {
        console.log('submitting score ...');
        if(!username) reject(new Error('Invalid username'));
        await axios.post(`${BASE_ENDPOINT}`, {
            username,
            prize
        }).then((response) => {
            if(response.status !== 201) throw new Error();
            if(!response.data.data.insertedId) throw new Error();
            resolve(response.data.data.insertedId)
        })
        .catch((error) => reject(new Error('Cannot submit score.')))
    });
};


export const getScores = async (limit: number = 10) => {
    return new Promise<ScoreInterface[]>(async (resolve, reject) => {
        console.log('retrieving scores ...');
        await axios.get(`${BASE_ENDPOINT}?limit=${limit}`).then((response) => {
            if(response.status !== 200) throw new Error();
            resolve(response.data.data);
        })
        .catch((error) => reject(new Error('Cannot retrieve scores.')))
    });
}

export const getScore = async (id: string) => {
    return new Promise<ScoreInterface>(async (resolve, reject) => {
        console.log('retrieving score ...');
        await axios.get(`${BASE_ENDPOINT}/${id}`).then((response) => {
            if(response.status !== 200) throw new Error();
            if(!response.data.data) throw new Error();
            resolve(response.data.data);
        })
        .catch((error) => reject(new Error('Cannot retrieve score.')))
    });
}