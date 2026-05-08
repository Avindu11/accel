import { Pen, Trash } from "lucide-react";
import { Link } from "react-router";

function NoteItem({ item, onDelete }) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg bg-gray-50 mb-5">
      <div className="flex justify-between items-start mb-2">
        <label className="text-sm font-semibold text-gray-700">Note:</label>
        <div className="flex gap-2">
          <Link
            to={`/sales/edit-note/${item.lead_notes.id}`}
            className="text-blue-500 hover:text-blue-700 p-1"
            title="Edit"
          >
            <Pen size={16} />
          </Link>
          <button
            onClick={() => onDelete(item.lead_notes.id)}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      <textarea
        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-orange-500"
        rows="3"
        disabled
        defaultValue={item.lead_notes.content}
      ></textarea>

      <p className="text-xs text-gray-500 mt-2">
        Added By:{" "}
        <span className="font-medium text-gray-800">
          {item.users.firstName} {item.users.lastName}
        </span>
      </p>

      <p className="text-xs text-gray-500 mt-2">
        Added at:{" "}
        <span className="font-medium text-gray-800">
          { new Date(item.lead_notes.createdDate).toLocaleString() }
        </span>
      </p>
    </div>
  );
}

export default NoteItem;
