import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SassyTest from 'sassy-test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sassyTest = new SassyTest();

describe('Configuration variables', function() {
  before(function(done) {
    sassyTest.configurePaths({
      fixtures: path.join(__dirname, 'fixtures'),
      loadPaths: [path.join(__dirname, '../sass')]
    });
    done();
  });

  describe('default values', function() {
    it('should limit output to the same output as normalize.css', function() {
      return sassyTest.compileFixture('variables/default');
    });
  });

  describe('$normalize-vertical-rhythm: false', function() {
    it('should not output vertical rhythm rulesets', function() {
      return sassyTest.compileFixture('variables/prevent-vertical-rhythm');
    });
  });

  describe('$base-* and $h*-font-size', function() {
    it('should alter the font, font size, and line-height', function() {
      return sassyTest.compileFixture('variables/font');
    });
  });

  describe('$indent-amount', function() {
    it('should alter the indent amount of elements', function() {
      return sassyTest.compileFixture('variables/indent-amount');
    });
  });

  describe('$indent-amount and $normalize-vertical-rhythm', function() {
    it('should alter the indent amount of elements', function() {
      return sassyTest.compileFixture('variables/indent-amount-and-vertical-rhythm');
    });
  });
});
