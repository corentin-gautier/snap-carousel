// Print the minified and gzipped size of every built file
import { readdirSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import { gzipSync } from 'zlib';

const dist = new URL('../dist', import.meta.url).pathname;

const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? files(join(dir, entry.name)) : entry.name.endsWith('.js') ? [join(dir, entry.name)] : []
);

const kb = bytes => (bytes / 1024).toFixed(2).padStart(6) + ' kB';

for (const file of files(dist)) {
  const code = readFileSync(file);
  console.log(`${relative(dist, file).padEnd(40)} ${kb(code.length)}  gzip ${kb(gzipSync(code, { level: 9 }).length)}`);
}
