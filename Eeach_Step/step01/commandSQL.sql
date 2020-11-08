CREATE DATABASE job_board;
USE job_board;  
    CREATE TABLE people (
        idPeople INT PRIMARY KEY AUTO_INCREMENT,
        lastName varchar(30),
        firstName varchar(75),
        statut varchar(20),
        mail varchar(75) UNIQUE,
        mdp varchar(20)
    );
    CREATE TABLE companies (
        idComp INT PRIMARY KEY AUTO_INCREMENT,
        idPeople INT,
        FOREIGN KEY (idPeople) REFERENCES people(idPeople),
        nom varchar(30),
        adresse varchar(75),
        mail varchar(50) UNIQUE
    );
    CREATE TABLE advertissements (
        idAd INT PRIMARY KEY AUTO_INCREMENT,
        idPeople INT,
        FOREIGN KEY (idPeople) REFERENCES people(idPeople),
        idComp INT,
        FOREIGN KEY (idComp) REFERENCES companies(idComp),
        titre varchar(30),
        contenu TINYTEXT
    );
    CREATE TABLE candidature (
        idCand INT PRIMARY KEY AUTO_INCREMENT,
        idPeople INT,
        FOREIGN KEY (idPeople) REFERENCES people(idPeople),
        idAd INT,
        FOREIGN KEY (idAd) REFERENCES advertissements(idAd),
        message TEXT
    );

    insert into people (lastName, firstName, statut, mail, mdp)  
    Values 
        ('Jeremy', 'Nayet', 'admin', 'jeremy@mail.fr', 'epitech'),
        ('Josselin', 'Gerstmayer', 'admin', 'josselin@mail.fr', 'epitech');
    insert into companies (idPeople, nom, adresse, mail)
    Values     
    (1, 'Comp1', '3 place paul bec', 'comp1@mail.fr'),  
    (2, 'Comp2', '3 place paul bec', 'comp2@mail.fr');
    insert into advertissements (idPeople, idComp, titre, contenu) 
    values  (1, 1, 'Annonce 1', 'poste de dev web a pourvoir contrat 35h'), 
    (2, 2, 'Annonce 2', 'poste de dev logiciel a pourvoir contrat CDI 39h. Connaissances en C exige');

-- procedure Add Ad
CREATE PROCEDURE `AddEdit_Ad` (
_idAd INT,
IN _idPeople INT,
IN _idComp INT,
IN _titre varchar(30),
IN _contenu TINYTEXT
)
BEGIN
	if _idAd = 0 then
		insert into advertissements(idPeople,idComp,titre,contenu)
        values (_idPeople,_idComp,_titre,_contenu);
        
        set _idAd = last_insert_id();
	else
		update advertissements
        set
        idPeople = _idPeople,
        idComp = _idComp,
        titre = _titre,
        contenu = _contenu
        where idAd = _idAd;
	end if;
    
    select _idAd as 'idAd';
END

-- procedure add people
CREATE PROCEDURE `AddEdit_People` (
IN _idPeople INT,
IN _lastName varchar(30),
IN _firstName varchar(75),
IN _statut varchar(20),
IN _mail varchar(75),
IN _mdp varchar(20)
)
BEGIN
	if _idPeople = 0 then
		insert into people(lastName,firstName,statut,mail,mdp)
        values (_lastName,_firstName,_statut,_mail,_mdp);
        
        set _idPeople = last_insert_id();
	else
		update people
        set
        lastName = _lastName,
        firstName = _firstName,
        statut = _statut,
        mail = _mail,
        mdp = _mdp
        where idPeople = _idPeople;
	end if;
    
    select _idPeople as 'idPeople';
END
