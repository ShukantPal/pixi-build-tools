const fs = require('fs');
const path = require('path');
const { RushConfiguration } = require('@microsoft/rush-lib');

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

global.chai = chai;
global.sinon = sinon;
global.should = chai.should;
global.assert = chai.assert;
global.expect = chai.expect;
global.chai.use(sinonChai);

const config = RushConfiguration.loadFromDefaultLocation({ 
    startingFolder: process.cwd()
});

function main() {
    const testEntryFiles = config.projects
        .map(project => project.projectFolder)
        .map(projectFolder => path.join(projectFolder, 'test/index.js'))
        .filter(testFile => fs.existsSync(testFile));

    testEntryFiles.forEach((testFile) => {
        require(path.relative(__dirname, testFile));
    });
}

main();