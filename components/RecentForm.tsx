const RecentForm: React.FC = () => {
  return (
    <div>
      {/* Actions Récentes */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
          <span className="bg-gray-200 p-2 rounded-full">
            <span>📝</span>
          </span>
          <span>Actions Récentes</span>
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-4 border-l-4 border-green-600">
          <ul className="space-y-4">
            <li className="flex items-start space-x-2 hover:bg-gray-100 p-2 rounded transition duration-200">
              <span className="text-green-600 text-xl">🟢</span>
              <span className="text-gray-700">
                <strong className="text-gray-900">15/11/24</strong> - Ajout de
                notes pour
                <span className="font-semibold">
                  {" "}
                  "Harcèlement verbal"
                </span>{" "}
                (Responsable:
                <span className="font-semibold"> Jean Dupont</span>)
              </span>
            </li>
            <li className="flex items-start space-x-2 hover:bg-gray-100 p-2 rounded transition duration-200">
              <span className="text-yellow-600 text-xl">🟡</span>
              <span className="text-gray-700">
                <strong className="text-gray-900">14/11/24</strong> -
                Vérification d'un complément demandé (Responsable:{" "}
                <span className="font-semibold">Marie Lemoine</span>)
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default RecentForm;
