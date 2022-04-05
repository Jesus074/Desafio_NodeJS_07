const { getClient } = require('./get-client');

(async () => {
  const client = await getClient();
  let createTableQuery = `
    CREATE TABLE IF NOT EXISTS curso_alunos(
      id BIGSERIAL PRIMARY KEY NOT NULL ,
      cursos varchar
    );
  `;
  const res = await client.query(createTableQuery);
  console.log(`Created table.`, res);
  await client.end();
})();