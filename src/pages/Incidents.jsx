"use client";
import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import IncidentRow from "../components/IncidentRow";
import IncidentDetailModal from "../components/IncidentDetailModal";

// ==================== Scroll Animation Helper ====================

const incidentIcons = [
  ["🔒", 340, 10],
  ["❓", 20, 40],
  ["🔍", 60, 90],
];

function hue(h) {
  return `hsl(${h}, 100%, 50%)`;
}

function Card({ emoji, hueA, hueB, i }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;
  return (
    <motion.div
      key={i}
      className="relative mx-2"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
      variants={{
        offscreen: { y: 20, opacity: 0 },
        onscreen: {
          y: 0,
          opacity: 1,
          transition: { type: "spring", bounce: 0.4, duration: 0.6 },
        },
      }}
    >
      <div
        className="absolute inset-0 rounded-xl blur-md opacity-60"
        style={{ background }}
      />
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative z-10 w-12 h-12 flex items-center justify-center bg-white/80 rounded-xl shadow-lg border border-white/30 backdrop-blur-md cursor-pointer"
      >
        <span className="text-lg">{emoji}</span>
      </motion.div>
    </motion.div>
  );
}

function ScrollTriggeredMini() {
  return (
    <div className="flex justify-center items-center py-3 px-2 bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-xl mx-4 my-3 border border-gray-200/30">
      {incidentIcons.map(([emoji, hueA, hueB], i) => (
        <Card key={i} emoji={emoji} hueA={hueA} hueB={hueB} i={i} />
      ))}
    </div>
  );
}

// ==================== Sample Data ====================

const incidents = [
  {
    id: 1,
    type: "theft",
    title: "Bicycle Stolen",
    location: "Main Street & 5th Ave",
    distance: "0.5 km",
    time: "2 hours ago",
    status: "new",
    severity: "high",
    description: "Red mountain bike stolen from apartment complex.",
  },
  {
    id: 2,
    type: "suspicious",
    title: "Suspicious Vehicle",
    location: "Park Avenue",
    distance: "1.2 km",
    time: "5 hours ago",
    status: "investigating",
    severity: "medium",
    description: "White van circling the neighborhood multiple times.",
  },
  {
    id: 3,
    type: "lost",
    title: "Lost Dog - Golden Retriever",
    location: "Central Park",
    distance: "2.1 km",
    time: "1 day ago",
    status: "resolved",
    severity: "low",
    description: "Friendly golden retriever, answers to Max. Has blue collar.",
  },
  {
    id: 4,
    type: "vandalism",
    title: "Graffiti on Building",
    location: "8th Street",
    distance: "0.8 km",
    time: "3 hours ago",
    status: "new",
    severity: "medium",
    description: "Multiple graffiti tags on commercial building wall.",
  },
];

// ==================== MAIN PAGE ====================

const Incidents = () => {
  const [filterType, setFilterType] = useState("all");
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const filteredIncidents = incidents.filter((inc) => {
    const matchType = filterType === "all" || inc.type === filterType;
    const matchSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="relative space-y-10 p-6 min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">
      {/* ✨ Floating Animated Logo (MapPin) */}
      <motion.div
        layout
        animate={{
          y: activeButton ? -220 : 0,
          scale: activeButton ? 0.8 : 1.2,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="flex justify-center mt-4"
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-pink-500/20 blur-3xl rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <MapPin size={80} className="relative text-pink-600 drop-shadow-lg" />
        </div>
      </motion.div>

      {/* 🔍 Search and Filter */}
      <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 p-5">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex-1 min-w-64 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by keyword or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300/50 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 bg-white/50 dark:bg-gray-900/50"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-800/60 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Types</option>
            <option value="theft">🚨 Theft</option>
            <option value="suspicious">👁️ Suspicious</option>
            <option value="lost">📦 Lost Items</option>
            <option value="vandalism">🎨 Vandalism</option>
          </select>
        </div>
      </div>

      {/* 🔘 Filter Buttons + Animated Map Section */}
      <div className="relative bg-white/80 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20 overflow-hidden transition-all">
        <motion.div
          className="absolute -top-10 -left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {["All Incidents", "🚨 Theft", "👁️ Suspicious", "📦 Lost", "🎨 Vandalism"].map(
              (label, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveButton(label)}
                  className={`px-5 py-2.5 rounded-xl text-black font-medium shadow-md border border-white/10 backdrop-blur-md transition-all duration-300 ${
                    activeButton === label
                      ? "bg-gradient-to-r from-pink-600 to-red-500 shadow-pink-500/30"
                      : "bg-gradient-to-r from-gray-400/20 to-gray-700/30"
                  }`}
                >
                  {label}
                </motion.button>
              )
            )}
          </div>

          {/* 🗺️ Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="h-[600px] rounded-2xl border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800"
          >
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
              Interactive Incident Map
            </p>
          </motion.div>
        </div>
      </div>

      {/* 📋 Incident List */}
      <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-gray-200/40">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold">{filteredIncidents.length}</span> incidents
          </p>
        </div>

        <div className="divide-y divide-gray-200/40">
          {filteredIncidents.map((incident) => (
            <React.Fragment key={incident.id}>
              <IncidentRow
                incident={incident}
                onClick={() => setSelectedIncident(incident)}
              />
              <ScrollTriggeredMini />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 🪟 Modal */}
      <AnimatePresence>
        {selectedIncident && (
          <IncidentDetailModal
            incident={selectedIncident}
            onClose={() => setSelectedIncident(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Incidents;
