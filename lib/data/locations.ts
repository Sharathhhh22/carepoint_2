export interface Location {
  city: string;
  localities: string[];
}

export const locationsData: Location[] = [
  {
    city: "Bengaluru",
    localities: [
      "Indiranagar",
      "Jayanagar",
      "Koramangala",
      "Whitefield",
      "Malleshwaram",
      "HSR Layout",
    ],
  },
  {
    city: "Mumbai",
    localities: [
      "Bandra West",
      "Andheri East",
      "Powai",
      "Dadar",
      "Borivali West",
      "Chembur",
    ],
  },
  {
    city: "New Delhi",
    localities: [
      "Saket",
      "Dwarka",
      "Vasant Kunj",
      "Rohini",
      "Connaught Place",
      "Karol Bagh",
    ],
  },
];
