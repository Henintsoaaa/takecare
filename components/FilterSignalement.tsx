import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

// Define the type for the filters
interface FiltersProps {
  onFilterChange: (filters: {
    status: string;
    date: string;
    priority: string;
  }) => void;
}

// Filters component
const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const handleFilterChange = () => {
    onFilterChange({ status, date, priority });
  };

  useEffect(() => {
    handleFilterChange();
  }, [status, date, priority]);

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
        <span>🔍</span>
        <span>Filtres</span>
      </h2>
      <div className="mt-6 space-y-6">
        {/* Filtre Statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 block w-full bg-gray-50 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light transition-all duration-300"
          >
            <option value="">Tous</option>
            <option value="Reçu">Reçu</option>
            <option value="En appel">En appel</option>
            <option value="En attente de résolution">
              En attente de résolution
            </option>
            <option value="Clôturé">Clôturé</option>
            <option value="Assigné">Assigné</option>
          </select>
        </div>

        {/* Filtre Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 block w-full bg-gray-50 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light transition-all duration-300"
          />
        </div>

        {/* Filtre Priorité */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priorité
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 block w-full bg-gray-50 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light transition-all duration-300"
          >
            <option value="">Tous</option>
            <option value="faible">Faible</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
          </select>
        </div>
      </div>
    </section>
  );
};

// Define the type for complaints
interface Complaint {
  id: number;
  current_status: string;
  date: string;
  description: string;
  priority: string;
  responsible_service: string;
}

// Main component
const ComplaintsBoard: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);

  const statuses = [
    { label: "Reçu", color: "bg-blue-500" },
    { label: "En appel", color: "bg-pink-500" },
    { label: "En attente de résolution", color: "bg-orange-500" },
    { label: "Clôturé", color: "bg-green-700" },
    { label: "Assigné", color: "bg-teal-500" },
  ];

  useEffect(() => {
    const fetchComplaints = async () => {
      // Uncomment the following lines to fetch data from the API
      // try {
      //   const response = await axios.get(
      //     "http://localhost/Devoi_socila_media /src/backend/api/signalement/signalementBoard.php"
      //   );
      //   const data = response.data;
      //   if (data.status === "success" && Array.isArray(data.data)) {
      //     setComplaints(data.data);
      //     setFilteredComplaints(data.data);
      //   } else {
      //     console.error("Données non valides");
      //   }
      // } catch (error) {
      //   console.error("Erreur lors de la récupération des données:", error);
      // }
    };

    fetchComplaints();

    // Prototype data for complaints
    const prototypeData: Complaint[] = [
      {
        id: 1,
        current_status: "Reçu",
        date: "2023-10-01",
        description: "Problème de connexion Internet",
        priority: "haute",
        responsible_service: "Service Technique",
      },
      {
        id: 2,
        current_status: "En attente de résolution",
        date: "2023-10-02",
        description: "Erreur de facturation",
        priority: "moyenne",
        responsible_service: "Service Client",
      },
      {
        id: 3,
        current_status: "Clôturé",
        date: "2023-09-30",
        description: "Demande de remboursement",
        priority: "faible",
        responsible_service: "Service Financier",
      },
    ];
    setComplaints(prototypeData);
    setFilteredComplaints(prototypeData);
  }, []);

  const handleFilterChange = (filters: {
    status: string;
    date: string;
    priority: string;
  }) => {
    const { status, date, priority } = filters;

    const filteredData = complaints.filter((item) => {
      const matchesStatus =
        !status || item.current_status.toLowerCase() === status.toLowerCase();
      const matchesDate = !date || item.date === date;
      const matchesPriority =
        !priority || item.priority.toLowerCase() === priority.toLowerCase();
      return matchesStatus && matchesDate && matchesPriority;
    });

    setFilteredComplaints(filteredData);
  };

  return (
    <div className="p-6">
      <Filters onFilterChange={handleFilterChange} />
      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-900">Signalements</h2>
        <div className="mt-4 space-y-4">
          {filteredComplaints.length > 0 ? (
            <table className="min-w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-indigo-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Résumé
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Priorité
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Responsable
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => {
                  const status = statuses.find(
                    (status) => status.label === complaint.current_status
                  );
                  return (
                    <tr key={complaint.id} className="border-b">
                      <td className="py-3 px-4 flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${
                            status ? status.color : "bg-gray-300"
                          }`}
                        ></div>
                        {complaint.current_status}
                      </td>
                      <td className="py-3 px-4 text-sm">{complaint.date}</td>
                      <td className="py-3 px-4 text-sm">
                        {complaint.description.substring(0, 30)}...
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {complaint.priority}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {complaint.responsible_service}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">A ucune plainte filtrée trouvée.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ComplaintsBoard;
