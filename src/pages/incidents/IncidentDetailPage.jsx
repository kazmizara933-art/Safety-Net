import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  ShieldCheckIcon,
  PencilIcon,
  TrashIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { getIncidentById, updateIncidentStatus } from '../../services/incidentService';
import MapComponent from '../../components/map/MapComponent';

const statusOptions = [
  { value: 'reported', label: 'Reported', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' }
];

const IncidentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('reported');

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const data = await getIncidentById(id);
        setIncident(data);
        setStatus(data.status);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching incident:', err);
        setError('Failed to load incident details');
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setStatus(newStatus);
      // In a real app, you would make an API call to update the status
      await updateIncidentStatus(id, newStatus);
      setIncident(prev => ({
        ...prev,
        status: newStatus
      }));
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    }
  };

  const handleDelete = () => {
    // In a real app, you would show a confirmation dialog first
    // and then make an API call to delete the incident
    console.log('Delete incident:', id);
    // Then navigate back to the incidents list
    navigate('/incidents/list');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              {error || 'Incident not found'}
            </h3>
            <div className="mt-2">
              <button
                onClick={() => navigate(-1)}
                className="text-sm font-medium text-red-700 dark:text-red-300 hover:text-red-600 dark:hover:text-red-200"
              >
                &larr; Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = statusOptions.find(s => s.value === incident.status) || statusOptions[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Incidents
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        {/* Header */}
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                {incident.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Incident ID: {incident.id}
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <dl>
            {/* Status Update */}
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Update Status
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleStatusChange(option.value)}
                      disabled={incident.status === option.value}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        incident.status === option.value
                          ? option.color
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </dd>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Description
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {incident.description || 'No description provided.'}
              </dd>
            </div>

            {/* Location */}
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Location
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <div className="flex items-start">
                  <MapPinIcon className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <span>{incident.location?.address || 'Location not specified'}</span>
                </div>
                <div className="mt-4 h-64 rounded-lg overflow-hidden">
                  <MapComponent 
                    center={[incident.latitude, incident.longitude]} 
                    zoom={15}
                    incidents={[incident]}
                    className="h-full"
                  />
                </div>
              </dd>
            </div>

            {/* Date and Time */}
            <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Date & Time
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                  <span>
                    {new Date(incident.datetime).toLocaleString()} • {incident.timeAgo}
                  </span>
                </div>
              </dd>
            </div>

            {/* Reported By */}
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Reported By
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <UserIcon className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                  <span>{incident.reportedBy || 'Anonymous'}</span>
                </div>
              </dd>
            </div>

            {/* Attachments */}
            {incident.images && incident.images.length > 0 && (
              <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Attachments
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {incident.images.map((image, index) => (
                      <div key={index} className="group relative">
                        <img
                          src={image.url || URL.createObjectURL(image)}
                          alt={`Incident ${index + 1}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <a 
                            href={image.url || URL.createObjectURL(image)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6 flex justify-between">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PencilIcon className="-ml-1 mr-2 h-4 w-4" />
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="-ml-1 mr-2 h-4 w-4" />
              Delete
            </button>
          </div>
          <div>
            <Link
              to={`/incidents/${incident.id}/comments`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ChatBubbleLeftRightIcon className="-ml-1 mr-2 h-4 w-4" />
              View Comments (0)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailPage;
