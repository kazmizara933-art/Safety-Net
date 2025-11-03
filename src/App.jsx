import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/profile/ProfilePage';
import ReportIncidentPage from './pages/incidents/ReportIncidentPage';
import IncidentDetailPage from './pages/incidents/IncidentDetailPage';
import IncidentsMapPage from './pages/incidents/IncidentsMapPage';
import IncidentsListPage from './pages/incidents/IncidentsListPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/global.css';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import MapView from './pages/MapView'
import MyReport from './pages/MyReport'
import Incidents from './pages/Incidents'





function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route  element={<Layout />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="map-view" element={<MapView />} />
                        <Route path="MyReport" element={<MyReport/>} />
                        <Route path="Incidents" element={<Incidents/>} />
            


            <Route path="report-incident" element={<ReportIncidentPage />} />
            <Route path="incidents/map" element={<IncidentsMapPage />} />
            <Route path="incidents/list" element={<IncidentsListPage />} />
            <Route path="incidents/:id" element={<IncidentDetailPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#1F2937',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;