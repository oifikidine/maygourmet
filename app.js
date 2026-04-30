// On importe le framework Express
// Express permet de créer un serveur web facilement
const express = require('express');

// j'importe le pilote Mysql2 utilisé pour interroger la BDD MySQL
const mysql2 = require("mysql2");

//j'importe le pilote express-myConnection utilisé pour se connecter à la BDD
const myConnection = require('express-myconnection');

// On importe le module "path" de Node.js
// Il sert à gérer les chemins de fichiers (Windows, Mac, Linux)
const path = require('path')

// On crée l'application Express
// "app" représente notre application web
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// je configure les éléments attendus pour me connecter à la base de donnee
const optionsConnexionBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "rsma2026",
    database: "maygourmet",
    port: 3306,
};

/*Middleware pour se connecter à la BDD Mysql
"pool" est la stratégie de connexion à la base de données  MySQL
*/
app.use(myConnection(mysql2, optionsConnexionBaseDeDonnees, "pool"));

// je précise que les vues sont dans le dossier views
app.set('views', './views' );

// Jje précise que nous utilision EJD pour les vues
app.set('view engine', 'ejs');

// je précise que j'utilise le dossier 'public' qui contient les fichiers statics
app.use(express.static("public"));

// Middleware : envoie le chemin actuel à toutes les vues
// Grâce à res.locals, navbar.ejs peut savoir sur quelle page on est
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// Route GET : quand on tape une URL précise dans le navigateur
// Ici : http://localhost:3085/api/accueil
app.get('/api/accueil', (req, res) => {

    console.log("Je passe dans /api/accueil");
 
  res.render('accueil');
})

app.get('/api/equipe', (req,res) => {
    console.log("je passe dans /api/accueil");

    //1. Je meconnecte à la base de donnée à la méthodeonnection()
    req.getConnection((erreur,connection) => {
        if(erreur) { // je vérifie s'il ya une erreur lors de la connexion à la bdd
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM equipe", [], (err,resultatEquipe) => {
                if (err) {
                    console.log("Erreur dans la requête SQL SELECT: ", err);
                } else {
                    console.log("Mon équipe : ", resultatEquipe);

                    // je retourne au client le résultat de la requête SQL
                    res.render("equipe", {resultatEquipe});
                }
            });
        }
    });

    // res.render('equipe');
});

app.get('/api/plat', (req, res) => {
    console.log("Je passe dans /api/plat");

    // Je me connecte à la BDD pour récupérer tous les plats
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion BDD plat : ", erreur);
        } else {
            connection.query("SELECT * FROM plat", [], (err, resultatPlat) => {
                if (err) {
                    console.log("Erreur SELECT plat : ", err);
                } else {
                    console.log("Mes plats : ", resultatPlat);
                    // Je passe les plats à la vue EJS
                    res.render("plat", { resultatPlat });
                }
            });
        }
    });
});

// Route POST : ajouter un nouveau plat dans la table plat
app.post('/api/plat', (req, res) => {
    console.log("Corps de la requête nom plat : ",         req.body.nomPlat);
    console.log("Corps de la requête description : ",      req.body.description);
    console.log("Corps de la requête prix : ",             req.body.prix);
    console.log("Corps de la requête categorie : ",        req.body.categorie);
    console.log("Corps de la requête origine : ",          req.body.origine);
    console.log("Corps de la requête photo : ",            req.body.photo);

    // Je récupère les champs du formulaire envoyés par la modal
    const nomPlat     = req.body.nomPlat;
    const description = req.body.description;
    const prix        = req.body.prix;
    const categorie   = req.body.categorie;
    const origine     = req.body.origine || 'Mayotte';
    const photo       = req.body.photo;

    // Je prépare la requête SQL d'insertion
    const requeteSql = "INSERT INTO plat (nom, description, prix, categorie, origine, photo) VALUES (?, ?, ?, ?, ?, ?)";

    // L'ordre des valeurs correspond aux ? de la requête
    const ordreChamps = [nomPlat, description, prix, categorie, origine, photo];

    // Je me connecte à la BDD
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion BDD plat : ", erreur);
            res.status(300).redirect("/api/plat");
        } else {
            connection.query(requeteSql, ordreChamps, (err, nouveauPlat) => {
                if (err) {
                    console.log("Erreur lors de l'ajout du plat : ", err);
                    res.status(300).redirect("/api/plat");
                } else {
                    console.log("Bravo ! Nouveau plat ajouté dans la table plat");
                    res.status(300).redirect("/api/plat");
                }
            });
        }
    });
});

app.get('/api/contact', (req,res,) => {
    console.log("Je passe dans /api/contact");

    res.render('contact');
    
});


/* j'ajoute un fournisseur dans la table fournisseur. pour cela j'utilise la méthode post.
*/ 
app.post('/api/fournisseur', (req, res) => {
    console.log("Corps de la requête : ", req.body.nomFournisseur);
    console.log("Corps de la requête : ", req.body.prix);

    console.log("Corps de la requête : ", req.body.telephoneFournisseur);

    console.log("Corps de la requête : ", req.body.origine);

    console.log("Corps de la requête : ", req.body.type);

    console.log("Corps de la requête : ", req.body.mailFournisseur);
    const nomFournisseur = req.body.nomFournisseur;
    const quantite = req.body.quantite;
    const prix = req.body.prix;
    const telephoneFournisseur = req.body.telephoneFournisseur;
    const origine = req.body.origine;
    const type = req.body.type;
    const mailFournisseur = req.body.mailFournisseur;

    const requeteSql = "INSERT INTO fournisseur (nom, quantite, prix, telephone, origine, types, mail) VALUES(?, ?,?, ?, ?,?, ?)";

const ordreChamps = [nomFournisseur, quantite, prix, telephoneFournisseur, origine, type, mailFournisseur];

// Je me connecte à la BDD
req.getConnection((erreur, connection) => {
    if (erreur) {
        console.log("Erreur de connexion à la BDD : ", erreur);
        // On redirige pour ne pas laisser le navigateur tourner à l'infini
        res.status(300).redirect("/api/fournisseur");
    } else {
        connection.query(requeteSql, ordreChamps, (err, nouveauFournisseur) => {
            if (err) {
                console.log("Erreur d'ajout fournisseur :", err);
                // On redirige quand même en cas d'erreur SQL
                res.status(300).redirect("/api/fournisseur");
            } else {
                console.log("Bravo! Nouveau fournisseur ajouté");
                // Je redirige vers la page fournisseur pour voir le nouveau fournisseur
                res.status(300).redirect("/api/fournisseur");
            }
        });
    }
});


});


// Route POST : modifier un membre existant dans la table equipe
app.post('/api/equipe/modifier', (req, res) => {

    console.log("Modification du membre id : ", req.body.id);

    // Je récupère l'id et tous les champs modifiables
    const id        = req.body.id;
    const nom       = req.body.nom;
    const telephone = req.body.telephone;
    const poste     = req.body.poste;
    const email     = req.body.email;
    const salaire   = req.body.salaire;

    // Si la date est vide, on envoie null pour éviter l'erreur MySQL
    const dateEmbauche = req.body.date_embauche !== "" ? req.body.date_embauche : null;

    // Requête SQL UPDATE — on met à jour toutes les colonnes du membre ciblé
    const requeteSql = "UPDATE equipe SET nom=?, telephone=?, poste=?, email=?, date_embauche=?, salaire=? WHERE id=?";

    // L'ordre doit correspondre aux ? — l'id est en DERNIER (condition WHERE)
    const ordreChamps = [nom, telephone, poste, email, dateEmbauche, salaire, id];

    // Je me connecte à la BDD
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur connexion modifier membre : ", erreur);
            res.status(300).redirect("/api/equipe");
        } else {
            connection.query(requeteSql, ordreChamps, (err, resultat) => {
                if (err) {
                    console.log("Erreur UPDATE membre : ", err);
                    res.status(300).redirect("/api/equipe");
                } else {
                    console.log("Bravo ! Membre modifié avec succès, id : ", id);
                    res.status(300).redirect("/api/equipe");
                }
            });
        }
    });
});

