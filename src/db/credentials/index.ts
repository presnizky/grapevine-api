import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export function getBaseConfig() {
    let user = '';
    let pass = '';
    let host = '';
    let dbName = '';
    let port = 0;

    const {
        DB_USER,
        DB_PASSWORD,
        DB_HOST,
        DB_DATABASE,
        DB_HOST_PORT,
      } = process.env;

    user = DB_USER || '';
    pass = DB_PASSWORD || '';
    host = DB_HOST || '';
    dbName = DB_DATABASE || '';
    port = parseInt(DB_HOST_PORT!) || 0;

    return {
        user,
        pass,
        host,
        dbName,
        port,
    }
}