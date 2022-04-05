const { Client } = require('pg') 
require('dotenv').config()

async function getClient() {
    const client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.Pg_PASSWORD,
        database: process.env.PG_DATABASE,
        ssl: false,
    })
    await client.connect()
    return client
}

module.exports = { getClient }