import * as fs from 'fs';
import * as path from 'path';

describe('r3d-fixture R3D_LIMIT guard', () => {
  it('asserts each R3D_LIMIT in non-spec .ts files is <= 2', () => {
    const files = fs
      .readdirSync(__dirname)
      .filter((name) => name.endsWith('.ts') && !name.endsWith('.spec.ts'));

    for (const name of files) {
      const content = fs.readFileSync(path.join(__dirname, name), 'utf8');
      const re = /R3D_LIMIT\s*=\s*(\d+)/g;
      let match: RegExpExecArray | null;
      while ((match = re.exec(content)) !== null) {
        expect(Number(match[1])).toBeLessThanOrEqual(2);
      }
    }
  });
});
