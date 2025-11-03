import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import spider from "../../assets/spider.jpg";
import {
  Clock,
  Package,
  MapPin,
  ShieldCheck,
  Users,
  PlusCircle,
  AlertTriangle,
} from "lucide-react";
import IncidentRow from "../../components/IncidentRow";

const DashboardPage = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("overview");
  const [selectedIncident, setSelectedIncident] = useState(null);

  const incidents = [];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-700">
      
      {/* Animated Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
        }}
        className="relative rounded-xl p-6 text-white shadow-2xl overflow-hidden border border-white/10 backdrop-blur-md"
      >
        {/* Background Image */}
        <motion.img
          src={spider}
          alt="Safety background"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover grayscale-[30%] brightness-[75%]"
        />

        {/* Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-black/60 to-gray-900/60"
        />
         <div className="absolute inset-0 rounded-2xl border-[1px] border-transparent bg-gradient-to-r from-red-500/60 via-pink-500/40 to-blue-500/40 animate-gradient-border"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/50 to-red-900/60"></div>

        {/* Foreground Content */}
        <div className="relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold mb-2 drop-shadow-lg"
          >
            Welcome to SafetyWatch
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-blue-100 mb-4"
          >
            Your neighborhood safety companion. Report incidents, stay informed,
            and help keep your community safe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-3"
          >
            <button
              onClick={() => setShowReportModal(true)}
              className="px-5 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 font-semibold transition-all duration-300 hover:scale-105"
            >
              Report Incident
            </button>
            <button
              onClick={() => setCurrentPage("map")}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-105"
            >
              View Map
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            title: "Active Incidents",
            icon: <AlertTriangle className="text-red-500" size={22} />,
            value: "12",
            desc: "In your area (5km radius)",
            border: "border-red-500",
            glow: "shadow-red-200/50",
          },
          {
            title: "This Week",
            icon: <Clock className="text-orange-500" size={22} />,
            value: "8",
            desc: "New reports filed",
            border: "border-orange-500",
            glow: "shadow-orange-200/50",
          },
          {
            title: "Resolved",
            icon: <Package className="text-green-500" size={22} />,
            value: "156",
            desc: "Total cases closed",
            border: "border-green-500",
            glow: "shadow-green-200/50",
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`bg-white rounded-lg shadow-sm hover:shadow-lg hover:${card.glow} p-5 border-l-4 ${card.border} transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-600">
                {card.title}
              </h4>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Incidents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Incidents Near You
          </h3>
          <button
            onClick={() => setCurrentPage("incidents")}
            className="text-red-600 text-sm hover:text-blue-700 font-medium animate-pulse"
          >
            View All →
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {incidents.slice(0, 4).map((incident) => (
            <IncidentRow
              key={incident.id}
              incident={incident}
              onClick={() => setSelectedIncident(incident)}
            />
          ))}
          {incidents.length === 0 && (
            <div className="p-6 text-center text-gray-500 animate-pulse">
              No recent incidents to display
            </div>
          )}
        </div>
      </motion.div>

      {/* Heatmap Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Incident Heatmap
        </h3>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-80 flex items-center justify-center border border-gray-200 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-red-50 via-transparent to-blue-50 opacity-40"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="text-center text-gray-600 relative z-10">
            <MapPin size={64} className="mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">Interactive Map View</p>
            <p className="text-sm mt-2">View incidents on an interactive map</p>
           <button
              onClick={() => setCurrentPage("map")}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Open Map
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-all duration-300">
            <ShieldCheck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              Safety Reports
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              View and generate safety reports for your area.
            </p>
              <button
              onClick={() => setCurrentPage("map")}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
            Generate Report
            </button>
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-all duration-300"
          >
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Quick Actions
              </h3>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                {
                  title: "Report an Incident",
                  color: "blue",
                  icon: <PlusCircle size={20} />,
                  desc: "Quickly report a safety concern in your area.",
                  link: "/report-incident",
                  text: "Report now →",
                },
                {
                  title: "Invite Neighbors",
                  color: "green",
                  icon: <Users size={20} />,
                  desc: "Make your neighborhood safer by inviting neighbors.",
                  button: "Invite now →",
                },
                {
                  title: "Safety Tips",
                  color: "purple",
                  icon: <ShieldCheck size={20} />,
                  desc: "Learn how to stay safe in your community.",
                  link: "/safety-tips",
                  text: "View tips →",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start group">
                  <div
                    className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-${item.color}-100 text-${item.color}-600 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                    {item.link ? (
                      <Link
                        to={item.link}
                        className={`mt-2 inline-flex text-sm font-medium text-${item.color}-600 hover:text-${item.color}-500 transition-all`}
                      >
                        {item.text}
                      </Link>
                    ) : (
                      <button
                        className={`mt-2 inline-flex text-sm font-medium text-${item.color}-600 hover:text-${item.color}-500`}
                      >
                        {item.button}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-all duration-300"
          >
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Alerts
              </h3>
            </div>
            <div className="px-6 py-4">
              {incidents.length > 0 ? (
                <ul className="space-y-4">
                  {incidents.slice(0, 3).map((alert) => (
                    <li
                      key={alert.id}
                      className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {alert.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {alert.description}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {alert.timeAgo}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 ">
                  No recent alerts available.
                </p>
              )}
              <div className="mt-4 text-center">
                <Link
                  to="/alerts"
                  className="text-sm font-medium text-red-600 hover:text-black-500  animate-pulse "
                >
                  View all alerts
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
