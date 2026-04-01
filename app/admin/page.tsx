import { Crown } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0e1f3e]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Welcome to the Dashboard!
          </h1>
          <p className="text-gray-500 mt-2">
            You are successfully authenticated. Please contact the developer to hook up the management features.
          </p>
        </div>
        <div className="hidden sm:flex w-16 h-16 rounded-full bg-[#fcf8f8] items-center justify-center border-2 border-[#ca3433]/20">
          <Crown className="w-8 h-8 text-[#ca3433]" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-bold text-gray-400">Inquiries</h3>
          <p className="text-sm text-gray-400 mt-2">Data visualization pending setup</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-bold text-gray-400">Course Metrics</h3>
          <p className="text-sm text-gray-400 mt-2">Data visualization pending setup</p>
        </div>
      </div>
    </div>
  );
}
