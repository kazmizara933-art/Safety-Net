import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx';
import { AlertCircle, MapPin, ArrowRight, Plus, Filter, Search } from 'lucide-react';

const IncidentCard = ({ incident, onClick }) => {
  const getSeverityVariant = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low':
      default: return 'secondary';
    }
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'reported': return 'outline';
      case 'in_progress': return 'secondary';
      case 'resolved': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{incident.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {incident.location?.address || 'Location not specified'}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge variant={getSeverityVariant(incident.severity)} className="capitalize">
              {incident.severity}
            </Badge>
            <Badge variant={getStatusVariant(incident.status)} className="capitalize">
              {incident.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {incident.description}
        </p>
        <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
          <span>Reported {formatDistanceToNow(new Date(incident.reportedAt), { addSuffix: true })}</span>
          <span className="mx-2">•</span>
          <span>By {incident.reporter || 'Anonymous'}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
          View details <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const IncidentsListPage = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    severity: '',
    type: ''
  });

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
            description: 'Severe flooding reported in the downtown area. Multiple roads are blocked and several buildings have water damage.',
            location: {
              latitude: 24.8607,
              longitude: 67.0011,
              address: 'Downtown, Karachi'
            },
            type: 'flood',
            severity: 'high',
            status: 'reported',
            reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            reporter: 'John D.'
          },
          {
            id: '2',
            title: 'Earthquake Tremors Felt',
            description: 'Moderate earthquake tremors felt across the city. No immediate damage reported.',
            location: {
              latitude: 24.8934,
              longitude: 67.0281,
              address: 'North Karachi'
            },
            type: 'earthquake',
            severity: 'medium',
            status: 'in_progress',
            reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
            reporter: 'Sarah K.'
          },
          {
            id: '3',
            title: 'Building Fire - Under Control',
            description: 'Fire reported in a commercial building. Firefighters on scene and have controlled the situation.',
            location: {
              latitude: 24.8419,
              longitude: 67.0169,
              address: 'Saddar, Karachi'
            },
            type: 'fire',
            severity: 'high',
            status: 'resolved',
            reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            reporter: 'Ali R.'
          }
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

  const handleIncidentClick = (incidentId) => {
    navigate(`/incidents/${incidentId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = Object.entries(filters).every(([key, value]) => 
      !value || (incident[key] && incident[key].toLowerCase() === value.toLowerCase())
    );
    return matchesSearch && matchesFilters;
  });

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reported Incidents</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {filteredIncidents.length} {filteredIncidents.length === 1 ? 'incident' : 'incidents'} found
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => navigate('/report-incident')}
            className="w-full md:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Report New Incident
          </Button>
        </div>
      </div>

      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search incidents..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">All Statuses</option>
              <option value="reported">Reported</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              value={filters.severity}
              onChange={(e) => setFilters({...filters, severity: e.target.value})}
            >
              <option value="">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Button type="submit" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {filteredIncidents.length > 0 ? (
          filteredIncidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onClick={() => handleIncidentClick(incident.id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No incidents found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchQuery || Object.values(filters).some(Boolean) 
                ? 'Try adjusting your search or filter criteria.'
                : 'No incidents have been reported yet.'}
            </p>
            <div className="mt-6">
              <Button onClick={() => {
                setSearchQuery('');
                setFilters({ status: '', severity: '', type: '' });
              }}>
                Clear filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentsListPage;
