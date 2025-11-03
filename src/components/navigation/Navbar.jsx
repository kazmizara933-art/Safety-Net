import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import ReportModal from '../ReportModal';

const Navbar = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                Safety <span className="text-red-600 font-bold text-xl tracking-tight animate-pulse">Net</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-600 text-white px-5 py-2.5 rounded-lg hover:from-gray-700 hover:to-gray-800 font-medium shadow-md transition-all"
              >
                <AlertTriangle size={18} />
                Report Incident
              </button>
            </div>
          </div>
        </div>
      </div>

      {isReportModalOpen && (
        <ReportModal onClose={() => setIsReportModalOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
