// On importe la connexion à la base de données
const db = require('../config/database')

// Objet Recipe qui contient nos fonctions
const Recipe = {
  // Obtenir toutes les recettes
  getAll: () => {
    return new Promise((resolve, reject) => {
      // Requête SQL : récupérer toutes les recettes avec le nom et prénom de l'auteur
      db.query(
        `SELECT recipes.*, users.nom, users.prenom 
         FROM recipes 
         JOIN users ON recipes.user_id = users.id 
         ORDER BY recipes.created_at DESC`,
        (err, results) => {
          if (err) return reject(err); // En cas d'erreur
          resolve(results); // Sinon, on renvoie les résultats
        }
      );
    });
  },

  // Obtenir une recette par son ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT recipes.*, users.nom, users.prenom 
         FROM recipes 
         JOIN users ON recipes.user_id = users.id 
         WHERE recipes.id = ?`,
        [id], // ID passé en paramètre
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]); // On retourne une seule recette
        }
      );
    });
  },

  // Créer une nouvelle recette
  create: (data) => {
    const { user_id, titre, description, image_url, preparation, ingredients } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recipes (user_id, titre, description, image_url, preparation, ingredients)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, titre, description, image_url, preparation, ingredients],
        (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, ...data }); // On retourne la recette créée
        }
      );
    });
  },

  // Supprimer une recette par ID
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM recipes WHERE id = ?`, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result); // Renvoie le résultat de la suppression
      });
    });
  }
};

// On exporte le modèle pour l'utiliser ailleurs
module.exports = Recipe;
