import 'module-alias/register';
import * as path from 'path';
import * as dotenv from 'dotenv';
const envPath: string = path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: envPath });

import { ServerApp } from '@app/ServerApp';

async function runApp() {
  const serverApp: ServerApp = ServerApp.new();
  await serverApp.run();
}

runApp();
