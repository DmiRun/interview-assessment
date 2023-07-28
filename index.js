const express = require("express");

const app = express();

async function GetData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers:{
        Authorization: "token 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",
        Accept: "application/vnd.github+json",
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const dateNow = new Date();
const startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDay() - 30);
const formattedDate = startDate.toISOString().split("T")[0];


const url = "https://api.github.com/search/repositories";
const query = `q=created:>${formattedDate}&`
+ `sort:stars`;
const endpoint = `${url}?${query}`;

console.log(endpoint);

// const result = GetData(endpoint)
// .then((responce) =>{
//     console.log(responce);
// })
// .catch((error) => {
//     console.log(`ERROR: ${error}`);
// });