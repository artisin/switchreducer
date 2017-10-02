const _          = require('lodash');
const fs         = require('fs-extra');
const should     = require('should');
const diff       = require('diff');
const path       = require('path');
const del        = require('del');
const colur      = require('colur');
const hash       = require('hash-files');
const glob       = require('glob-all');
const dircompare = require('dir-compare');
require('colors');


const testAnswers   = require('./test.answers.js');
const testRootPath  = path.join(process.cwd(), '__scripts__/__tests__');
const testBuildPath = path.join(testRootPath, '/test-build/');


/**
 * Removes old /test-build files
 */
const removeOldTests = function() {
  if (fs.existsSync(testBuildPath)) {
    del.sync(testBuildPath);
  }
};


/**
 * Reads file
 * @param  {str} file -> file location
 * @return {str}      -> file contents
 */
const readFile = function(file) {
  return fs.readFileSync(file).toString();
};


/**
 * Displays diff in files
 * @param  {str} path1 -> test case
 * @param  {str} path2 -> test build
 */
const folderDiff = function(path1, path2) {
  const options = {compareSize: true};
  const res = dircompare.compareSync(path1, path2, options);
  colur(`
    Equal:        ===> ${res.equal}
    Distinct:     ===> ${res.distinct}
    Left:         ===> ${res.left}
    Right:        ===> ${res.right}
    Differences:  ===> ${res.differences}
    Same:         ===> ${res.same}
  `, {error: true, stringCaps: false});
  //display indv diff
  res.diffSet.forEach(function (entry) {
    if (entry.state !== 'equal') {
      const file1 = readFile(entry.path1 + entry.name1);
      const file2 = readFile(entry.path2 + entry.name2);
      const diffComp = diff.diffTrimmedLines(file1, file2);
      diffComp.forEach(function(part) {
        // green for additions, red for deletions grey for common parts
        const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
      });
    }
  });
};


/**
 * Gets check sum hash based on files
 * @param  {str} dir -> dir glob
 * @return {str}     -> checksum
 */
const getCheckSum = function(dir) {
  const files = glob.sync([`${dir}/**/**`], {dot: true});
  return hash.sync({files: files});
};



/**
 * Init test
 * @param  {fnc} buildScript -> __scripts__/setup/build-script.js
 */
let failed = false;
const testInit = function(buildScript) {
  colur('__scripts__/__tests__/test.run.js::: -> START');
  /**
   * Builds script/assets and returns a checksum hash for comparision
   * @param  {str} dir     -> dir to build to
   * @param  {obj} answers -> cli answers
   * @return {str}         -> checksum hash
   */
  const buildAndChecksum = function(dir, answers){
    buildScript(dir, answers);
    const checksumHash = getCheckSum(dir);
    return checksumHash;
  };

  _.forEach(testAnswers, function(answers) {
    describe(answers.test, function () {
      this.timeout(20000);

      const test = function() {
        const buildNameFile = answers.test.replace(/\s/g, '_').toLowerCase();
        const testCompBuildPath = path.join(testRootPath, '/builds/', `${buildNameFile}/`);

        //test-hash dir where test hash checksums are stored
        const hashDir = path.join(testRootPath, 'test-hash');
        const hashFileComp = path.join(hashDir, `${buildNameFile}.json`);
        fs.ensureDirSync(hashDir);

        //if no test comparision exists create one
        if (!fs.existsSync(testCompBuildPath)) {
          //test build saved and used for comparision, commited
          const testBuildHash = buildAndChecksum(testCompBuildPath, answers);
          //write out test results
          fs.writeFileSync(hashFileComp, JSON.stringify({checksum: testBuildHash}), 'utf8');
        }
        //test build
        answers.modRoot = testCompBuildPath;
        buildScript(testBuildPath, answers);
        const testBuildHash = getCheckSum(testBuildPath);

        //compare hash and display diff
        const tetsCompHash = JSON.parse(readFile(hashFileComp)).checksum;
        if (tetsCompHash !== testBuildHash) {
          failed = true;
          folderDiff(testCompBuildPath, testBuildPath);
        }
        should(tetsCompHash).be.exactly(testBuildHash);
      };


      beforeEach(function () {
        colur('__scripts__/__tests__/test.run.js:::beforeEach -> deleting file');
        removeOldTests();
      });
      it('checksum build files shouold equal hash', function() {
        test();
      });
    });
  });

  //end
  after(function() {
    if (!failed) {
      removeOldTests();
    }
  });
  colur('__scripts__/__tests__/test.run.js::: -> END', {end: true});
};

module.exports = testInit;
