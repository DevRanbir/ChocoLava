// Location data service for feeding to AI
export interface LocationData {
  location: string;
  trafficStatus: string;
  coordinates: { lat: number; lng: number };
  aqiData: Array<{ time: string; aqi: number }>;
  crowdData: Array<{ time: string; count: number }>;
  noiseData: Array<{ time: string; level: number }>;
  responseTimeData: Array<{ service: string; time: number }>;
  incidentData: Array<{ type: string; count: number }>;
}

// Traffic data with coordinates
const trafficData = [
  { location: "Madhya Marg", status: "Heavy", dotColor: "bg-red-500", coords: { lat: 30.7333, lng: 76.7794 } },
  { location: "Dakshin Marg", status: "Moderate", dotColor: "bg-yellow-500", coords: { lat: 30.7209, lng: 76.7665 } },
  { location: "Shanti Path", status: "Smooth", dotColor: "bg-green-500", coords: { lat: 30.7387, lng: 76.7900 } },
  { location: "Jan Marg", status: "Moderate", dotColor: "bg-yellow-500", coords: { lat: 30.7286, lng: 76.7731 } },
  { location: "Vikas Marg", status: "Heavy", dotColor: "bg-red-500", coords: { lat: 30.7445, lng: 76.7850 } },
  { location: "Sector 17 Market Road", status: "Smooth", dotColor: "bg-green-500", coords: { lat: 30.7419, lng: 76.7686 } },
];

// AQI data by location
const locationAQIData = {
  "Madhya Marg": [
    { time: "0:00", aqi: 125 },
    { time: "2:00", aqi: 118 },
    { time: "4:00", aqi: 130 },
    { time: "6:00", aqi: 142 },
    { time: "8:00", aqi: 165 },
    { time: "10:00", aqi: 155 },
    { time: "12:00", aqi: 148 },
    { time: "14:00", aqi: 152 },
    { time: "16:00", aqi: 168 },
    { time: "18:00", aqi: 175 },
    { time: "20:00", aqi: 158 },
    { time: "22:00", aqi: 135 },
    { time: "23:00", aqi: 128 },
  ],
  "Dakshin Marg": [
    { time: "0:00", aqi: 95 },
    { time: "2:00", aqi: 88 },
    { time: "4:00", aqi: 92 },
    { time: "6:00", aqi: 108 },
    { time: "8:00", aqi: 125 },
    { time: "10:00", aqi: 118 },
    { time: "12:00", aqi: 112 },
    { time: "14:00", aqi: 115 },
    { time: "16:00", aqi: 128 },
    { time: "18:00", aqi: 135 },
    { time: "20:00", aqi: 118 },
    { time: "22:00", aqi: 105 },
    { time: "23:00", aqi: 98 },
  ],
  "Shanti Path": [
    { time: "0:00", aqi: 65 },
    { time: "2:00", aqi: 58 },
    { time: "4:00", aqi: 62 },
    { time: "6:00", aqi: 72 },
    { time: "8:00", aqi: 85 },
    { time: "10:00", aqi: 78 },
    { time: "12:00", aqi: 75 },
    { time: "14:00", aqi: 82 },
    { time: "16:00", aqi: 88 },
    { time: "18:00", aqi: 92 },
    { time: "20:00", aqi: 78 },
    { time: "22:00", aqi: 68 },
    { time: "23:00", aqi: 62 },
  ],
  "Jan Marg": [
    { time: "0:00", aqi: 105 },
    { time: "2:00", aqi: 98 },
    { time: "4:00", aqi: 110 },
    { time: "6:00", aqi: 122 },
    { time: "8:00", aqi: 145 },
    { time: "10:00", aqi: 138 },
    { time: "12:00", aqi: 132 },
    { time: "14:00", aqi: 135 },
    { time: "16:00", aqi: 148 },
    { time: "18:00", aqi: 155 },
    { time: "20:00", aqi: 138 },
    { time: "22:00", aqi: 115 },
    { time: "23:00", aqi: 108 },
  ],
  "Vikas Marg": [
    { time: "0:00", aqi: 135 },
    { time: "2:00", aqi: 128 },
    { time: "4:00", aqi: 140 },
    { time: "6:00", aqi: 152 },
    { time: "8:00", aqi: 175 },
    { time: "10:00", aqi: 168 },
    { time: "12:00", aqi: 158 },
    { time: "14:00", aqi: 162 },
    { time: "16:00", aqi: 178 },
    { time: "18:00", aqi: 185 },
    { time: "20:00", aqi: 168 },
    { time: "22:00", aqi: 145 },
    { time: "23:00", aqi: 138 },
  ],
  "Sector 17 Market Road": [
    { time: "0:00", aqi: 55 },
    { time: "2:00", aqi: 48 },
    { time: "4:00", aqi: 52 },
    { time: "6:00", aqi: 62 },
    { time: "8:00", aqi: 75 },
    { time: "10:00", aqi: 68 },
    { time: "12:00", aqi: 65 },
    { time: "14:00", aqi: 72 },
    { time: "16:00", aqi: 78 },
    { time: "18:00", aqi: 82 },
    { time: "20:00", aqi: 68 },
    { time: "22:00", aqi: 58 },
    { time: "23:00", aqi: 52 },
  ],
};

