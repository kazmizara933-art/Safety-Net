import { MapPin, Clock, AlertTriangle } from 'lucide-react';
import ReportModal from '../components/ReportModal';    
import React, { useState } from 'react';
const MyReport = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  
  const myReports = [
    { id: 1, type: 'theft', title: 'Bicycle Stolen', location: 'Main Street & 5th Ave', time: '2 hours ago', status: 'new', date: '2024-01-15' },
    { id: 2, type: 'lost', title: 'Lost Keys Near Park', location: 'Central Park', time: '1 day ago', status: 'resolved', date: '2024-01-14' },
  ];

  const getIncidentIcon = (type) => {
    // Add your icon mapping logic here
    return <span>{type === 'theft' ? '🔒' : '🔍'}</span>;
  };

  const getStatusColor = (status) => {
    // Add your status color mapping logic here
    return status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-red-800 animate-pulse">Your Incident Reports</h3>
          <p className="text-sm text-gray-600 mt-1">Track reports you've submitted</p>
        </div>
        <div className="divide-y divide-gray-200">
          {myReports.length > 0 ? (
            myReports.map(report => (
              <div key={report.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {getIncidentIcon(report.type)}
                      <div>
                        <h4 className="font-medium text-gray-800">{report.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {report.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {report.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                    {showReportModal && <ReportModal onClose={() => setShowReportModal(false)} />}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <AlertTriangle size={48} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No reports yet</p>
              <p className="text-sm mt-1">Reports you submit will appear here</p>
              <button 
                onClick={() => setShowReportModal(true)} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                File Your First Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReport;