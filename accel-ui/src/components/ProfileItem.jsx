import { useAuth } from "../context/AuthContext";

function ProfileItem() {
    
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
        {user?.user?.firstName[0]}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {user?.user?.firstName} {user?.user?.lastName}
        </span>
        <span className="text-xs text-gray-500">{user?.user?.email}</span>
      </div>
    </div>
  );
}

export default ProfileItem;
