import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const MapView = () => {
  const [logoInTop, setLogoInTop] = useState(false);
 const [activeButton, setActiveButton] = useState(null);

  return (
    <div className="relative bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 overflow-hidden transition-all duration-700">
      {/* ✨ Subtle floating glow orbs background */}
      <motion.div
        className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80  rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌀 Animated Logo */}
      <AnimatePresence>
        {!logoInTop && (
          <motion.div
            key="logo-center"
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-20"
          >
            <motion.h1
              animate={{ rotate: logoInTop ? 360 : 0 }}
              transition={{ duration: 1 }}
              className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight"
            >
              SAFETY<span className="text-red-600">WATCH</span>
            </motion.h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Stay safe. Stay informed.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Fixed Logo (after button click) */}
      <AnimatePresence>
        {logoInTop && (
          <motion.div
            key="logo-top"
            initial={{ y: -80, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="text-2xl font-bold text-gray-800 dark:text-white"
            >
              SAFETY<span className="text-red-600">WATCH</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mt-28">
        {/* Buttons */}
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

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl h-[650px] flex items-center justify-center border border-gray-200/50 shadow-inner relative overflow-hidden"
        >
          {/* Shimmer Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0"
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Map Placeholder */}
          <div className="text-center text-gray-600 dark:text-gray-300 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <MapPin
                size={80}
                className="mx-auto mb-4 opacity-40 text-gray-500 drop-shadow-md"
              />
            </motion.div>
            <p className="text-2xl font-semibold mb-2 bg-gradient-to-r from-gray-500 to-gray-500 bg-clip-text text-transparent">
              Interactive Incident Map
            </p>
            <p className="text-sm mb-6 text-gray-500 dark:text-gray-400">
              View all reported incidents on an interactive map
            </p>

            {/* Legend */}
            <div className="flex gap-4 justify-center text-xs text-gray-600 dark:text-gray-400">
              {[
                { color: "bg-red-500", label: "High Priority" },
                { color: "bg-orange-500", label: "Medium Priority" },
                { color: "bg-yellow-500", label: "Low Priority" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 shadow-sm"
                >
                  <div className={`w-3 h-3 ${item.color} rounded-full shadow-md`} />
                  {item.label}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MapView;
