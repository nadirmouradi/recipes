import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PhotoIcon, ArrowUpTrayIcon, ClockIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext'; 
import { useRecipes } from '../../context/RecipesContext';


const RecipeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    preparation: '',
    ingredients: '',
    temps_preparation: '',
    type: '',
    difficulte: 'moyen'
  });
   
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const {newRecipe} = useRecipes()
  console.log("infos" ,user)



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append('user_id', user.id);

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) {
      data.append('image', image);
    }

    try {
      await newRecipe(data) ;
      navigate('/');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Créer une nouvelle recette</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Champ Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image de la recette</label>
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="mx-auto h-48 object-cover rounded" />
              ) : (
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="flex text-sm text-gray-600 justify-center">
                <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500">
                  <span>Téléverser une image</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    required 
                    className="sr-only" 
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG jusqu'à 5MB</p>
            </div>
          </div>
        </div>

        {/* Champ Titre */}
        <div>
          <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
            Titre de la recette
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="Ex: Tarte aux pommes"
          />
        </div>

        {/* Champs secondaires en ligne */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Temps de préparation */}
          <div>
            <label htmlFor="temps_preparation" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <ClockIcon className="h-5 w-5 mr-1 text-gray-500" />
              Temps de préparation
            </label>
            <select
              id="temps_preparation"
              name="temps_preparation"
              value={formData.temps_preparation}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              <option value="">Sélectionnez</option>
              <option value="< 30 min">Moins de 30 min</option>
              <option value="30-60 min">30 à 60 min</option>
              <option value="> 60 min">Plus de 60 min</option>
            </select>
          </div>

          {/* Type de recette */}
          <div>
            <label htmlFor="type" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <ScaleIcon className="h-5 w-5 mr-1 text-gray-500" />
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              <option value="">Sélectionnez</option>
              <option value="salée">Salée</option>
              <option value="sucrée">Sucrée</option>
              <option value="boisson">Boisson</option>
            </select>
          </div>

          {/* Difficulté */}
          <div>
            <label htmlFor="difficulte" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              Difficulté
            </label>
            <select
              id="difficulte"
              name="difficulte"
              value={formData.difficulte}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
          </div>
        </div>

        {/* Champ Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="Décrivez votre recette..."
          />
        </div>

        {/* Champ Ingrédients */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingrédients (séparés par des virgules)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows={4}
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="Ex: 200g de farine, 3 oeufs, 100g de sucre..."
          />
        </div>

        {/* Champ Préparation */}
        <div>
          <label htmlFor="preparation" className="block text-sm font-medium text-gray-700">
            Étapes de préparation
          </label>
          <textarea
            id="preparation"
            name="preparation"
            rows={6}
            value={formData.preparation}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="Détaillez chaque étape de la préparation..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                En cours...
              </>
            ) : (
              <>
                <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5" />
                Publier la recette
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;