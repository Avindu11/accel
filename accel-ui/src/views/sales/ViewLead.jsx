import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { leadSources, leadStatuses } from "../../constants/constants";
import { ArrowLeft, Pen, Trash } from "lucide-react";
import NoteItem from "../../components/NoteItem";

function ViewLead() {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    companyName: "",
    email: "",
    estDealValue: "",
    leadSource: "",
    name: "",
    phoneNumber: "",
    salesPersonId: 0,
    status: "",
  });

  const [leadNotes, setLeadNotes] = useState([]);

  async function fetchLead() {
    try {
      const api = axiosInstance(accessToken);
      const res = await api.get(`/v1/leads/${id}`);

      if (res.status === 200) {
        const { leads } = res.data;

        setLead((l) => ({
          ...l,
          companyName: leads.companyName ?? "",
          email: leads.email ?? "",
          estDealValue: leads.estDealValue ?? 0,
          leadSource: leads.leadSource ?? "",
          name: leads.name ?? "",
          phoneNumber: leads.phoneNumber ?? "",
          salesPersonId: leads.salesPersonId,
          status: leads.status ?? "",
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLeadNotes() {
    try {
      const api = axiosInstance(accessToken);
      const res = await api.get(`/v1/lead-notes/${id}`);

      console.log(res);

      if (res.status === 200) {
        setLeadNotes(() => res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLead();
    fetchLeadNotes();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8 bg-white rounded-lg border border-gray-200">
        <div className="mb-6 border-b border-gray-100 pb-4 flex gap-2 items-center">
          <Link to={-1}>
            <ArrowLeft />
          </Link>
          <h2 className="text-xl font-bold text-gray-900">Lead Info : #{id}</h2>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                value={lead.name}
                disabled
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
                value={lead.companyName}
                disabled
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
                value={lead.email}
                disabled
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
                value={lead.phoneNumber}
                disabled
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
                value={lead.leadSource}
                disabled
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
                value={lead.status}
                disabled
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
                  value={lead.estDealValue}
                  placeholder="100,000"
                  disabled
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm transition-colors"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="mx-auto mt-5 max-w-2xl p-4 sm:p-6 lg:p-8 bg-white rounded-lg border border-gray-200">
        <div className="mb-6 pb-4 flex gap-2 items-center">
          <h2 className="text-xl font-bold text-gray-900">Lead Notes</h2>
        </div>
        {
          leadNotes.map((leadNote) => (
            <NoteItem key={leadNote.lead_notes.id} item={leadNote} />
          ))
        }
      </div>
    </>
  );
}

export default ViewLead;
