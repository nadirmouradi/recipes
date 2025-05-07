const db = require('../config/database');

const Recipe = {
  // Récupère toutes les recettes avec les infos utilisateur
  getAll: async () => {
    try {
      const [results] = await db.query(
        `SELECT recipes.*, users.nom, users.prenom 
         FROM recipes 
         JOIN users ON recipes.user_id = users.id 
         ORDER BY recipes.created_at DESC`
      );
      return results;
    } catch (err) {
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const [results] = await db.query(
        `SELECT recipes.*, users.nom, users.prenom 
         FROM recipes 
         JOIN users ON recipes.user_id = users.id 
         WHERE recipes.id = ?`,
        [id]
      );
      return results[0];
    } catch (err) {
      throw err;
    }
  },

  // Crée une nouvelle recette
  create: async (data) => {
    const { 
      user_id, 
      titre, 
      description, 
      image_url, 
      preparation, 
      ingredients,
      temps_preparation,
      type,
      difficulte
    } = data;
    
    try {
      const [result] = await db.query(
        `INSERT INTO recipes 
          (user_id, titre, description, image_url, preparation, ingredients, temps_preparation, type, difficulte)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user_id, 
          titre, 
          description, 
          image_url, 
          preparation, 
          ingredients,
          temps_preparation,
          type,
          difficulte
        ]
      );
      return { id: result.insertId, ...data };
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const [result] = await db.query(
        `DELETE FROM recipes WHERE id = ?`, 
        [id]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = Recipe;