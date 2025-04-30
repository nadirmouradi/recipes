const db = require('../config/database')

const Recipe = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT recipes.*, users.nom, users.prenom 
         FROM recipes 
         JOIN users ON recipes.user_id = users.id 
         ORDER BY recipes.created_at DESC`,
        (err, results) => {
          if (err) return reject(err); 
          resolve(results); 
        }
      );
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT recipes.*, users.nom, users.prenom 
         FROM recipes 
         JOIN users ON recipes.user_id = users.id 
         WHERE recipes.id = ?`,
        [id], 
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]); 
        }
      );
    });
  },

  create: (data) => {
    const { user_id, titre, description, image_url, preparation, ingredients } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recipes (user_id, titre, description, image_url, preparation, ingredients)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, titre, description, image_url, preparation, ingredients],
        (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, ...data }); 
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM recipes WHERE id = ?`, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = Recipe;
