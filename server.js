const path = require('path');
const fs = require('fs');
const express = require('express');
const Database = require('./Database.js');
const { addPolitician } = require('./Database.js');

function logRequest(req, res, next){
	console.log(`${new Date()}  ${req.ip} : ${req.method} ${req.path}`);
	next();
}

const host = 'localhost';
const port = 3000;
const clientApp = path.join(__dirname, 'client');

// express app
let app = express();

app.use(express.json()) 						// to parse application/json
app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded
app.use(logRequest);							// logging for debug

// route the pages to each respective folder
app.use('/', express.static(clientApp + `/search`, { extensions: ['html'] }));
app.use('/addPol', express.static(clientApp +'/addPol', { extensions: ['html'] }));
app.use('/pol/:politicianID', express.static(clientApp+'/pol', { extensions: ['html'] }));

app.listen(port, () => {
	console.log(`${new Date()}  App Started. Listening on ${host}:${port}, serving ${clientApp}`);
});

/*
Add poltician page endpoints
*/
app.post('/addPol/submit-form',async (req, res) =>{
		try{
			var formData = req.body;
			//try to add a Party first since there is constraint on poltician where party must exist
			try{
				await Database.addParty(formData['party'], formData['foundedYear'], formData['politicalLeaningScore']);
			}catch(err){
				console.log(err);
			}
			//add politician
			await Database.addPolitician(formData['pid'], formData['party'], formData['fname'], formData['lname']);
		}catch(err){
			console.log(err);
		}finally{
			let politicians = await Database.getPoliticians();
			console.log(politicians);
			res.redirect('/addPol');
		}
	});

/*
Politician page Endpoints
*/

app.get('/pol/:polID/info', async (req, res)=>{
	let polID = req.params['polID'];
	Database.getPoliticians(polID).then((result)=>{
		res.json(result.rows[0]);
	})
	.catch((err) =>{throw new Error(`Can't get politician with polID:` + polID + `. ${err}`)});
});