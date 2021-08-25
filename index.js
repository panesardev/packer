#!/usr/bin/env node

const inquirer = require('inquirer');
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

async function main() {
	const options = ['Extract', 'Compress'];

	const { choice }= await inquirer.prompt([
		{	
			type: 'list',
			name: 'choice',
			message: 'What do you want to do?',
			choices: options,
		}
	]);

	const dirContents = fs.readdirSync('.');

	const { filename } = await inquirer.prompt([
		{	
			type: 'list',
			name: 'filename',
			message: `Select a file to ${choice}`,
			choices: dirContents,
		}
	]);

	switch (choice) {
		case 'Extract': extract(filename); break;
		case 'Compress': compress(filename); break;
	}
}

function extract(filename) {
	const { name } = path.parse(filename);
	const outFilename = `${name}_extracted`;
	
	const zip = new AdmZip(`./${filename}`);
	zip.extractAllTo(`./${outFilename}`, true);

	console.log('Extraction completed');
}

function compress(filename) {
	const { name } = path.parse(filename);
	const outFilename = `${name}.zip`;
	
	const zip = new AdmZip();
	zip.addLocalFolder(`./${filename}`);
	zip.writeZip(`./${outFilename}`);
	
	console.log('Compression completed');
}

main();