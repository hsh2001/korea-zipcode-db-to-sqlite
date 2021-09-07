import { promises as fs } from 'fs';
import { join as joinPath } from 'path';

const cwd = process.cwd();

function readDataTxtFile(name: string): Promise<string> {
  const filePath = joinPath(cwd, `data/${name}.txt`);
  return fs.readFile(filePath, 'utf-8');
}

export default readDataTxtFile;
