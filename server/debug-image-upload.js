import dotenv from "dotenv";
import { uploadOnCloudinary } from "./src/lib/cloudinary.js";

dotenv.config();

// Test function to check Cloudinary configuration
const testCloudinaryConfig = () => {
  console.log("=== Cloudinary Configuration Test ===");
  console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ? "✅ Set" : "❌ Missing");
  console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "✅ Set" : "❌ Missing");
  console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✅ Set" : "❌ Missing");
  
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.log("\n❌ Missing Cloudinary environment variables!");
    console.log("Please create a .env file in the server directory with:");
    console.log("CLOUDINARY_CLOUD_NAME=your_cloud_name");
    console.log("CLOUDINARY_API_KEY=your_api_key");
    console.log("CLOUDINARY_API_SECRET=your_api_secret");
    return false;
  }
  
  console.log("\n✅ All Cloudinary environment variables are set!");
  return true;
};

// Test the upload function with sample files
const testUpload = async () => {
  console.log("\n=== Testing Upload Function ===");
  
  // Create simple test files
  const fs = await import("fs");
  const path = await import("path");
  
  const testImagePath = "./test-image.txt";
  const testVideoPath = "./test-video.txt";
  
  fs.writeFileSync(testImagePath, "This is a test image file for upload");
  fs.writeFileSync(testVideoPath, "This is a test video file for upload");
  
  try {
    console.log("Testing image upload...");
    const imageResult = await uploadOnCloudinary(testImagePath);
    
    if (imageResult) {
      console.log("✅ Image upload successful!");
      console.log("URL:", imageResult.url);
      console.log("Public ID:", imageResult.public_id);
    } else {
      console.log("❌ Image upload failed!");
    }
    
    console.log("\nTesting video upload...");
    const videoResult = await uploadOnCloudinary(testVideoPath);
    
    if (videoResult) {
      console.log("✅ Video upload successful!");
      console.log("URL:", videoResult.url);
      console.log("Public ID:", videoResult.public_id);
    } else {
      console.log("❌ Video upload failed!");
    }
  } catch (error) {
    console.log("❌ Upload error:", error.message);
  }
};

// Run tests
const runTests = async () => {
  const configOk = testCloudinaryConfig();
  
  if (configOk) {
    await testUpload();
  }
  
  console.log("\n=== Test Complete ===");
  process.exit(0);
};

runTests();
