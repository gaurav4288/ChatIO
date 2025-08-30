import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Video, Smile } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "./EmojiPicker";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [selectedMediaFile, setSelectedMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if it's an image or video
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    
    if (!isImage && !isVideo) {
      toast.error("Please select a valid image or video file");
      return;
    }

    setSelectedMediaFile(file);
    setMediaType(isImage ? 'image' : 'video');

    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeMedia = () => {
    setMediaPreview(null);
    setSelectedMediaFile(null);
    setMediaType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEmojiSelect = (emoji) => {
    setText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !selectedMediaFile) return;

    try {
      await sendMessage({
        text: text.trim(),
        mediaFile: selectedMediaFile, // renamed from imageFile to mediaFile
      });

      // Clear form
      setText("");
      setMediaPreview(null);
      setSelectedMediaFile(null);
      setMediaType(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="bg-base-100 border-t border-base-300 p-4">
      {/* Media Preview */}
      {mediaPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {mediaType === 'image' ? (
              <img
                src={mediaPreview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-lg border border-base-300"
              />
            ) : (
              <video
                src={mediaPreview}
                className="w-16 h-16 object-cover rounded-lg border border-base-300"
                controls
                muted
              />
            )}
            <button
              onClick={removeMedia}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content
              flex items-center justify-center hover:bg-error/80 transition-colors"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="w-full resize-none rounded-xl border border-base-300 bg-base-200 
            px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 
            focus:border-primary min-h-[44px] max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`absolute right-2 bottom-2 p-1 rounded-lg transition-colors ${
              showEmojiPicker ? "text-primary bg-primary/10" : "text-base-content/60 hover:text-base-content"
            }`}
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Media Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-xl bg-base-200 hover:bg-base-300 transition-colors"
          >
            {mediaType === 'video' ? <Video className="w-5 h-5" /> : <Image className="w-5 h-5" />}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() && !mediaPreview}
            className="p-3 rounded-xl bg-primary hover:bg-primary/80 disabled:bg-base-300 
            disabled:text-base-content/40 text-primary-content transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleMediaChange}
        />
      </form>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiSelect={handleEmojiSelect}
          isOpen={showEmojiPicker}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}
    </div>
  );
};
export default MessageInput;
