import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, Filter } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => !searchQuery || user.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((user) => !showOnlineOnly || onlineUsers.includes(user._id));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="w-full md:w-80 lg:w-96 border-r border-base-300 flex flex-col bg-base-50">
      {/* Header */}
      <div className="p-4 border-b border-base-300 bg-base-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Contacts</h2>
          </div>
          <div className="text-sm text-base-content/60">
            {onlineUsers.length - 1} online
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-base-content/40" />
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span>Show online only</span>
          </label>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Users className="w-12 h-12 text-base-content/30 mb-4" />
            <p className="text-base-content/60 mb-2">
              {searchQuery ? "No contacts found" : "No contacts available"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-primary hover:underline text-sm"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="p-2">
            {filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`
                  w-full p-3 flex items-center gap-3 rounded-xl transition-all duration-200
                  hover:bg-base-200 active:scale-95
                  ${selectedUser?._id === user._id 
                    ? "bg-primary/10 border border-primary/20" 
                    : "hover:bg-base-200"
                  }
                `}
              >
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-base-300"
                  />
                  {onlineUsers.includes(user._id) && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-base-content/60 flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${onlineUsers.includes(user._id) ? 'bg-success' : 'bg-base-content/30'}`}></div>
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;