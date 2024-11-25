const CommentForm: React.FC = () => {
  return (
    <div>
      {/* Commentaires Internes */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
          <span className="bg-gray-200 p-2 rounded-full">
            <span>💬</span>
          </span>
          <span>Commentaires Internes</span>
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-4 border-l-4 border-blue-600">
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong className="text-gray-900">Jean Dupont:</strong>{" "}
              <span className="italic text-gray-600">
                "En attente de réponse de la victime. Envoi de documents de
                preuve."
              </span>
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Marc Robert:</strong>{" "}
              <span className="italic text-gray-600">
                "Ajout d'un complément de plainte en cours."
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommentForm;
