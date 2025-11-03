 const Settings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" defaultValue="John Resident" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" defaultValue="john@email.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
                  <input type="text" defaultValue="Downtown District" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Make my profile public</span>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Allow others to contact me</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Receive promotional emails</span>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Change Password
              </button>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-gray-600 font-medium transition-colors">
                Save Changes
              </button>
              <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Account Stats</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Reports Submitted</p>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Member Since</p>
                <p className="text-lg font-medium text-gray-800">Jan 2024</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Community Level</p>
                <p className="text-lg font-medium text-blue-600">Trusted</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium">
                FAQ
              </button>
              <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </button>
              <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium">
                Privacy Policy
              </button>
              <button className="w-full text-left text-sm text-red-600 hover:text-red-700 font-medium  animate-pulse">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  export default Settings;