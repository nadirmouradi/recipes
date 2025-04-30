import React, { useState, useEffect } from 'react';
import { getAllCommentsForRecipe , addComment , deleteComment } from '../../api/comments';
import { useAuth } from '../../context/AuthContext'; 

const CommentSection = ({ recipeId }) => {
  const { user } = useAuth(); 
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

  console.log("comments : ", comments)
  
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

      const addedComment = await addComment(commentData);
      await fetchComments()
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
    <div className="mt-10 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Commentaires</h3>
      
   
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Partagez votre avis..."
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!newComment.trim() || isSubmitting}
              >
                {isSubmitting ? 'Publication...' : 'Publier'}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </div>
      
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          {user ? 'Soyez le premier à commenter !' : 'Connectez-vous pour commenter'}
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">
  {comment ? `${comment.prenom} ${comment.nom}` : 'Utilisateur'}
</span>

                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                  </span>
                  {user?.id === comment.user_id && (
                    <button 
                      onClick={() => handleDelete(comment.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-600">{comment.contenu}</p>
              
              <div className="flex space-x-4 mt-3 text-sm text-gray-500">
                <button className="hover:text-blue-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {comment.likes || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;