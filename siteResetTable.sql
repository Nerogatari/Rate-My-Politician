drop table Politician;
drop table Party;

create table Party(
  PartyName CHAR(50),
  FoundedYear INTEGER,
  PoliticalLeaningScore INTEGER NOT NULL,
  PRIMARY KEY (PartyName)
);
GRANT SELECT ON Party TO PUBLIC;
INSERT INTO Party VALUES ('United Conservative Party', '2017', '4');
INSERT INTO Party VALUES ('New Democratic', '1961', '1');
INSERT INTO Party VALUES ('Saskatchewan Party', '2007', '3');
INSERT INTO Party VALUES ('Progressive Conservative', '1942', '3');
INSERT INTO Party VALUES ('Liberal', '1867', '1');

create table Politician(
  PoliticianID INTEGER,
  PartyName CHAR(50) NOT NULL,
  FirstName CHAR(50) NOT NULL,
  LastName  CHAR(50) NOT NULL,
  Rating  INTEGER,
  PRIMARY KEY(PoliticianID),
  FOREIGN KEY(PartyName) REFERENCES Party
);
GRANT SELECT ON Politician TO PUBLIC;
INSERT INTO Politician VALUES ('6', 'United Conservative Party', 'Jason', 'Kenny', '7');
INSERT INTO Politician VALUES ('7', 'New Democratic', 'John', 'Horgan', '6');
INSERT INTO Politician VALUES ('8', 'Saskatchewan Party', 'Scott', 'Moe', '4');
INSERT INTO Politician VALUES ('9', 'Progressive Conservative', 'Doug', 'Ford', '6');
INSERT INTO Politician VALUES ('10', 'Liberal', 'Iain', 'Rankin', '9');
