import React, { useState, useEffect } from 'react';
import { getAllCommentsForRecipe , addComment , deleteComment } from '../../api/comments';
import { useAuth } from '../../context/AuthContext'; 
import { TrashIcon } from '@heroicons/react/24/outline';

const CommentSection = ({ recipeId }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const data = await getAllCommentsForRecipe(recipeId);
      setComments(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des commentaires');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const commentData = {
        recipe_id: recipeId,
        contenu: newComment,
        user_id: user.id,
      };

      await addComment(commentData);
      await fetchComments();
      setNewComment('');
    } catch (err) {
      setError(err.message || "Erreur lors de l'ajout du commentaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!user) return;
    
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Commentaires</h2>
      
      {isAuthenticated && (
        <div className="mb-8">
          <form onSubmit={handleSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Partagez votre avis..."
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!newComment.trim() || isSubmitting}
              >
                {isSubmitting ? 'Publication...' : 'Publier'}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center py-6 text-gray-500">
          {isAuthenticated ? 'Soyez le premier à commenter !' : 'Connectez-vous pour commenter'}
        </p>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-5 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                    {comment.prenom?.charAt(0)}{comment.nom?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {comment.prenom} {comment.nom}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {user?.id === comment.user_id && (
                  <button 
                    onClick={() => handleDelete(comment.id)}
                    className="text-gray-400 hover:text-red-500"
                    title="Supprimer"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
              <p className="text-gray-700 pl-11">{comment.contenu}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;