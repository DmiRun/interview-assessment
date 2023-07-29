#! /usr/bin/env node
const yargs = require("yargs");
const CliC = require("./controllers/CliController.js");
const repoFetcher = require("./controllers/GetPopularRepos.js");

var argv = require("yargs/yargs")(process.argv.slice(2))
    .usage("Usage: starrepo [--clear|--c][--parse[=(ISO_Date)]] [[-name=(name|full_name)] | [-id=(Repo_ID)]]")
    .command({
        command:    '*',
        handler:    (argv) => {
            CliC.GetAll();
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
            CliC.GetByName(argv.repo_name);
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
            CliC.GetByID(argv.repo_id);
        }
    })
    .argv;