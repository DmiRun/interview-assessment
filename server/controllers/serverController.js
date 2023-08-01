const CliC = require("../../controllers/CliController.js");
const repoFetcher = require("../../controllers/GetPopularRepos.js");
const url = require("url");

exports.DeleteController = (req, res) => {
    console.log("Truncating DB!");
    CliC.ClearDB()
    .then( (result) => {
        res.status(202).end() 
    });
}

exports.GetController = (req, res) => {
    let query = url.parse(req.url, true).query;

    if(query.name){
        CliC.GetByName(query.name)
        .then((repo) => {
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

var surveyInterval = 10;
var surveyStartDate;

exports.PutController = (req, res) => {
        let query = url.parse(req.url, true).query;
        if(query.interval) {
            surveyInterval = query.minutes;

            if(query.startDate) {
                surveyStartDate = query.startDate;
            }
            else{
                const dateNow = new Date();
                let startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDay() - 30);
                surveyStartDate = startDate.toISOString().split("T")[0];
            }

            CliC.SetRequestInterval(surveyInterval, surveyStartDate);
            console.log(`Surveying interval was set to ${surveyInterval} min`);
        }
        else{
            if(!surveyStartDate){
                const dateNow = new Date();
                let startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDay() - 30);
                surveyStartDate = startDate.toISOString().split("T")[0];
            }
            //restarting interval on force updates
            CliC.SetRequestInterval(surveyInterval, surveyStartDate);
        }
        
        console.log(`Surveying GitHub API for repos starting from ${surveyStartDate} now and every ${surveyInterval} minutes from now.`)
        try{
            repoFetcher.GetPopularRepos()
            .then( res.status(202).end() );
        }
        catch{}
    };