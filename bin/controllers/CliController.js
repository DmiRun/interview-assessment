require("dotenv").config();
const DataBase = require("./DatabaseController.js");

function OutputTable(table) {
    console.table( table.recordset.sort( (a, b) => b.stars - a.stars ) );
}

exports.GetByID = async (id) => {
    await DataBase.SendQuery("SELECT id, repoFullName, programmingLanguage, repoUrl FROM GitHubRepositories\n"
    + `WHERE id = ${id}`).then(OutputTable);
}

exports.GetByName = async (name) => {
    await DataBase.SendQuery("SELECT id, repoFullName, programmingLanguage, repoUrl FROM GitHubRepositories\n"
    + `WHERE repoName = '${name}' OR repoFullName = '${name}'`).then(OutputTable);
}

exports.GetAll = async () => {
    await DataBase.SendQuery("SELECT * FROM GitHubRepositories")
    .then(OutputTable);
}

exports.ClearDB = async () => {
    await DataBase.SendQuery("TRUNCATE TABLE GitHubRepositories");
}