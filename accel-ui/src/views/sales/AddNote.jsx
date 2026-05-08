import { ArrowLeft, ClockFading, Save } from "lucide-react";
import { axiosInstance } from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function AddNote() {

  const { accessToken } = useAuth();
  const navigate = useNavigate()

  const [leads, setLeads] = useState([]);
  const [note, setNote] = useState({
    leadId: "",
    content: "",
  });

  async function fetchLeads() {
    try {
      const api = axiosInstance(accessToken);
      const res = await api.get("/v1/leads/sales-person");

      if (res.status === 200) {
        setLeads(() => res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddNote(e) {
    e.preventDefault();

    if (!note.leadId) {
      toast("Select a Lead");
      return;
    }

    if (!note.content.trim()) {
      toast("Note cannot be empty");
      return;
    }

    try {
      const api = axiosInstance(accessToken);
      const res = await api.post("/v1/lead-notes", note);

      if (res.status === 201) {
        toast("Note added successfully");
        setNote((n) => ({
          ...n,
          leadId: "",
          content: "",
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="mx-auto max-w-2xl p-6 bg-white rounded-xl shadow-sm border border-gray-200 mt-8">
      <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
        <button
          type="button"
          className="p-2 mr-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Add New Note</h2>
      </div>

      <form className="space-y-6" onSubmit={handleAddNote}>
        <div>
          <label
            htmlFor="lead"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Lead <span className="text-red-500">*</span>
          </label>
          <select
            name="lead"
            id="lead"
            value={note.leadId}
            required
            onChange={(e) => setNote((n) => ({ ...n, leadId: e.target.value }))}
            className="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow sm:text-sm"
          >
            <option value="" disabled>
              Choose a lead...
            </option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name} - {lead.companyName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Note Details <span className="text-red-500">*</span>
          </label>
          <textarea
            name="note"
            id="note"
            rows="5"
            required
            value={note.content}
            onChange={(e) =>
              setNote((n) => ({ ...n, content: e.target.value }))
            }
            placeholder="Type your note here..."
            className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow sm:text-sm resize-y"
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
          <button
            type="button"
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-5 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 transition-colors shadow-sm"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNote;
