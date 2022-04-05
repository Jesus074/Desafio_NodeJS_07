const { getClient } = require('./get-client')

(async () => {
    const client = await getClient()

    const name = process.argv[2] ?? 'Alef'
    const entries = await client.query('SELECT * FROM nome_alunos WHERE nome = $1', [name])
    console.log(`Database entries for ${name}: ${entries.rowCOunt} row(s)`)
    console.log(Object.keys(entries.rows?.[0]).join('\t'))
    console.log(`${entries.rows.map((r) => Object.values(r).join('\t')).join('\n')}`)
    await client.end()
})()