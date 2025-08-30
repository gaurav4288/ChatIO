import { MessageCircle, Users } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-base-50 p-8">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
          <MessageCircle className="w-10 h-10 text-primary" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to ChatIO
        </h2>

        {/* Description */}
        <p className="text-base-content/70 mb-6 leading-relaxed">
          Select a contact from the sidebar to start chatting. 
          Your conversations will appear here once you begin messaging.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-base-content/60">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Real-time messaging</span>
          </div>
          <div className="flex items-center gap-2 text-base-content/60">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span>Media sharing</span>
          </div>
          <div className="flex items-center gap-2 text-base-content/60">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>Emoji support</span>
          </div>
          <div className="flex items-center gap-2 text-base-content/60">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Online status</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 p-4 bg-base-200 rounded-xl border border-base-300">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-medium">Get Started</span>
          </div>
          <p className="text-sm text-base-content/60">
            Choose a contact from the sidebar to begin your conversation
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;