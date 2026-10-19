export interface Location {
  city: string;
  localities: string[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
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

/**
 * Fictional reference coordinates for localities and city centers.
 * Used to calculate sample distances when GPS permission is not granted.
 */
export const localityCoordinates: Record<string, Coordinates> = {
  // Bengaluru
  "Bengaluru": { latitude: 12.9716, longitude: 77.5946 },
  "Indiranagar": { latitude: 12.9784, longitude: 77.6408 },
  "Jayanagar": { latitude: 12.9308, longitude: 77.5838 },
  "Koramangala": { latitude: 12.9352, longitude: 77.6245 },
  "Whitefield": { latitude: 12.9698, longitude: 77.7500 },
  "Malleshwaram": { latitude: 13.0031, longitude: 77.5643 },
  "HSR Layout": { latitude: 12.9121, longitude: 77.6446 },

  // Mumbai
  "Mumbai": { latitude: 19.0760, longitude: 72.8777 },
  "Bandra West": { latitude: 19.0596, longitude: 72.8295 },
  "Andheri East": { latitude: 19.1136, longitude: 72.8697 },
  "Powai": { latitude: 19.1176, longitude: 72.9060 },
  "Dadar": { latitude: 19.0178, longitude: 72.8478 },
  "Borivali West": { latitude: 19.2307, longitude: 72.8567 },
  "Chembur": { latitude: 19.0522, longitude: 72.9005 },

  // New Delhi
  "New Delhi": { latitude: 28.6139, longitude: 77.2090 },
  "Saket": { latitude: 28.5245, longitude: 77.2066 },
  "Dwarka": { latitude: 28.5921, longitude: 77.0460 },
  "Vasant Kunj": { latitude: 28.5298, longitude: 77.1558 },
  "Rohini": { latitude: 28.7159, longitude: 77.1128 },
  "Connaught Place": { latitude: 28.6315, longitude: 77.2167 },
  "Karol Bagh": { latitude: 28.6517, longitude: 77.1906 },
};
