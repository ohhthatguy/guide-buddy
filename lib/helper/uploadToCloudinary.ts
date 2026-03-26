export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "guide-buddy"); // Replace this

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dfbwi9whq/image/upload`, // Replace cloud_name
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    console.log("Data in uploadToCloudinary: ", data);
    return data.secure_url; // This is the URL you'll save to MongoDB
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
