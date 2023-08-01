require("dotenv").config();
const DataBase = require("./DatabaseController.js");
const GetPopularRepos = require("./GetPopularRepos.js").GetPopularRepos;
var currentInterval = null;

exports.GetByID = async (id) => {
    return await DataBase.SendQuery("SELECT id, repoFullName, programmingLanguage, repoUrl FROM GitHubRepositories\n"
    + `WHERE id = ${id}`);
}

exports.GetByName = async (name) => {
    return await DataBase.SendQuery("SELECT id, repoFullName, programmingLanguage, repoUrl FROM GitHubRepositories\n"
    + `WHERE repoName = '${name}' OR repoFullName = '${name}'`);
}

exports.GetAll = async () => {
    return await DataBase.SendQuery("SELECT * FROM GitHubRepositories");
}

exports.ClearDB = async () => {
    await DataBase.SendQuery("TRUNCATE TABLE GitHubRepositories");
}

exports.SetRequestInterval = (minutes, startDate) => {
    if(currentInterval){
        clearInterval(currentInterval);
        currentInterval = null;
    }
    currentInterval = setInterval(GetPopularRepos, minutes*60*1000, startDate);
}