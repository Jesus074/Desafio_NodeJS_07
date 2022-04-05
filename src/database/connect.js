const { Client } = require('pg') 
require('dotenv').config()

(async () => {
    const client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        ssl: false,
    })
    awaitclient.connect()
    const res = await client.query('SELECT $1: :text as connected', ['Conection to postgres successful!'])
    console.log(res.rows[0].connected)
    await client.end()
})