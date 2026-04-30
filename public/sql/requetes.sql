-- Créer la base de données
CREATE DATABASE maygourmet;


-- Créer la table equipe 
CREATE TABLE equipe(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100), -- ce champ est facultatif
    telephone VARCHAR(100) NOT NULL,
    poste VARCHAR(80) NOT NULL,
    presentation VARCHAR(255),
    date_recrutement Date
);

-- Ajouter un menbre dans l'équipe
INSERT INTO equipe(nom, prenom, mail, telephone, poste, presentation, date_recrutement) VALUES 
("SAID","FATIMA","fatima@gmail.com","0639897452", "Patron", "Passioner de cuisine traditionnelle", '2024-06-15' ),

("Soulaimana", "Amina", "amina.soulaimana@restaurant.com", "0639456789", "Chef cuisinière",
"Cheffe expérimentée, spécialiste de la cuisine mahoraise et des plats traditionnels.",
"2019-06-15"),

("Madi", "Youssouf", "youssouf.madi@restaurant.com", "0639567891", "Second de cuisine",
"Assiste la cheffe et veille à la qualité et à la régularité des plats.",
"2021-01-10"),

("Bacar", "Halima", "halima.bacar@restaurant.com", "0639678912", "Serveuse",
"Accueille les clients avec le sourire et assure un service rapide et chaleureux.",
"2022-09-05"),

("Ahmed", "Nassur", "nassur.ahmed@restaurant.com", "0639789123", "Responsable de salle",
"Supervise l’équipe de salle et garantit une excellente expérience client.",
"2020-11-20"),

("Moussa", "Fatima", "fatima.moussa@restaurant.com", "0639891234", "Aide de cuisine",
"Apporte un soutien essentiel en cuisine et participe à la préparation des plats.",
"2023-04-12");

/* =========================================================
   Montrer les bases de donnéés disponible
   ========================================================= */
SHOW DATABASES;

-- Utilisation de la  BASE DE DONNÉES : maygourmet
USE maygourmet;


/* =========================================================
   TABLE : fournisseur

   ========================================================= */

-- Un produit appartient à un fournisseur.Donc la clé étrangère doit être dans produits, pas dans fournisseur.


CREATE TABLE fournisseur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,
    quantite INT NOT NULL,
    prix INT NOT NULL,
    telephone VARCHAR(100) NOT NULL,
    origine VARCHAR(155) NOT NULL,
    types VARCHAR(100) NOT NULL,
    mail VARCHAR(255) NOT NULL
);





/* =========================================================
   INSERTION DES FOURNISSEURS
   ========================================================= */


INSERT INTO fournisseur (nom, quantite, prix, telephone, origine, types, mail) VALUES
('Peche Artisanale de Mamoudzou', 100, 1500, '0639264587', 'Mamoudzou, Mayotte', 'Poisson frais', 'contact@pechemamoudzou.yt'),
('Ferme Agricole de Combani', 250, 400, '0639261122', 'Combani, Mayotte', 'Legumes et fruits', 'fermecombani@gmail.com'),
('Epices Naturelles de Sada', 80, 200, '0639267788', 'Sada, Mayotte', 'Epices locales', 'epicessada@yahoo.fr'),
('Boucherie Halal Kaweni', 120, 3000, '0639263344', 'Kaweni, Mayotte', 'Viande locale', 'boucheriekaweni@gmail.com'),
('Cocoteraie de Bandrele', 300, 250, '0639269988', 'Bandrele, Mayotte', 'Produits derives de coco', 'cocobandrele@outlook.fr');









/* =========================================================
   TABLE : plat
   
   ========================================================= */

CREATE TABLE plat IF NOT EXISTS plat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    descriptions VARCHAR(255),
    prix INT NOT NULL, 
    categorie VARCHAR(100) NOT NULL,
    disponible BOOLEAN DEFAULT FALSE
);


/* =========================================================
   INSERTION DES PLATS
   ========================================================= */

INSERT INTO plat (nom, description, prix, categorie) VALUES
('Tacos poulet', 'Poulet, frites, fromage, sauce au choix', 8, 'Tacos'),
('Brochettes de bœuf', 'Brochettes marinées, accompagnement riz', 10, 'Brochettes'),
('Mataba poulet', 'Feuilles de manioc, poulet, coco', 9, 'Plat traditionnel'),
('Milk-shake vanille', 'Vanille, lait, glace', 5, 'Boisson');






/*
TABLE EQUIPE
*/

CREATE TABLE equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,
    poste VARCHAR(100) NOT NULL,
    telephone VARCHAR(100),
    email VARCHAR(255), 
    date_embauche DATE NOT NULL,
    salaire INT NOT NULL
);


/*
INSERTION DES EQUIPE
*/

