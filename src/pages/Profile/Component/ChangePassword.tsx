function ChangePassword() {
  return (
           <div>
            <label className="block text-sm font-medium text-gray-600">
              Ener Email Address
            </label>
            <input
              type="text"
              name="text"
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
              placeholder="Enter Email Address"
            />
          </div>
  )
}

export default ChangePassword
