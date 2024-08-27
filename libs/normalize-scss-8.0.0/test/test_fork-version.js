import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SassyTest from 'sassy-test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Fork version', function() {
  it('should compile properly', function() {
    const sassyTest = new SassyTest({
      loadPaths: [
        // Path to fork version.
        path.join(__dirname, '../fork-version')
      ]
    });
    return sassyTest.compileFixture('fork-version');
  });
});
