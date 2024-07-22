#!/usr/bin/env node

const {Command}=require("commander")
const pkg=require("./package.json")
const inquirer=require('inquirer')
const {createProject}=require("./index")

const program=new Command();

program
  .version(pkg.version)
  .alias('v')
  .description('An mern project initiator')

program
  .command('init')
  .description('Init')
  .action(()=>createProject());

program.parse(process.argv)