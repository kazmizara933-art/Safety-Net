import { Link } from 'react-router-dom';
import { 
  ExclamationTriangleIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const statusIcons = {
  reported: ExclamationTriangleIcon,
  in_progress: ArrowPathIcon,
  resolved: CheckCircleIcon,
  closed: XCircleIcon
};

const statusColors = {
  reported: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  reported: 'Reported',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed'
};

const IncidentList = ({ 
  incidents = [], 
  onIncidentClick,
  showActions = false,
  className = '' 
}) => {
  if (incidents.length === 0) {
    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No incidents found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          There are no incidents to display at this time.
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-lg ${className}`}>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {incidents.map((incident) => {
          const StatusIcon = statusIcons[incident.status] || ExclamationTriangleIcon;
          
          return (
            <li key={incident.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-full p-1 ${statusColors[incident.status] || 'bg-gray-100 text-gray-800'}`}>
                      <StatusIcon className="h-4 w-4" />
                    </div>
                    <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      {incident.type}
                    </p>
                    <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-300">
                      {statusLabels[incident.status] || incident.status}
                    </span>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {incident.timeAgo}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {incident.location || 'Location not specified'}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>{incident.time}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {incident.description}
                </p>
                
                {showActions && (
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => onIncidentClick && onIncidentClick(incident)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IncidentList;
