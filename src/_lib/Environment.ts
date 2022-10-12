import dotenv from 'dotenv';
import { existsSync } from 'fs';

dotenv.config({
  path:  process.env.NODE_ENV === 'production' ? '.env'
  : existsSync(`.env.${process.env.NODE_ENV}.local`)
  ? `.env.${process.env.NODE_ENV}.local`
  : `.env.${process.env.NODE_ENV}`,
})
