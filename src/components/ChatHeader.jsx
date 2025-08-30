import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Phone, Video, MoreVertical } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="bg-base-100 border-b border-base-300 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full object-cover border-2 border-base-300"
            />
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>
            )}
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-base">{selectedUser.fullName}</h3>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-base-content/30'}`}></div>
              <span className="text-sm text-base-content/60">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-base-200 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-base-200 transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-base-200 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;