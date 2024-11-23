// Define the expected types for the API responses
// import axios from "axios";
interface TotalPlaintesResponse {
  total: number;
}

interface StatusPlaintesResponse {
  current_status: string;
  count: number;
}

interface RegionResponse {
  location: string;
  count: number;
}

interface TypeDeViolenceResponse {
  description: string;
  count: number;
}

interface StatsParJourResponse {
  jour: string;
  count: number;
}

interface TempsMoyenResponse {
  temps_moyen: number; // Adjust based on actual API response
}

// Prototype data
const prototypeTotalPlaintes: TotalPlaintesResponse = {
  total: 150,
};

const prototypeStatusPlaintes: StatusPlaintesResponse[] = [
  { current_status: "Reçu", count: 50 },
  { current_status: "En vérification", count: 30 },
  { current_status: "Résolu", count: 40 },
  { current_status: "Rejeté", count: 20 },
];

const prototypeRegions: RegionResponse[] = [
  { location: "Île-de-France", count: 70 },
  { location: "Provence-Alpes-Côte d'Azur", count: 30 },
  { location: "Auvergne-Rhône-Alpes", count: 20 },
  { location: "Nouvelle-Aquitaine", count: 30 },
];

const prototypeTypesDeViolences: TypeDeViolenceResponse[] = [
  { description: "Violence physique", count: 60 },
  { description: "Violence verbale", count: 40 },
  { description: "Violence sexuelle", count: 30 },
  { description: "Harcèlement", count: 20 },
];

const prototypeStatsParJour: StatsParJourResponse[] = [
  { jour: "2023-10-01", count: 10 },
  { jour: "2023-10-02", count: 15 },
  { jour: "2023-10-03", count: 20 },
  { jour: "2023-10-04", count: 25 },
];

const prototypeTempsMoyen: TempsMoyenResponse = {
  temps_moyen: 15,
};

// Fetch total complaints
export const fetchTotalPlaintes = async (): Promise<TotalPlaintesResponse> => {
  // const res = await axios.get<TotalPlaintesResponse>('http://localhost:3003/api/plaintes/total');
  // return res.data;
  return prototypeTotalPlaintes; // Return prototype data
};

// Fetch total status of complaints
export const fetchTotalStatusPlaintes = async (): Promise<
  StatusPlaintesResponse[]
> => {
  // const res = await axios.get<StatusPlaintesResponse[]>('http://localhost:3003/api/plaintes/repartition_status');
  // return res.data;
  return prototypeStatusPlaintes; // Return prototype data
};

// Fetch repartition by region
export const fetchRepartitionParRegion = async (): Promise<
  RegionResponse[]
> => {
  // const res = await axios.get<RegionResponse[]>('http://localhost:3003/api/plaintes/repartition');
  // return res.data;
  return prototypeRegions; // Return prototype data
};

// Fetch types of violence
export const fetchTypesDeViolences = async (): Promise<
  TypeDeViolenceResponse[]
> => {
  // const res = await axios.get<TypeDeViolenceResponse[]>('http://localhost:3003/api/plaintes/types');
  // return res.data;
  return prototypeTypesDeViolences; // Return prototype data
};

// Fetch statistics by day
export const fetchStatsParJour = async (): Promise<StatsParJourResponse[]> => {
  // const res = await axios.get<StatsParJourResponse[]>('http://localhost:3003/api/plaintes/par-jour');
  // return res.data;
  return prototypeStatsParJour; // Return prototype data
};

// Fetch average processing time
export const fetchTempsMoyen = async (): Promise<TempsMoyenResponse> => {
  // const res = await axios.get<TempsMoyenResponse>('http://localhost:3003/api/plaintes/temps-moyen');
  // return res.data;
  return prototypeTempsMoyen; // Return prototype data
};
