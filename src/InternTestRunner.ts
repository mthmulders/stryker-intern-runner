import { getLogger } from 'stryker-api/logging';
import { RunnerOptions, RunResult, TestRunner, RunOptions, RunStatus, TestResult, TestStatus } from 'stryker-api/test_runner';

import { global } from '@theintern/common';
import Test from 'intern/lib/Test';
import Node from 'intern/lib/executors/Node';

class InternTestRunner implements TestRunner {
    private readonly testFailedMessage = /One or more tests failed/;
    private readonly log = getLogger(InternTestRunner.name);
    private readonly results: TestResult[] = [];
    
    private cancelled = false;
    private intern: Node;

    public constructor(options: RunnerOptions, processEnvRef?: NodeJS.ProcessEnv) {
        this.intern = (global.intern = new Node());
        this.intern.configure({
            suites: options.fileNames,
            reporters: 'runner'
        });
        this.intern.on('testStart', test => {
            this.log.debug(`${test.id} has started`);
        });
        this.intern.on('testEnd', test => {
            this.log.debug(`${test.id} has ended`);
            this.results.push(this.createTestResult(test));
        });
    }

    public async run(options: RunOptions): Promise<RunResult> {
        const promise = this.intern.run();
        setTimeout(() => {
            this.cancelled = true;
            promise.cancel();
        }, options.timeout);
        return promise.then(
            () => this.createRunResult(),
            (reason) => this.createRunResult(reason));
    }

    private createTestResult(test: Test): TestResult {
        const name = test.name;
        const status = test.skipped ? TestStatus.Skipped : (test.error ? TestStatus.Failed : TestStatus.Success);
        const timeSpentMs = test.timeElapsed || -1;
        const failureMessages = test.error ? [ test.error.message ] : undefined;

        return { failureMessages, name, status, timeSpentMs };
    }

    private createRunResult(reason?: Error): RunResult {
        const errorMessages = this.collectErrorMessages();
        const status = this.determineRunStatus(reason);
        const tests = this.results;
        this.cleanIntern();
        
        return { errorMessages, status, tests };
    }

    private cleanIntern(): void {
        // https://gitter.im/theintern/intern?at=5c4cae7393fe7d5ac0f4fde5
        global.intern = null;
        const defaultLoaderPath = require.resolve('intern/loaders/default.js');
        delete require.cache[defaultLoaderPath];
    }

    private determineRunStatus(reason?: Error): RunStatus {
        if (this.cancelled) {
            return RunStatus.Timeout;
        } else if (!reason) {
            return RunStatus.Complete;
        } else if (reason.message.match(this.testFailedMessage)) {
            return RunStatus.Complete;
        } else {
            return RunStatus.Error;
        }
    }

    private collectErrorMessages(): string[] {
        const result: string[] = [];
        this.results
            .map(result => result.failureMessages)
            .forEach(messages => (messages || []).forEach(message => result.push(message)));
        return result;
    }
}

export default InternTestRunner;
