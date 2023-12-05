CREATE DATABASE _Server;
USE _Server;

CREATE TABLE Level(
    Level INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(20)
)ENGINE=InnoDB;

CREATE TABLE data_user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(80) NOT NULL,
    Number VARCHAR(11) UNIQUE NOT NULL,
    TimeInit  timestamp NOT NULL DEFAULT current_timestamp
)ENGINE=InnoDB;

CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_data INT UNIQUE,
    user VARCHAR(50) NOT NULL UNIQUE,
    Level INT,
    password varchar(200),
    Img VARCHAR(25),
    CONSTRAINT FK_data_user FOREIGN KEY (id_data)
    REFERENCES data_user(id),
        CONSTRAINT FK_Level  FOREIGN KEY (Level)
    REFERENCES Level(Level)
)ENGINE=InnoDB; 

CREATE TABLE List(
  id INT(30) PRIMARY KEY AUTO_INCREMENT,
  Titulo VARCHAR(50) UNIQUE,
  id_user INT,
  Caja BOOLEAN DEFAULT false,
  Privado BOOLEAN DEFAULT false,
  Tables BOOLEAN DEFAULT false,
  Imag BOOLEAN DEFAULT false,
  Date_Creat timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT FK_id_userL FOREIGN KEY(id_user) REFERENCES user(id)
)ENGINE=InnoDB;

CREATE TABLE Invetary(
  id INT(30) PRIMARY KEY AUTO_INCREMENT,
  id_List INT(30),
  id_user INT,
  Titulo VARCHAR(50),
  Descripcion TEXT,
  Precio DECIMAL (20,2),
  Cantidad DECIMAL(20,2) ,
  Garantia INT(19),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT FK_id_userI FOREIGN KEY(id_user) REFERENCES user(id),
  CONSTRAINT FK_ListI FOREIGN KEY(id_List) REFERENCES List(id)
)ENGINE=InnoDB;

CREATE TABLE Img(
  id INT(30) PRIMARY KEY AUTO_INCREMENT,
  id_List INT(30),
  id_Invent INT(30),
  img VARCHAR(80),
  CONSTRAINT id_Inventl FOREIGN KEY(id_List) REFERENCES List(id),
  CONSTRAINT id_InventI FOREIGN KEY(id_Invent) REFERENCES Invetary(id)
)ENGINE=InnoDB;


DELIMITER //

CREATE TRIGGER V BEFORE INSERT ON data_user
  FOR EACH ROW BEGIN
    
    IF EXISTS (SELECT * FROM user AS u INNER JOIN data_user AS d ON u.id_data = d.id WHERE d.Number = NEW.Number) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El valor a insertar ya existe en la base de datos';
    END IF;

    IF EXISTS (SELECT * FROM data_user WHERE Number = NEW.Number) THEN 
         SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = '1';
    END IF;

END ;

//
DELIMITER ;



DELIMITER //

CREATE TRIGGER V BEFORE INSERT ON data_user
  FOR EACH ROW
  BEGIN
  IF EXISTS (SELECT * FROM user AS u INNER JOIN data_user AS d ON u.id_data = d.id WHERE d.Number = NEW.Number) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El valor a insertar ya existe en la base de datos';
    ELSE
     DELETE FROM data_user WHERE Number = NEW.Number;
  END IF;
END ;

//
DELIMITER ;











INSERT INTO user(id_data,user) VALUES(39,'n'); 
INSERT INTO data_user(Name,Email,Number) VALUES("sss",'sss',"64522111"); 

SELECT * FROM user AS u INNER JOIN data_user AS d ON u.id_data = d.id WHERE d.Number = "8898989990";