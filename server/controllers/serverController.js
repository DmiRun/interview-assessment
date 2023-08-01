const CliC = require("../../controllers/CliController.js");
const repoFetcher = require("../controllers/GetPopularRepos.js");
const url = require("url");

exports.GetController = (req, res) => {
    let query = url.parse(req.url, true).query;

    if(query.name){
        CliC.GetByName(query.name)
        .then((repo) => {
            console.table(repo.recordset);
            res.status(200)
            .type("application/json")
            .json({ repositories: repo.recordset });
        });
    }
    else if(query.id){
        CliC.GetByID(query.id)
        .then((repo) => {
            res.status(200)
            .type("application/json")
            .json({ repositories: repo.recordset });
        });
    }
    else{
        CliC.GetAll(query.id)
        .then((repo) => {
            res.status(200)
            .type("application/json")
            .json({ repositories: repo.recordset });
        });
    }
}

exports.PutController = (req, res) => {
        let query = url.parse(req.url, true).query;
        if(query.interval) {
            let start_date = null;

            if(query.startDate) {
                start_date = query.startDate;
            }
            CliC.SetRequestInterval(query.minutes,start_date);
        }

        repoFetcher.GetPopularRepos()
        .then( res.status(202) );
    };