#! /usr/bin/env node
const yargs = require("yargs");
const CliC = require("../controllers/CliController.js");
const repoFetcher = require("../controllers/GetPopularRepos.js");

function OutputTable(table){
    console.table( table.recordset.sort( (a, b) => b.stars - a.stars ) );
}

var argv = require("yargs/yargs")(process.argv.slice(2))
    .command({
        command:    '*',
        handler:    (argv) => {
            CliC.GetAll().then(OutputTable);
        }
    })
    .command({
        command:    'survey <minutes> [start_date]',
        aliases:    ['survey', 'interval'],
        desc:       'Updated database on each interval in minutes searching for repositories from selected [start_date]',
        builder:    (yargs) => {
            yargs.positional("minutes", {
                require: true
            });
            yargs.positional("start_date", {
                require: false
            })
        },
        handler:    (argv) => {
            CliC.SetRequestInterval(argv.minutes, argv.start_date);
            console.log(`Now surveying GitHub API every ${argv.minutes} min`);
        }
    })
    .command({
        command:    'clear',
        aliases:    ['clear', 'clr'],
        desc:       'Clear database',
        handler:    (argv) => {
            CliC.ClearDB();
        }
    })
    .command({
        command:    'parse [start_date]',
        aliases:    ['parse', 'p'],
        desc:       'Parse popular repositories starting from ISO_Date.(30 days before by default)',
        builder:    (yargs) => {
            yargs.positional("start_date", {
                require: false
            })
        },
        handler:    (argv) => {
            repoFetcher.GetPopularRepos(argv.start_date);
        }
    })
    .command({
        command:    'name <repo_name>',
        aliases:    ['name', 'n'],
        desc:       'Get repo from database by name',
        builder: yargs.positional("repo_name", {
            require: true,
            describe: "name or full name of GitHub repository"
        }),
        handler:    (argv) => {
            CliC.GetByName(argv.repo_name).then(OutputTable);
            console.log(`get by name ${argv.repo_name}`)
        }
    })
    .command({
        command:    'id <repo_id>',
        aliases:    ['id', 'i'],
        desc:       'Get repo from database by id',
        builder: yargs.positional("repo_id", {
            require: true,
            describe: "id of GitHub repository"
        }),
        handler:    (argv) => {
            CliC.GetByID(argv.repo_id).then(OutputTable);
        }
    })
    .argv;