// Crowd data by location
const locationCrowdData = {
  "Madhya Marg": [
    { time: "0:00", count: 45 },
    { time: "2:00", count: 32 },
    { time: "4:00", count: 28 },
    { time: "6:00", count: 89 },
    { time: "8:00", count: 156 },
    { time: "10:00", count: 198 },
    { time: "12:00", count: 245 },
    { time: "14:00", count: 289 },
    { time: "16:00", count: 356 },
    { time: "18:00", count: 412 },
    { time: "20:00", count: 298 },
    { time: "22:00", count: 156 },
    { time: "23:00", count: 89 },
  ],
  "Dakshin Marg": [
    { time: "0:00", count: 35 },
    { time: "2:00", count: 25 },
    { time: "4:00", count: 22 },
    { time: "6:00", count: 68 },
    { time: "8:00", count: 125 },
    { time: "10:00", count: 168 },
    { time: "12:00", count: 195 },
    { time: "14:00", count: 225 },
    { time: "16:00", count: 285 },
    { time: "18:00", count: 325 },
    { time: "20:00", count: 245 },
    { time: "22:00", count: 125 },
    { time: "23:00", count: 78 },
  ],
  "Shanti Path": [
    { time: "0:00", count: 15 },
    { time: "2:00", count: 12 },
    { time: "4:00", count: 8 },
    { time: "6:00", count: 28 },
    { time: "8:00", count: 65 },
    { time: "10:00", count: 95 },
    { time: "12:00", count: 125 },
    { time: "14:00", count: 155 },
    { time: "16:00", count: 185 },
    { time: "18:00", count: 225 },
    { time: "20:00", count: 165 },
    { time: "22:00", count: 85 },
    { time: "23:00", count: 45 },
  ],
  "Jan Marg": [
    { time: "0:00", count: 38 },
    { time: "2:00", count: 28 },
    { time: "4:00", count: 25 },
    { time: "6:00", count: 75 },
    { time: "8:00", count: 135 },
    { time: "10:00", count: 175 },
    { time: "12:00", count: 215 },
    { time: "14:00", count: 255 },
    { time: "16:00", count: 315 },
    { time: "18:00", count: 365 },
    { time: "20:00", count: 275 },
    { time: "22:00", count: 145 },
    { time: "23:00", count: 85 },
  ],
  "Vikas Marg": [
    { time: "0:00", count: 48 },
    { time: "2:00", count: 35 },
    { time: "4:00", count: 32 },
    { time: "6:00", count: 95 },
    { time: "8:00", count: 165 },
    { time: "10:00", count: 215 },
    { time: "12:00", count: 265 },
    { time: "14:00", count: 315 },
    { time: "16:00", count: 385 },
    { time: "18:00", count: 445 },
    { time: "20:00", count: 325 },
    { time: "22:00", count: 185 },
    { time: "23:00", count: 115 },
  ],
  "Sector 17 Market Road": [
    { time: "0:00", count: 12 },
    { time: "2:00", count: 8 },
    { time: "4:00", count: 5 },
    { time: "6:00", count: 22 },
    { time: "8:00", count: 45 },
    { time: "10:00", count: 75 },
    { time: "12:00", count: 95 },
    { time: "14:00", count: 125 },
    { time: "16:00", count: 155 },
    { time: "18:00", count: 185 },
    { time: "20:00", count: 135 },
    { time: "22:00", count: 65 },
    { time: "23:00", count: 35 },
  ],
};

