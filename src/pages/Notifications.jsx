"use client"

import { useState, useRef } from 'react'
import { Bell } from 'lucide-react'
import { motion, useSpring, useScroll } from "framer-motion"

const Notifications = () => {
  const [notificationRadius, setNotificationRadius] = useState(5)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      text: 'New theft reported in your area',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'update',
      text: 'Your report has been resolved',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'info',
      text: 'Weekly safety tips are available',
      time: '3 days ago',
      read: true
    }
  ])

  // ✅ Create a ref for the Alert Radius section
  const alertSectionRef = useRef(null)

  // ✅ Track scroll only within that section
  const { scrollYProgress } = useScroll({
    target: alertSectionRef,
    offset: ["start start", "end end"]
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="space-y-6 pt-6 pb-16">
      {/* ✅ Alert Radius section with scroll tracking */}
      <div className="bg-white rounded-lg shadow-sm p-6 relative">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>

        {/* ✅ Scroll progress bar inside this card only */}
        <motion.div
          style={{
            scaleX,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            originX: 0,
            backgroundColor: "red",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        />

        <div ref={alertSectionRef} className="max-h-[180px] overflow-y-auto pr-2 space-y-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Radius</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={notificationRadius}
                onChange={(e) => setNotificationRadius(e.target.value)}
                className="flex-1 accent-red-500"
              />
              <span className="text-sm font-medium text-gray-700 w-16">{notificationRadius} km</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              You'll receive notifications for incidents within this radius
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Theft alerts</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Suspicious activity alerts</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Lost item notifications</span>
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Other section remains normal */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Notifications</h3>
        </div>
        <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
          {notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`p-4 hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  notif.type === 'alert' 
                    ? 'bg-red-100' 
                    : notif.type === 'update' 
                      ? 'bg-blue-100' 
                      : 'bg-gray-100'
                }`}>
                  <Bell 
                    size={16} 
                    className={
                      notif.type === 'alert' 
                        ? 'text-red-600' 
                        : notif.type === 'update' 
                          ? 'text-blue-600' 
                          : 'text-gray-600'
                    } 
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notif.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
                {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notifications
