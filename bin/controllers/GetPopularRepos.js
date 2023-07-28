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
    return await response.json(); // parses JSON response into native JavaScript objects
}

//gets 100 most starred repos starting from selected date
exports.GetPopularRepos = function(inputDate) {
    let startDate = inputDate;
    const dateNow = new Date();
    if(!inputDate) {
        startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDay() - 30);
    }

    let formattedDate = startDate.toISOString().split("T")[0];
    console.log(formattedDate);

    const query = `q=created:>${formattedDate}&`
    + `sort:stars`;

    const endpoint = `${apiUrl}?${query}`;

    return GetDataJson(endpoint);
    //Returns data as an array of repositories. 
    //Structure can be found on https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories
}