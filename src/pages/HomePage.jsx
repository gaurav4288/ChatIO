import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-base-100 to-base-200">
      <div className="h-full max-w-7xl mx-auto">
        <div className="flex h-full bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;