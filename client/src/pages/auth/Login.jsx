import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Changement ici

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const { login } = useAuth();
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email est obligatoire.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide.';
    }
    if (!formData.password) {
      newErrors.password = 'Mot de passe est obligatoire.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { success, error } = await login(formData);
      if (success) {
        Navigate("/");
      } else {
        setErrors({
          ...errors,
          apiError: error || "Échec de la connexion" // Affiche l'erreur du backend
        });
      }
    } catch (error) {
      setErrors({
        ...errors,
        apiError: error.message || "Une erreur inconnue est survenue"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Connexion</h1>
        <form className="w-1/2" onSubmit={handleSubmit}>
          {errors.apiError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {errors.apiError}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-200 transition duration-300"
          >
            {isLoading ? "Connexion..." : "Connexion"}

          </button>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Vous n'avez pas de compte ?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Inscrivez-vous ici
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <img
          src="assets/food.jpg"
          alt="Logo"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
