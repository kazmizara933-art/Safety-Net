
const IncidentDetailModal = ({ incident, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getIncidentIcon(incident.type)}
              <h2 className="text-2xl font-bold text-gray-800">{incident.title}</h2>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {incident.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {incident.time}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                {incident.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-700">{incident.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Location Map</h3>
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Interactive map showing incident location</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Directions
            </button>
            <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Share Incident
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default IncidentDetailModal;
