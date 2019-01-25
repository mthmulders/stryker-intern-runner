import { Config } from 'stryker-api/config';
import { RunStatus, TestStatus } from 'stryker-api/test_runner';

import InternTestRunner from '../../src/InternTestRunner';

import * as sinon from 'sinon';
import { expect } from 'chai';
import * as path from 'path';

// Get the actual project root, since we will stub process.cwd later on
const projectRoot = process.cwd();

describe('Integration test for Strykers Intern runner', () => {
    const processCwdStub = sinon.stub(process, 'cwd');

    it('should run tests on the example project', async () => {
        // Arrange
        processCwdStub.returns(getProjectRoot('exampleProject'));
        const testRunner = new InternTestRunner({
            fileNames: [ 'tests/unit/AddSpec.js' ],
            port: 65535,
            strykerOptions: new Config()
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
            strykerOptions: new Config()
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
});

const getProjectRoot = (name: string) => path.join(projectRoot, 'testResources', name);