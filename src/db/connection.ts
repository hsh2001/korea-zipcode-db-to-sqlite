import { join as joinPath } from 'path';

import { createConnection } from 'typeorm';

import Area from './entities/Area';

const connection = createConnection({
  type: 'sqlite',
  database: joinPath(process.cwd(), '/result.sqlite'),
  synchronize: true,
  entities: [Area],
});

export default connection;
