import { MapPin, Clock } from 'lucide-react';

const getIncidentIcon = (type) => {
  // Return null to hide the icon container
  return null;
};

const getStatusColor = (status) => {
  const colors = {
    reported: 'bg-blue-100 text-blue-800',
    investigating: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  };
  return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

const IncidentRow = ({ incident, detailed = false, onClick }) => {
  const severityColors = {
    high: 'bg-red-500',
    medium: 'bg-orange-500',
    low: 'bg-yellow-500',
  };

  if (!incident) return null;

  return (
    <div
      onClick={onClick}
      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          {getIncidentIcon(incident.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h4 className="font-medium text-gray-800 truncate">{incident.title}</h4>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {incident.location || 'Location not specified'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {incident.time || 'Time not specified'}
                </span>
                {incident.distance && (
                  <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {incident.distance} away
                  </span>
                )}
                {detailed && (
                  <span className="text-xs">Reporter: Verified</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              {incident.severity && (
                <div 
                  className={`w-2.5 h-2.5 rounded-full ${severityColors[incident.severity] || 'bg-gray-300'}`}
                />
              )}
              {incident.status && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(incident.status)}`}>
                  {incident.status}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentRow;