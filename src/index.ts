// import { ConfigEditorFactory } from 'stryker-api/config';
import { TestRunnerFactory } from 'stryker-api/test_runner';

// import InternConfigEditor from './InternConfigEditor';
import InternTestRunner from './InternTestRunner';

// ConfigEditorFactory.instance().register('intern', InternConfigEditor);
TestRunnerFactory.instance().register('intern', InternTestRunner);