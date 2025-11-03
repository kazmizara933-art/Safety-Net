// Mock data for demonstration
const mockIncidents = [
  {
    id: 1,
    type: 'Suspicious Activity',
    title: 'Suspicious person near the park',
    description: 'Noticed someone acting suspiciously near the playground area.',
    status: 'active',
    latitude: 51.505,
    longitude: -0.09,
    timeAgo: '2 hours ago',
    time: '8:30 PM',
    datetime: '2025-10-16T20:30:00',
    reportedBy: 'user1'
  },
  {
    id: 2,
    type: 'Broken Street Light',
    title: 'Street light out on Main St',
    description: 'The street light has been out for several days now.',
    status: 'in_progress',
    latitude: 51.51,
    longitude: -0.1,
    timeAgo: '1 day ago',
    time: '6:45 PM',
    datetime: '2025-10-15T18:45:00',
    reportedBy: 'user2'
  },
  {
    id: 3,
    type: 'Graffiti',
    title: 'Vandalism at the bus stop',
    description: 'Graffiti on the back wall of the bus shelter.',
    status: 'resolved',
    latitude: 51.5,
    longitude: -0.08,
    timeAgo: '3 days ago',
    time: '11:15 AM',
    datetime: '2025-10-14T11:15:00',
    reportedBy: 'user3'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get dashboard statistics
export const getDashboardStats = async () => {
  await delay(500); // Simulate network delay
  
  return {
    totalIncidents: mockIncidents.length,
    resolvedIncidents: mockIncidents.filter(i => i.status === 'resolved').length,
    activeIncidents: mockIncidents.filter(i => i.status === 'active').length,
    avgResponseTime: 45, // minutes
    incidentTrend: 12, // percentage
    resolutionTrend: 8, // percentage
    activeTrend: 5, // percentage
    responseTrend: -3, // percentage
  };
};

// Get recent incidents
export const getRecentIncidents = async (limit = 5) => {
  await delay(300); // Simulate network delay
  
  // Sort by most recent first
  const sorted = [...mockIncidents].sort(
    (a, b) => new Date(b.datetime) - new Date(a.datetime)
  );
  
  return limit ? sorted.slice(0, limit) : sorted;
};

// Get incident by ID
export const getIncidentById = async (id) => {
  await delay(200);
  return mockIncidents.find(incident => incident.id === parseInt(id));
};

// Report a new incident
export const reportIncident = async (incidentData) => {
  await delay(500);
  
  const newIncident = {
    id: Math.max(...mockIncidents.map(i => i.id), 0) + 1,
    ...incidentData,
    status: 'reported',
    timeAgo: 'Just now',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    datetime: new Date().toISOString(),
  };
  
  mockIncidents.unshift(newIncident);
  return newIncident;
};

// Update incident status
export const updateIncidentStatus = async (id, status) => {
  await delay(300); // Simulate network delay
  
  const incidentIndex = mockIncidents.findIndex(incident => incident.id === parseInt(id));
  
  if (incidentIndex !== -1) {
    mockIncidents[incidentIndex] = {
      ...mockIncidents[incidentIndex],
      status,
      // Update the last updated time
      timeAgo: 'Just now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      datetime: new Date().toISOString()
    };
    return { success: true, incident: mockIncidents[incidentIndex] };
  }
  
  throw new Error('Incident not found');
};
