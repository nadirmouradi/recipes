const db = require('../config/database')

const createUser = async (userData) => {
    const { nom, prenom, email, password } = userData;
    const query = `
      INSERT INTO users (nom, prenom, email, password, date_inscription)
      VALUES (?, ?, ?, ?, NOW())
    `;
    try {
      const result = await db.execute(query, [nom, prenom, email, password]);
      return result[0];
    } catch (err) {
      console.error('Error in createUser model:', err);
      throw new Error(`Error creating user: ${err.message}`);
    }
  };

  
  
  




module.exports = {createUser } ;