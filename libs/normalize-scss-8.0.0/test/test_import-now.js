import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SassyTest from 'sassy-test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('@import "normalize/import-now";', function() {
  it('should import the CSS immediately on @import', function() {
    const sassyTest = new SassyTest({
      fixtures: path.join(__dirname, 'fixtures'),
      loadPaths: [path.join(__dirname, '../sass')]
    });
    return sassyTest.compileFixture('import-now');
  });
});
