import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button.jsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx';
import { AlertCircle, MapPin, AlertTriangle } from 'lucide-react';

// Fix for default marker icons in Leaflet with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ incidents, onViewDetails }) => {
  const map = useMap();
  
  // Fit map to bounds of all incidents
  useEffect(() => {
    if (incidents.length > 0) {
      const bounds = L.latLngBounds(
        incidents.map(incident => [incident.location.latitude, incident.location.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      // Default to a reasonable view if no incidents
      map.setView([0, 0], 2);
    }
  }, [incidents, map]);

  return (
    <>
      {incidents.map((incident) => (
        <Marker 
          key={incident.id}
          position={[incident.location.latitude, incident.location.longitude]}
          icon={L.divIcon({
            html: `<div class="relative">
                    <div class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  </div>`,
            className: 'bg-transparent border-none',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          })}
        >
          <Popup>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{incident.title}</h3>
              <p className="text-sm text-gray-600">{incident.description}</p>
              <p className="text-xs text-gray-500">
                {new Date(incident.reportedAt).toLocaleString()}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2"
                onClick={() => onViewDetails(incident.id)}
              >
                View Details
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const IncidentsMapPage = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call to fetch incidents
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call
        const mockIncidents = [
          {
            id: '1',
            title: 'Flood in Downtown',
            description: 'Severe flooding reported in the downtown area.',
            location: {
              latitude: 24.8607,
              longitude: 67.0011,
              address: 'Downtown, Karachi'
            },
            type: 'flood',
            severity: 'high',
            status: 'reported',
            reportedAt: new Date().toISOString(),
            reporter: 'Anonymous'
          },
          // Add more mock incidents as needed
        ];
        
        setIncidents(mockIncidents);
        setError(null);
      } catch (err) {
        console.error('Error fetching incidents:', err);
        setError('Failed to load incidents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleViewDetails = (incidentId) => {
    navigate(`/incidents/${incidentId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Incidents Map</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/incidents/list')}
          >
            List View
          </Button>
          <Button 
            onClick={() => navigate('/report-incident')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Report Incident
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="h-[600px] w-full">
          <MapContainer 
            center={[24.8607, 67.0011]} // Default to Karachi
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapView 
              incidents={incidents} 
              onViewDetails={handleViewDetails} 
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default IncidentsMapPage;
