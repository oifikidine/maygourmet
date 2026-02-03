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

I