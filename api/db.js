import pg from "pg";

export const db = new pg.Client({
    user: 'postgres.kweqobbisunsbgnynydf',
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    database: 'postgres',
    password: 'P8gNFKZ82J#a3AN',
    port: '6543',
});