import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ExclamationTriangleIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { reportIncident } from '../../services/incidentService';

const ReportIncidentPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: ''
  });
  
  const [formData, setFormData] = useState({
    type: 'suspicious_activity',
    title: '',
    description: '',
    images: [],
    location: {
      latitude: 0,
      longitude: 0,
      address: ''
    },
    anonymous: false
  });

  // Rest of the component code remains the same...
  // [Previous JSX code here]
};

export default ReportIncidentPage;