import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-4xl w-full text-center space-y-8">

        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Manage your leads. <br className="hidden sm:block" />
          <span className="text-orange-500">Close more deals.</span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          The all-in-one dashboard built for high-performing sales teams. Track your pipeline, manage client notes, and forecast revenue all in one place.
        </p>

        <div className="pt-6 pb-12">
          <Link
            to="/login"
            className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-orange-500 rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
          >
            Sign In to Dashboard
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-3 text-sm text-gray-400">
            Secure login for authorized personnel only.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;