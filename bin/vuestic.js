#!/usr/bin/env node

var vuesticMaster = require('download-git-repo')
var commander = require('commander')
var ora = require('ora')
var chalk = require('chalk')
var path = require('path')
var figlet = require('figlet')

console.log(chalk.blue(figlet.textSync("VueStic")))

commander
    .version(require('./../package').version)
    .usage('<project-name>')
    .option('-c, --clone', 'use git clone')
    .parse(process.argv)

commander.on('--help', function() {
    console.log()
    console.log('  Example:')
    console.log()
    console.log(chalk.gray('    # create a new project with vuestic-installer'))
    console.log('    $ vuestic <project-name>')
    console.log()
})

function help() {
    commander.parse(process.argv)
    if (commander.args.length < 1) return commander.help()
}

help()

/**
 * Settings.
 */

var name = commander.args[0]
var to = path.resolve(name)
var clone = commander.clone || false

/**
 * Install vuestic.
 */
function run() {
    var spinner = ora('downloading project')
    spinner.start()
    vuesticMaster("epicmaxco/vuestic-admin", to, { clone: clone }, function(err) {
        spinner.stop()
        if (!err) { console.log(chalk.green(name + " has been successfully created.")) } else {
            console.log(chalk.red('Failed to download repo : ' + err.message.trim()))
        }
    })
}

/**
 * Trigger the installer.
 */
run()