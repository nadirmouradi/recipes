import React, { useState } from 'react';
import axios from 'axios';

const user_id = 2; 

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    preparation: '',
    ingredients: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('user_id', user_id); 

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (image) {
      data.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/recipes', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Recette ajoutée avec succès !');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi du formulaire.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto bg-white shadow rounded">
      <input
        type="text"
        name="titre"
        placeholder="Titre"
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />
      <textarea
        name="ingredients"
        placeholder="Ingrédients"
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />
      <textarea
        name="preparation"
        placeholder="Préparation"
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
        className="w-full p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Créer la recette
      </button>
    </form>
  );
};

export default RecipeForm;