// Route POST : ajouter un nouveau membre dans la table equipe
app.post('/api/equipe', (req, res) => {

    // J'affiche dans la console les données reçues depuis le formulaire
    console.log("Corps de la requête nom : ",           req.body.nom);
    console.log("Corps de la requête telephone : ",     req.body.telephone);
    console.log("Corps de la requête poste : ",         req.body.poste);
    console.log("Corps de la requête email : ",        req.body.email);
    console.log("Corps de la requête salaire : ",      req.body.salaire);
    console.log("Corps de la requête date_embauche : ", req.body.date_embauche);

    // Je récupère les champs du formulaire envoyés par la modal
    const nom       = req.body.nom;
    const telephone = req.body.telephone;
    const poste     = req.body.poste;
    const email     = req.body.email;
    const salaire   = req.body.salaire;

    // Si la date est vide (champ facultatif non rempli), on envoie null
    // Sinon MySQL refuserait une chaîne vide dans un champ Date
    const dateEmbauche = req.body.date_embauche !== "" ? req.body.date_embauche : null;

    // Je prépare la requête SQL pour insérer un nouveau membre
    // Les colonnes correspondent exactement à celles de la vraie table equipe
    const requeteSql = "INSERT INTO equipe (nom, telephone, poste, email, date_embauche, salaire) VALUES (?, ?, ?, ?, ?, ?)";

    // L'ordre des valeurs doit correspondre aux ? dans la requête SQL
    const ordreChamps = [nom, telephone, poste, email, dateEmbauche, salaire];

    // Je me connecte à la base de données
    req.getConnection((erreur, connection) => {
        if (erreur) {
            // S'il y a une erreur de connexion, je l'affiche dans la console
            console.log("Erreur de connexion à la BDD : ", erreur);
            // On redirige quand même pour ne pas laisser le navigateur tourner à l'infini
            res.status(300).redirect("/api/equipe");
        } else {
            // J'exécute la requête SQL d'insertion
            connection.query(requeteSql, ordreChamps, (err, nouveauMembre) => {
                if (err) {
                    console.log("Erreur lors de l'ajout du membre : ", err);
                    // On redirige quand même pour ne pas laisser le navigateur tourner à l'infini
                    res.status(300).redirect("/api/equipe");
                } else {
                    console.log("Bravo ! Nouveau membre ajouté dans la table equipe");
                    // Je redirige vers la page équipe pour voir le nouveau membre
                    res.status(300).redirect("/api/equipe");
                }
            });
        }
    });
});


// Route DELETE : supprimer un membre
app.delete('/api/equipe/:id', (req,res)=> {
    const idMembreEquipe = req.params.id;
    const queryDelete = "DELETE FROM equipe WHERE id = ?";

    req.getConnection((erreur, connection)=> {
        if (erreur) {
            console.log("Erreur suppression equipe : ", erreur);
        } else {
            connection.query(queryDelete, [idMembreEquipe], (err,resultat)=> {
                if (err) {
                    console.log("Erreur requete suppression : ", err);
                } else {
                    console.log("Bravo! Le membre est supprimé dans la table equipe");

                    // res.status(200).redirect("/api/accueil");
                    res.status(200).json({routeAccueil: "/api/accueil"});
                }
            });
        }
    });
});


app.get('/api/fournisseur', (req, res) => {
    console.log("Je passe dans /api/fournisseur");

    // Je me connecte à la BDD pour récupérer tous les fournisseurs
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion BDD fournisseur : ", erreur);
        } else {
            connection.query("SELECT * FROM fournisseur", [], (err, resultatFournisseur) => {
                if (err) {
                    console.log("Erreur SELECT fournisseur : ", err);
                } else {
                    console.log("Mes fournisseurs : ", resultatFournisseur);
                    // Je passe les fournisseurs à la vue EJS
                    res.render("fournisseur", { resultatFournisseur });
                }
            });
        }
    });
});

// On exporte l'application pour pouvoir l'utiliser ailleurs
// (dans serveur.js)
module.exports = app
