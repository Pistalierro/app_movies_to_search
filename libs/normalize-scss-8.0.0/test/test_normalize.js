import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SassyTest from 'sassy-test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sassyTest = new SassyTest();

describe('@include normalize()', function() {
  before(function(done) {
    sassyTest.configurePaths({
      fixtures: path.join(__dirname, 'fixtures/normalize'),
      loadPaths: [path.join(__dirname, '../sass')]
    });
    done();
  });

  describe('$include parameter', function() {
    it('should accept a list with multiple values', function() {
      return sassyTest.compileFixture('include-multiple');
    });

    it('should accept a list with a single value', function() {
      return sassyTest.compileFixture('include-single');
    });

    it('should accept a string', function() {
      return sassyTest.compileFixture('include-string');
    });
  });

  describe('$exclude parameter', function() {
    it('should accept a list with multiple values', function() {
      return sassyTest.compileFixture('exclude-multiple');
    });

    it('should accept a list with a single value', function() {
      return sassyTest.compileFixture('exclude-single');
    });

    it('should accept a string', function() {
      return sassyTest.compileFixture('exclude-string');
    });
  });
});
