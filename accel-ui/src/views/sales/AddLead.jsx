import { useState } from "react";
import { toast } from "react-toastify";
import { leadSources, leadStatuses } from "../../constants/constants";
import { axiosInstance } from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";

function AddLead() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [leadInfo, setLeadInfo] = useState({
    name: "",
    companyName: "",
    email: "",
    leadSource: "",
    status: "",
    phoneNumber: "",
    estDealValue: 0,
  });

  async function handleAddLead(e) {
    e.preventDefault();

    if (leadInfo.estDealValue <= 0) {
      toast("Enter a proper Deal Value");
      return;
    }

    if (!leadInfo.leadSource) {
      toast("Please select a Source");
      return;
    }

    if (!leadInfo.status) {
      toast("Please select a Status");
      return;
    }

    try {
      const api = axiosInstance(accessToken);
      const res = await api.post("/v1/leads", leadInfo);

      if (res.status === 201) {
        toast("Lead Added successfully");
        setLeadInfo((curr) => ({
          ...curr,
          name: "",
          companyName: "",
          email: "",
          leadSource: "",
          status: "",
          phoneNumber: "",
          estDealValue: 0,
        }));
        navigate(-1);
      }

      if (res.status === 401) {
        toast("Session Expired");
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8 bg-white rounded-lg border border-gray-200">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Add New Lead</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter the details of the client below.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleAddLead}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={leadInfo.name}
              onChange={(e) =>
                setLeadInfo((l) => ({ ...l, name: e.target.value }))
              }
              placeholder="e.g. Jane Doe"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              value={leadInfo.companyName}
              onChange={(e) =>
                setLeadInfo((l) => ({ ...l, companyName: e.target.value }))
              }
              placeholder="e.g. Acme Corp"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={leadInfo.email}
              onChange={(e) =>
                setLeadInfo((l) => ({ ...l, email: e.target.value }))
              }
              placeholder="jane@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              required
              value={leadInfo.phoneNumber}
              onChange={(e) =>
                setLeadInfo((l) => ({ ...l, phoneNumber: e.target.value }))
              }
              placeholder="07X XXXX XXX"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="leadSource"
              className="block text-sm font-medium text-gray-700"
            >
              Lead Source <span className="text-red-500">*</span>
            </label>
            <select
              id="leadSource"
              required
              value={leadInfo.leadSource}
              onChange={(e) =>
                setLeadInfo((l) => ({ ...l, leadSource: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm transition-colors"
            >
              <option value="" disabled>
                Select a Source
              </option>
              {leadSources.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              required
              value={leadInfo.status}
              onChange={(e) =>
                setLeadInfo((l) => ({ ...l, status: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm transition-colors"
            >
              <option value="" disabled>
                Select a Status
              </option>
              {leadStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="estValue"
              className="block text-sm font-medium text-gray-700"
            >
              Estimated Deal Value (LKR)
            </label>
            <div className="relative mt-1 rounded-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">Rs.</span>
              </div>
              <input
                id="estValue"
                type="number"
                value={leadInfo.estDealValue || ""}
                placeholder="100,000"
                onChange={(e) =>
                  setLeadInfo((l) => ({
                    ...l,
                    estDealValue: Number(e.target.value),
                  }))
                }
                className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Link
            to={-1}
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
          >
            Save Lead
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLead;
