#!/usr/bin/env node
const path   = require('path');
const shell  = require('shelljs');
const _      = require('lodash');
const colur  = require('colur');
const glob   = require('glob-all');

//cycle and build test
const dirs = glob.sync([path.join(process.cwd(), '__scripts__/__tests__', '/builds/*')]);
// console.log(dirs)
_.forEach(dirs, function (dir) {
  const tmpl = `:::SCRIPT:install -> Dir: ${dir} -> Command: npm run build:test`;
  //signal start
  colur(`START${tmpl}`);
  //cd in, and run
  shell.cd(dir);
  shell.exec('npm run test:build', function(code, stdout, stderr) {
    console.log(stdout)
    if (code) {
      colur(`ERROR${tmpl}`, {error: true});
      console.error(stderr);
      colur(`ERROR${tmpl}`, {error: true});
    }else {
      colur(`END${tmpl}`, {end: true});
    }
  });
  //cd out for next build
  shell.cd('..');
});
