import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import { uploadOnCloudinary } from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const mediaLocalPath = req.file?.path;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let mediaUrl;
    let mediaType;
    
    if (mediaLocalPath) {
      const uploadResponse = await uploadOnCloudinary(mediaLocalPath);
      mediaUrl = uploadResponse?.url;
      
      // Determine media type based on file extension or MIME type
      const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
      const isVideo = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'].includes(fileExtension);
      mediaType = isVideo ? 'video' : 'image';
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      media: mediaUrl,
      mediaType,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};