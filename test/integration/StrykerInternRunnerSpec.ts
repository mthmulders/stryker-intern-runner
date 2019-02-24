import { RunStatus, TestStatus } from 'stryker-api/test_runner';

import InternTestRunner from '../../src/InternTestRunner';

import * as sinon from 'sinon';
import { expect } from 'chai';
import * as path from 'path';
import { LogLevel } from 'stryker-api/core';

// Get the actual project root, since we will stub process.cwd later on
const projectRoot = process.cwd();

describe('Integration test for Strykers Intern runner', () => {
    const processCwdStub = sinon.stub(process, 'cwd');
    const defaultStrykerOptions = {
        fileLogLevel: LogLevel.Debug
    };

    it('should run tests on the example project', async () => {
        // Arrange
        processCwdStub.returns(getProjectRoot('exampleProject'));
        const testRunner = new InternTestRunner({
            fileNames: [ 'tests/unit/AddSpec.js' ],
            port: 65535,
            strykerOptions: defaultStrykerOptions
        });

        // Act
        const result = await testRunner.run({ timeout: 2000 });

        // Assert
        expect(result.status).to.equal(RunStatus.Complete);
        expect(result.errorMessages).to.be.empty;
        expect(result.tests.length).to.eq(5);
    });

    it('should detect failed tests', async () => {
        // Arrange
        processCwdStub.returns(getProjectRoot('exampleProject'));
        const testRunner = new InternTestRunner({
            fileNames: [ 'tests/unit/AddFailedSpec.js' ],
            port: 65535,
            strykerOptions: defaultStrykerOptions
        });

        // Act
        const result = await testRunner.run({ timeout: 2000 });

        // Assert
        expect(result.status).to.equal(RunStatus.Complete);
        expect(result.errorMessages).not.to.be.empty;
        expect(result.tests.length).to.eq(2);
        expect(result.tests.map(r => r.status)).to.contain(TestStatus.Failed);
        expect(result.tests.map(r => r.status)).not.to.contain(TestStatus.Success);
    });

    it('should time out on long-running tests', async () => {
        // Arrange
        processCwdStub.returns(getProjectRoot('exampleProject'));
        const testRunner = new InternTestRunner({
            fileNames: [ 'tests/unit/LongRunningSpec.js' ],
            port: 65535,
            strykerOptions: defaultStrykerOptions
        });

        // Act
        const result = await testRunner.run({ timeout: 500 });

        // Assert
        expect(result.status).to.equal(RunStatus.Timeout);
        expect(result.errorMessages).to.be.empty;
        expect(result.tests.length).to.eq(0);
    });

    it('should detect a test that was skipped', async() => {
        // Arrange
        processCwdStub.returns(getProjectRoot('exampleProject'));
        const testRunner = new InternTestRunner({
            fileNames: [ 'tests/unit/AddSkippedSpec.js' ],
            port: 65535,
            strykerOptions: defaultStrykerOptions
        });

        // Act
        const result = await testRunner.run({ timeout: 500 });

        // Assert
        expect(result.status).to.equal(RunStatus.Complete);
        expect(result.errorMessages).to.be.empty;
        expect(result.tests.length).to.eq(1);
        expect(result.tests.map(r => r.status)).to.contain(TestStatus.Skipped);
        expect(result.tests.map(r => r.status)).not.to.contain(TestStatus.Success);
    });
});

const getProjectRoot = (name: string) => path.join(projectRoot, 'testResources', name);