// Noise data by location
const locationNoiseData = {
  "Madhya Marg": [
    { time: "0:00", level: 45 },
    { time: "2:00", level: 38 },
    { time: "4:00", level: 42 },
    { time: "6:00", level: 65 },
    { time: "8:00", level: 78 },
    { time: "10:00", level: 72 },
    { time: "12:00", level: 75 },
    { time: "14:00", level: 82 },
    { time: "16:00", level: 85 },
    { time: "18:00", level: 88 },
    { time: "20:00", level: 72 },
    { time: "22:00", level: 58 },
    { time: "23:00", level: 48 },
  ],
  "Dakshin Marg": [
    { time: "0:00", level: 38 },
    { time: "2:00", level: 32 },
    { time: "4:00", level: 35 },
    { time: "6:00", level: 55 },
    { time: "8:00", level: 68 },
    { time: "10:00", level: 62 },
    { time: "12:00", level: 65 },
    { time: "14:00", level: 72 },
    { time: "16:00", level: 75 },
    { time: "18:00", level: 78 },
    { time: "20:00", level: 62 },
    { time: "22:00", level: 48 },
    { time: "23:00", level: 42 },
  ],
  "Shanti Path": [
    { time: "0:00", level: 25 },
    { time: "2:00", level: 22 },
    { time: "4:00", level: 20 },
    { time: "6:00", level: 35 },
    { time: "8:00", level: 45 },
    { time: "10:00", level: 42 },
    { time: "12:00", level: 48 },
    { time: "14:00", level: 52 },
    { time: "16:00", level: 55 },
    { time: "18:00", level: 58 },
    { time: "20:00", level: 45 },
    { time: "22:00", level: 32 },
    { time: "23:00", level: 28 },
  ],
  "Jan Marg": [
    { time: "0:00", level: 42 },
    { time: "2:00", level: 35 },
    { time: "4:00", level: 38 },
    { time: "6:00", level: 58 },
    { time: "8:00", level: 72 },
    { time: "10:00", level: 68 },
    { time: "12:00", level: 72 },
    { time: "14:00", level: 78 },
    { time: "16:00", level: 82 },
    { time: "18:00", level: 85 },
    { time: "20:00", level: 68 },
    { time: "22:00", level: 52 },
    { time: "23:00", level: 45 },
  ],
  "Vikas Marg": [
    { time: "0:00", level: 48 },
    { time: "2:00", level: 42 },
    { time: "4:00", level: 45 },
    { time: "6:00", level: 68 },
    { time: "8:00", level: 82 },
    { time: "10:00", level: 78 },
    { time: "12:00", level: 82 },
    { time: "14:00", level: 88 },
    { time: "16:00", level: 92 },
    { time: "18:00", level: 95 },
    { time: "20:00", level: 78 },
    { time: "22:00", level: 62 },
    { time: "23:00", level: 52 },
  ],
  "Sector 17 Market Road": [
    { time: "0:00", level: 22 },
    { time: "2:00", level: 18 },
    { time: "4:00", level: 15 },
    { time: "6:00", level: 28 },
    { time: "8:00", level: 38 },
    { time: "10:00", level: 35 },
    { time: "12:00", level: 42 },
    { time: "14:00", level: 45 },
    { time: "16:00", level: 48 },
    { time: "18:00", level: 52 },
    { time: "20:00", level: 38 },
    { time: "22:00", level: 28 },
    { time: "23:00", level: 25 },
  ],
};

// Response time data by location
const locationResponseData = {
  "Madhya Marg": [
    { service: "Fire", time: 8.5 },
    { service: "Police", time: 6.2 },
    { service: "Ambulance", time: 12.3 },
    { service: "Traffic", time: 4.8 },
  ],
  "Dakshin Marg": [
    { service: "Fire", time: 7.2 },
    { service: "Police", time: 5.8 },
    { service: "Ambulance", time: 10.5 },
    { service: "Traffic", time: 4.2 },
  ],
  "Shanti Path": [
    { service: "Fire", time: 5.8 },
    { service: "Police", time: 4.5 },
    { service: "Ambulance", time: 8.2 },
    { service: "Traffic", time: 3.1 },
  ],
  "Jan Marg": [
    { service: "Fire", time: 7.8 },
    { service: "Police", time: 5.9 },
    { service: "Ambulance", time: 11.2 },
    { service: "Traffic", time: 4.5 },
  ],
  "Vikas Marg": [
    { service: "Fire", time: 9.2 },
    { service: "Police", time: 6.8 },
    { service: "Ambulance", time: 13.5 },
    { service: "Traffic", time: 5.2 },
  ],
  "Sector 17 Market Road": [
    { service: "Fire", time: 4.8 },
    { service: "Police", time: 3.9 },
    { service: "Ambulance", time: 7.2 },
    { service: "Traffic", time: 2.8 },
  ],
};

