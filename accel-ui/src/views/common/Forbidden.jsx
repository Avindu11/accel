import { Link, useNavigate } from "react-router";
import { Lock, ArrowLeft, Home } from "lucide-react";

function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <Lock className="w-16 h-16 text-red-500" strokeWidth={1.5} />
      </div>

      <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight mb-2">
        403
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Access Denied
      </h2>
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        You don't have permission to view this page or resource. Please check your credentials or contact your administrator if you believe this is an error.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
        <Link
          to="/" 
          className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Forbidden;