INSERT INTO equipe (nom, poste, telephone, email, date_embauche, salaire) VALUES
('Ali Moussa', 'Responsable logistique', '0639001122', 'ali.moussa@gmail.com', '2022-05-10', 1800),
('Fatima Abdou', 'Gestionnaire de stock', '0639003344', 'fatima.abdou@gmail.com', '2021-03-15', 1600),
('Said Ahmed', 'Controle qualite', '0639005566', 'said.ahmed@gmail.com', '2020-11-01', 1700),
('Mariam Soilihi', 'Responsable commercial', '0639007788', 'mariam.soilihi@gmail.com', '2019-06-20', 2100),
('Youssouf Ali', 'Assistant administratif', '0639009900', 'youssouf.ali@gmail.com', '2023-01-08', 1500),
('Amina Bakar', 'Comptable', '0639112233', 'amina.bakar@gmail.com', '2018-09-12', 2200),
('Rachid Mohamed', 'Magasinier', '0639223344', 'rachid.mohamed@gmail.com', '2022-02-18', 1400),
('Nassira Ali', 'Chargee clientele', '0639334455', 'nassira.ali@gmail.com', '2024-04-02', 1550),
('Ibrahim Madi', 'Livreur', '0639445566', 'ibrahim.madi@gmail.com', '2023-07-25', 1300),
('Halima Saindou', 'Assistante de direction', '0639556677', 'halima.saindou@gmail.com', '2020-10-30', 2000);






/* =========================================================
   EXEMPLES DE REQUÊTES 
   ========================================================= */



-- Mettre à jour un fournisseur
UPDATE fournisseur
SET nom = 'Vanille'
WHERE id = 5;

-- Supprimer un fournisseur
DELETE FROM fournisseur
WHERE id = 3;




-- Mettre à jour un plat
UPDATE plat
SET nom = 'Vanilla Banks'
WHERE id = 5;

-- Supprimer un plat
DELETE FROM plat
WHERE id = 4;


CREATE TABLE produits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    description VARCHAR(155),
    prix INT NOT NULL,
    categorie VARCHAR(155) NOT NULL,
    disponibilite BOOLEAN DEFAULT TRUE,
    origine VARCHAR(80) NOT NULL,
    type_culture VARCHAR(30),
    id_fournisseur INT NOT NULL,
    FOREIGN KEY (id_fournisseur) REFERENCES fournisseur(id)
);

-- INSERTION DES PRODUITS

INSERT INTO produits (nom, description, prix, categorie, disponibilite, origine, type_culture, id_fournisseur) VALUES
('Thon rouge du lagon', 'Thon frais peche localement', 18, 'Poisson', TRUE, 'Mayotte', 'Peche artisanale', 1),
('Dorade coryphene', 'Poisson frais du lagon', 20, 'Poisson', TRUE, 'Mayotte', 'Peche artisanale', 1),
('Tomates de Combani', 'Tomates cultivees localement', 4, 'Legume', TRUE, 'Mayotte', 'Culture locale', 2),
('Bananes jaunes', 'Bananes fraiches', 3, 'Fruit', TRUE, 'Mayotte', 'Culture traditionnelle', 2),
('Curcuma frais', 'Epice locale pour cuisine', 2, 'Epice', TRUE, 'Mayotte', 'Culture naturelle', 3),
('Piment pili pili', 'Piment fort', 1, 'Epice', TRUE, 'Mayotte', 'Culture artisanale', 3),
('Boeuf halal local', 'Viande bovine elevee a Mayotte', 22, 'Viande', TRUE, 'Mayotte', 'Elevage local', 4),
('Poulet fermier', 'Poulet eleve en plein air', 12, 'Viande', TRUE, 'Mayotte', 'Elevage traditionnel', 4),
('Lait de coco frais', 'Extrait de noix de coco', 5, 'Produit derive', TRUE, 'Mayotte', 'Agriculture locale', 5),
('Noix de coco entiere', 'Coco fraiche', 4, 'Fruit', TRUE, 'Mayotte', 'Culture locale', 5);



-- on veut seulement afficher tous les produits qui viennent du fournisseur numero 2
SELECT * FROM produit WHERE id_fournisseur= "2";


ALTER TABLE produits
-- On modifie la table 'produits'

ADD CONSTRAINT fk_produits_fournisseur
-- On ajoute une contrainte (rule) que l’on nomme 'fk_produits_fournisseur'
-- Le nom sert à identifier cette contrainte si on veut la supprimer ou la modifier plus tard

FOREIGN KEY (id_fournisseur) REFERENCES fournisseur(id);
-- On définit la contrainte comme une clé étrangère :
-- La colonne 'id_fournisseur' dans 'produits' doit correspondre à une valeur existante dans 'fournisseur.id'
-- un produit ne peut pas avoir un fournisseur inexistant


ALTER TABLE fournisseur
-- On modifie la table 'fournisseur'

ADD CONSTRAINT fk_fournisseur_produit
-- On ajoute une contrainte appelée 'fk_fournisseur_produit'

FOREIGN KEY (id_produit) REFERENCES produits(id);
-- On définit une clé étrangère :
-- La colonne 'id_produit' dans 'fournisseur' doit correspondre à une valeur existante dans 'produits.id'
-- Cela garantit que le fournisseur est lié à un produit existant