// Incident data by location
const locationIncidentData = {
  "Madhya Marg": [
    { type: "Traffic", count: 45 },
    { type: "Medical", count: 23 },
    { type: "Fire", count: 8 },
    { type: "Crime", count: 12 },
    { type: "Other", count: 15 },
  ],
  "Dakshin Marg": [
    { type: "Traffic", count: 32 },
    { type: "Medical", count: 18 },
    { type: "Fire", count: 5 },
    { type: "Crime", count: 8 },
    { type: "Other", count: 12 },
  ],
  "Shanti Path": [
    { type: "Traffic", count: 18 },
    { type: "Medical", count: 12 },
    { type: "Fire", count: 3 },
    { type: "Crime", count: 4 },
    { type: "Other", count: 8 },
  ],
  "Jan Marg": [
    { type: "Traffic", count: 38 },
    { type: "Medical", count: 20 },
    { type: "Fire", count: 6 },
    { type: "Crime", count: 9 },
    { type: "Other", count: 13 },
  ],
  "Vikas Marg": [
    { type: "Traffic", count: 52 },
    { type: "Medical", count: 28 },
    { type: "Fire", count: 12 },
    { type: "Crime", count: 15 },
    { type: "Other", count: 18 },
  ],
  "Sector 17 Market Road": [
    { type: "Traffic", count: 15 },
    { type: "Medical", count: 8 },
    { type: "Fire", count: 2 },
    { type: "Crime", count: 3 },
    { type: "Other", count: 6 },
  ],
};

export function getLocationData(location: string): LocationData {
  const traffic = trafficData.find(t => t.location === location) || trafficData[0];
  
  return {
    location: location,
    trafficStatus: traffic.status,
    coordinates: traffic.coords,
    aqiData: locationAQIData[location as keyof typeof locationAQIData] || locationAQIData["Madhya Marg"],
    crowdData: locationCrowdData[location as keyof typeof locationCrowdData] || locationCrowdData["Madhya Marg"],
    noiseData: locationNoiseData[location as keyof typeof locationNoiseData] || locationNoiseData["Madhya Marg"],
    responseTimeData: locationResponseData[location as keyof typeof locationResponseData] || locationResponseData["Madhya Marg"],
    incidentData: locationIncidentData[location as keyof typeof locationIncidentData] || locationIncidentData["Madhya Marg"],
  };
}

export function generateLocationSystemPrompt(location: string): string {
  const data = getLocationData(location);
  
  // Calculate some insights
  const avgAQI = Math.round(data.aqiData.reduce((sum, item) => sum + item.aqi, 0) / data.aqiData.length);
  const peakCrowd = Math.max(...data.crowdData.map(item => item.count));
  const avgNoise = Math.round(data.noiseData.reduce((sum, item) => sum + item.level, 0) / data.noiseData.length);
  const totalIncidents = data.incidentData.reduce((sum, item) => sum + item.count, 0);
  const avgResponseTime = Math.round((data.responseTimeData.reduce((sum, item) => sum + item.time, 0) / data.responseTimeData.length) * 10) / 10;

  return `You are SCC (Smart City Copilot), an AI assistant by Team ChocoLava for IIT Ropar hackathon. You specialize in emergency services and smart city management.

CURRENT LOCATION: ${location}
REAL-TIME DATA:
📍 ${data.coordinates.lat}°N, ${data.coordinates.lng}°E
🚦 Traffic: ${data.trafficStatus}
🌬️ AQI: ${avgAQI} (${avgAQI > 150 ? 'Unhealthy' : avgAQI > 100 ? 'Moderate' : 'Good'})
👥 Peak Crowd: ${peakCrowd}
🔊 Noise: ${avgNoise} dB
🚨 Incidents: ${totalIncidents}/24h
⏱️ Response Time: ${avgResponseTime} min

RESPONSE GUIDELINES:
• Brief and to-the-point responses
• ALWAYS use tables for data comparisons, statistics, or lists with multiple attributes
• Present metrics, schedules, status reports as tables whenever possible
• Use bullet points for simple lists only
• Focus on actionable insights with data visualization
• Create tables for: traffic conditions, emergency response times, incident reports, AQI levels, crowd data, noise measurements
• Format tables properly with markdown syntax`;
}

export const availableLocations = [
  "Madhya Marg",
  "Dakshin Marg", 
  "Shanti Path",
  "Jan Marg",
  "Vikas Marg",
  "Sector 17 Market Road"
];