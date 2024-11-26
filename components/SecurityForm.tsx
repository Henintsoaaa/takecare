"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface SecurityComplaintFormProps {
  signalementId: string; // Adjust the type if needed (e.g., number)
}

const SecurityComplaintForm: React.FC<SecurityComplaintFormProps> = ({
  signalementId,
}) => {
  const [status, setStatus] = useState<string>("reçu");
  const [nextStep, setNextStep] = useState<string>("");
  const [nextDate, setNextDate] = useState<string>("");
  const [serviceComments, setServiceComments] = useState<string>("");
  const [responsibleService, setResponsibleService] = useState<string>("");
  const [priority, setPriority] = useState<string>("moyenne");

  const statuses = [
    { label: "Reçu", color: "bg-blue-500" },
    { label: "En vérification", color: "bg-yellow-500" },
    { label: "En attente de documents", color: "bg-primary-light" },
    { label: "Assigné", color: "bg-teal-500" },
    { label: "En cours de traitement", color: "bg-secondary-light" },
    { label: "En attente de résolution", color: "bg-orange-500" },
    { label: "Reporté", color: "bg-gray-500" },
    { label: "Résolu", color: "bg-green-500" },
    { label: "Rejeté", color: "bg-red-500" },
    { label: "En appel", color: "bg-pink-500" },
    { label: "Escalade", color: "bg-red-700" },
    { label: "Clôturé", color: "bg-green-700" },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Données à envoyer au backend
    const formData = {
      signalementId,
      status,
      nextStep,
      nextDate,
      serviceComments,
      responsibleService,
      priority,
    };

    try {
      const response = await fetch("http://localhost:3003/api/save-status", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Données enregistrées avec succès !");
      } else {
        alert("Erreur lors de l'enregistrement des données.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Erreur réseau.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="responsible" className="text-xl font-semibold">
            Service responsable
          </label>
          <input
            id="responsible"
            type="text"
            placeholder="Nom du service"
            className="p-2 rounded-lg bg-gray-100 border border-gray-500"
            value={responsibleService}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setResponsibleService(e.target.value)
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Priorité
          </label>
          <select
            value={priority}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPriority(e.target.value)
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="faible">Faible</option>
          </select>
        </div>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Prochaines étapes</h2>
          <div className="flex flex-col space-y-2">
            <label htmlFor="next-step" className="font-medium">
              Étape suivante
            </label>
            <select
              id="next-step"
              className="p-2 rounded-lg bg-gray-100 border border-gray-500 w-48"
              value={nextStep}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setNextStep(e.target.value)
              }
            >
              <option value="">Sélectionner...</option>
              <option value="enquete">Enquête en cours</option>
              <option value="appel_a_temoin">Appel à témoins</option>
              <option value="interview">Convocation pour une interview</option>
              <option value="audience">Audience prévue au tribunal</option>
              <option value="confrontation_programmee">
                Confrontation programmée
              </option>
              <option value="transmission_dossier">
                Transmission du dossier au tribunal
              </option>
              <option value="cloture_enquete">Clôture de l'enquête</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="next-date" className="font-medium">
              Date prévue
            </label>
            <input
              id="next-date"
              type="date"
              className="p-2 rounded-lg bg-gray-100 border border-gray-500 w-48"
              value={nextDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNextDate(e.target.value)
              }
            />
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Statut de l'affaire</h2>
          <div className="flex flex-col space-y-2">
            <label htmlFor="status" className="font-medium">
              Statut actuel
            </label>
            <select
              id="status"
              className="p-2 rounded-lg bg-gray-100 border border-gray-500"
              value={status}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setStatus(e.target.value)
              }
            >
              {statuses.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`w-4 h-4 rounded-full ${
                statuses.find((s) => s.label === status)?.color
              }`}
            ></span>
            <span>{status}</span>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Commentaires du service</h2>
          <textarea
            id="service-comments"
            rows={4}
            placeholder="Entrez les commentaires du service ici..."
            className="p-2 rounded-lg bg-gray-100 border border-gray-500 w-full"
            value={serviceComments}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setServiceComments(e.target.value)
            }
          />
        </section>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default SecurityComplaintForm;
