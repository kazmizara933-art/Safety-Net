
import React, { useState } from 'react';
import { X, MapPin, Camera, Video, Mic, AlertTriangle } from 'lucide-react';



const ReportModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Report Incident</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type *</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>Select type...</option>
                <option>🚨 Theft</option>
                <option>👁️ Suspicious Activity</option>
                <option>📦 Lost Item</option>
                <option>🎨 Vandalism</option>
                <option>🚗 Vehicle Related</option>
                <option>🏠 Property Damage</option>
                <option>📱 Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input type="text" placeholder="Brief description of incident" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea rows={4} placeholder="Provide detailed information about what happened, when it occurred, and any other relevant details..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter address or intersection" className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
                  <MapPin size={18} />
                  Pin
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Or click the map to select location</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                <input type="time" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Media (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <div className="flex justify-center gap-6 mb-3">
                  <Camera className="text-gray-400" size={36} />
                  <Video className="text-gray-400" size={36} />
                  <Mic className="text-gray-400" size={36} />
                </div>
                <p className="text-sm text-gray-600 mb-2">Drag and drop files here</p>
                <p className="text-xs text-gray-500 mb-3">or</p>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Browse Files
                </button>
                <p className="text-xs text-gray-500 mt-3">Supported: Images, Videos, Audio (Max 50MB)</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-yellow-600 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Important</p>
                  <p className="text-xs text-yellow-700 mt-1">If this is an emergency, please call 911 immediately. This platform is for reporting and awareness only.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="anonymous" className="w-4 h-4 text-blue-600" />
                <label htmlFor="anonymous" className="text-sm text-gray-700">Report anonymously (your identity will not be shared)</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="updates" className="w-4 h-4 text-blue-600" defaultChecked />
                <label htmlFor="updates" className="text-sm text-gray-700">Send me updates about this incident</label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={() => alert ("Report submitted successfully!")} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm">
                Submit Report
              </button>
              <button onClick={onClose}  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  export default ReportModal;