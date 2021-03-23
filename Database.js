/*
Database library, used for function calls to db
*/

const oracledb = require('oracledb');
oracledb.autoCommit = true;
const dbConfig = {
  user: 'ora_majohnny',
  password: 'a31699168',
  connectString: 'localhost:1522/stu',
}
/*
If politicianID not specified, return all politicians
*/
async function getPoliticians(politicianID) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    let result;
    if(politicianID == undefined){
      result = await connection.execute(`SELECT * FROM Politician`);
    }
    else{
      result = await connection.execute(`SELECT * FROM Politician WHERE PoliticianID = :politicianID`, [politicianID]);
    }
    //console.log(result);
    return result;
  } catch (err) {
    throw (err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        throw (err);
      }
    }
  }
}
/*
Add politician, rating is set to 0 by default
*/
async function addPolitician(politicianid,party, fname, lname) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`INSERT INTO Politician VALUES (:id, :party, :fname, :lname, :rating)`,
      [politicianid, party,fname, lname, '0']
    );
    console.log(result);
    return result;
  } catch (err) {
    throw (err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        throw (err);
      }
    }
  }
}

/*
Add a Party
*/
async function addParty(partyName, foundedYear, politicalLeaningScore){
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`INSERT INTO Party VALUES ( :partyName, :foundedYear, :politicalLeaningScore)`,
      [partyName, foundedYear, politicalLeaningScore]
    );
    console.log(result);
    return result;
  } catch (err) {
    throw (err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        throw (err);
      }
    }
  }
}

/*
Make sure to export all functions you want visible to other files
*/
module.exports = {
  getPoliticians: getPoliticians,
  addPolitician: addPolitician,
  addParty: addParty
}