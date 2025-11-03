import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Webpack
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

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const IncidentMarker = ({ incident, onClick }) => {
  const markerRef = useRef();
  
  const handleClick = () => {
    if (onClick) {
      onClick(incident);
    }
  };

  const getMarkerColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'green';
      case 'in_progress':
        return 'blue';
      case 'closed':
        return 'gray';
      case 'reported':
      default:
        return 'red';
    }
  };

  // Create a custom icon with different colors based on status
  const markerIcon = L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${getMarkerColor(incident.status)}; 
                  width: 20px; 
                  height: 20px; 
                  border-radius: 50%; 
                  border: 2px solid white;
                  box-shadow: 0 0 5px rgba(0,0,0,0.3);
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: 10px;">
              <span>${incident.id}</span>
            </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });

  return (
    <Marker
      position={[incident.latitude, incident.longitude]}
      icon={markerIcon}
      eventHandlers={{
        click: handleClick
      }}
      ref={markerRef}
    >
      <Popup>
        <div className="text-sm">
          <h3 className="font-medium text-gray-900 dark:text-white">{incident.type}</h3>
          <p className="text-gray-600 dark:text-gray-300">{incident.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {incident.timeAgo} • {incident.status}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

const MapComponent = ({
  center = [51.505, -0.09],
  zoom = 13,
  incidents = [],
  onIncidentClick,
  className = 'h-96 w-full',
  ...props
}) => {
  // Check if we're in a browser environment (needed for SSR)
  if (typeof window === 'undefined') {
    return <div className={className} style={{ backgroundColor: '#e5e7eb' }} />;
  }

  return (
    <div className={`rounded-lg overflow-hidden ${className}`} {...props}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        className="z-0"
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {incidents.map((incident) => (
          <IncidentMarker 
            key={incident.id} 
            incident={incident} 
            onClick={onIncidentClick} 
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
