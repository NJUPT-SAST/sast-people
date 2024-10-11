import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@/db/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 20, // 设置连接池的最大连接数
  idleTimeoutMillis: 30000, // 连接空闲30秒后释放
  connectionTimeoutMillis: 10000, // 连接等待2秒后超时
});

export const db = drizzle(pool, { schema });
