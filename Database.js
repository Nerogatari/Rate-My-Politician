const oracledb = require('oracledb');
oracledb.autoCommit = true;
const dbConfig = {
  user: 'ora_majohnny',
  password: 'a31699168',
  connectString: 'localhost:1522/stu',
}

async function getPoliticians() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('connected');
    const result = await connection.execute(`SELECT * FROM Politician`);
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
Add politician, rating is set to 0 by default
*/
async function addPolitician(politicianid,party, fname, lname) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('connected');
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

module.exports = {
  getPoliticians: getPoliticians,
  addPolitician: addPolitician
}