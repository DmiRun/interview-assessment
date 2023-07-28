const apiUrl = "https://api.github.com/search/repositories";

async function GetDataJson(url) {
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

function ConvertResponce(responce) {
    console.log(responce);
}

exports.GetPopularRepos = function(startDate) {
    let formattedDate;

    if(startDate) {
        formattedDate = startDate.toISOString().split("T")[0];

    }
    else {
        const dateNow = new Date();
        const startDate = new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, dateNow.getDay());
        formattedDate = startDate.toISOString().split("T")[0];
    }
    const query = `q=created:>${formattedDate}&`
    + `sort:stars`;

    const endpoint = `${apiUrl}?${query}`;

    let responce;

    const result = GetDataJson(endpoint)
    .then(ConvertResponce)
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });
}