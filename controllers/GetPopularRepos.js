const DataBase = require("./DatabaseController.js");
const apiUrl = "https://api.github.com/search/repositories";

async function GetDataJson(url) {
    console.log("Parsing data...");
    const response = await fetch(url, {
        method: "GET",
        headers:{
            Authorization: `token ${process.env.GH_TOKEN}`,
            Accept: "application/vnd.github+json",
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
    return await response.json();
}

//gets 100 most starred repos starting from selected date
exports.GetPopularRepos = function(inputDate) {
    let formattedDate = inputDate;
    const dateNow = new Date();
    if(!inputDate) {
        let startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDay() - 30);
        formattedDate = startDate.toISOString().split("T")[0];
    }

    const query = `q=created:>${formattedDate}&`
    + `sort:stars`;

    const endpoint = `${apiUrl}?${query}`;
    
    //Returns data as an array of repositories. 
    //Structure can be found on https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories
    return GetDataJson(endpoint)
    .then(SaveToDB)
    .catch((err) => {
        console.warn(err);
    });
    //then saves them to DB
}


function SaveToDB(reposRaw) {
    if(!reposRaw){
        return Promise.reject(Error("failed to fetch data"));
    }
    if(reposRaw.message) {
        if(reposRaw.message.startsWith("API rate limit exceeded")) {
            return Promise.reject(Error("API limit exceeded!"));
        }
    }
    const repos = reposRaw.items.map(
        (repositoryRaw) => {
            let repo = {
                id:         repositoryRaw.id,
                name:       repositoryRaw.name,
                fullName:   repositoryRaw.full_name,
                language:   repositoryRaw.language,
                url:        repositoryRaw.git_url,
                stars:      repositoryRaw.stargazers_count,
            }
            return repo;
        }
    );
    const queryRows = repos.map(
        (repo) => `(${repo.id}, '${repo.name}', '${repo.fullName}', '${repo.language}', '${repo.url}', ${repo.stars})`
    )
    
    const DBQuery =`INSERT INTO GitHubRepositories(id, repoName, repoFullName, programmingLanguage, repoUrl, stars) 
    SELECT * FROM ( 
        VALUES ${queryRows.join(",\n")}
    ) AS v(id, repoName, repoFullName, programmingLanguage, repoUrl, stars) 
    WHERE NOT EXISTS ( 
        SELECT * FROM GitHubRepositories r 
        WHERE v.id = r.id 
    )`;
    return DataBase.SendQuery(DBQuery);
}