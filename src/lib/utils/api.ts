import { CategoryName } from "$lib/constants/category.constants";
import { getCategoryIcon, stringToCategoryName } from "./type";
import { error } from "@sveltejs/kit";
import axios from "axios";

const BASE_ENDPOINT = "https://opentdb.com/";

/** 
 * Returns a unique token to ensure quiz questions returned are not duplicated
 */
export const getToken = async () => {
    return new Promise(async (resolve, reject) => {
        console.log("getting token ...");
        await axios.get(`${BASE_ENDPOINT}/api_token.php?command=request`)
            .then((response) => {
                if(response.status !== 200) throw new Error();
                if(response.data.response_code !== 0) throw new Error();
                if(response.data.token === "") throw new Error();
                resolve(response.data.token);
            })
            .catch((error) => reject(new Error("Cannot retrieve token.")))
    })
}

/** Deletes the token. Called after the game is over */
export const deleteToken = async (token: string) => {
    return new Promise(async (resolve, reject) => {
        console.log("deleting token ...");
        await axios.get(`${BASE_ENDPOINT}/api_token.php?command=reset&token=${token}`)
            .then((response) => {
                if(response.status !== 200) throw new Error();
                if(response.data.response_code !== 0) throw new Error();
                resolve(true);
            })
            .catch((error) => reject(new Error("Cannot delete token.")))
    });
}

/** Returns a complete list of question categories */
export const getCategories = async (token: string) => {
    return new Promise(async (resolve, reject) => {
        console.log("retrieving categories ...");
        await axios.get(`${BASE_ENDPOINT}/api_category.php?token=${token}`)
            .then((response) => {
                if(response.status !== 200) throw new Error();
                if(response.data.trivia_categories.length === 0) throw new Error();
                const categories = response.data.trivia_categories.map((category: any) => {
                    const categoryName = stringToCategoryName(category.name);
                    console.log("category name: ", categoryName);
                    return {
                        name: categoryName,
                        icon: getCategoryIcon(categoryName),
                    }
                });
                resolve(categories);
            })
            .catch((error) => reject(new Error("Cannot retrieve categories.")))

    });
}