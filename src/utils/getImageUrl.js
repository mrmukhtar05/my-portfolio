// Resolves an image path coming from the backend into a full URL.
// Backend may return either:
//  - a Cloudinary URL (starts with http) -> use as-is
//  - a local path like "uploads/xxxx.png" -> prefix with backend server origin
const BACKEND_ORIGIN =
  (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
    "/api",
    ""
  );

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BACKEND_ORIGIN}/${path.replace(/^\/+/, "")}`;
};
