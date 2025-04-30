const authModel = require("../model/auth")
const db = require('../config/database')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const register = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authModel.createUser({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Error in createUserController:', err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE email = ?";
    db.execute(query, [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ 
          success: false,
          message: "Erreur serveur lors de la connexion" 
        });
      }

      if (results.length === 0) {
        return res.status(401).json({ 
          success: false,
          message: "Email ou mot de passe incorrect" 
        });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return res.status(401).json({ 
          success: false,
          message: "Email ou mot de passe incorrect" 
        });
      }

      const token = jwt.sign(
        { 
          id: user.id,
          email: user.email 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: "24h" }
      );

      const userData = {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        createdAt: user.created_at
      };

      res.json({
        success: true,
        token,
        user: userData
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la connexion"
    });
  }
};


   
 



module.exports = {
    register,
    login

};