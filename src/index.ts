/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, async () => {
	console.log(`Listening on port ${PORT}`);


	// CÓDIGO PARA ATENDER OS REQUERIMENTOS
	// R01, R02, R03, R04, R05

	const { getClient } = require('./database/get-client.js')
	const readline = require('readline');
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	const question = (str: string) => new Promise((resolve) => rl.question(str, resolve));

	const totalAlunos = Number(await question('Qual a quantidade de alunos ?'))

	const alunos = []

	for (var i = 0;
		i < totalAlunos; i++) {

		const client = await getClient()
		const nomeAlunos = await question('Qual o nome do aluno ? ')
		const cursoAluno = await question('Qual o curso do aluno? ')

		let insertNome = await client.query('INSERT INTO nome_alunos(nome) VALUES($1)', [`${nomeAlunos}`])
		let insertCurso = await client.query('INSERT INTO curso_alunos(cursos) VALUES($1)', [`${cursoAluno}`])

		console.log(`Adicionado ${insertNome.rowCount} linha`)
		console.log(`Adicionado ${insertCurso.rowCount} linha`)

		await client.end()
		
		alunos[i] = [nomeAlunos, cursoAluno]
		
	}
	const client = await getClient()

	const listAlunos = await client.query(`SELECT id, nome	FROM public.nome_alunos;`)
	const listaCursos = await client.query(`SELECT id, cursos	FROM public.curso_alunos;`)
	console.log('Alunos',listAlunos.rows)
	console.log('Cursos', listaCursos.rows)
	const oldNome = await question('Digite o nome do aluno que deseja atualizar: ')
	const newNome = await question('Digite o novo nome do aluno: ')
	let updateNome = await client.query(`UPDATE nome_alunos SET nome = '${newNome}' WHERE nome = '${oldNome}'`)
	console.log(`Inserted ${updateNome.rowCount} row`)
	await client.end()
});