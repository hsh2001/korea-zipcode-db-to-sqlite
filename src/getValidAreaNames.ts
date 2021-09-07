import { promises as fs } from 'fs';
import { join as joinPath } from 'path';

const cwd = process.cwd();

async function getValidAreaNames(): Promise<string[]> {
  const directoryPath = joinPath(cwd, 'data');
  const fileNames = await fs.readdir(directoryPath);
  return fileNames
    .filter(
      (fileName) =>
        !['.', '..'].includes(fileName) && fileName.indexOf('.') != 0
    )
    .map((fileName) => fileName.replace('.txt', ''));
}

export default getValidAreaNames;
