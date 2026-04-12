import pg from 'pg';
import { getPoolConfig } from './poolConfig.js';

const { Pool } = pg;

export const pool = new Pool(getPoolConfig());
