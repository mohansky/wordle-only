// "use client";
// import React, { useEffect, useState } from "react";
// import { Database } from "../database.types";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

// export default function Avatar({
//   uid,
//   url,
//   size,
//   onUpload,
// }: {
//   uid: string;
//   url: Profiles["avatar_url"];
//   size: number;
//   onUpload: (url: string) => void;
// }) {
//   const supabase = createClientComponentClient();
//   const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(url);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     async function downloadImage(path: string) {
//       try {
//         const { data, error } = await supabase.storage
//           .from("avatars")
//           .download(path);
//         if (error) {
//           throw error;
//         }

//         const url = URL.createObjectURL(data);
//         setAvatarUrl(url);
//       } catch (error) {
//         console.log("Error downloading image: ", error);
//       }
//     }

//     if (url) downloadImage(url);
//   }, [url, supabase]);

//   const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
//     event
//   ) => {
//     try {
//       setUploading(true);

//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error("You must select an image to upload.");
//       }

//       const file = event.target.files[0];
//       const fileExt = file.name.split(".").pop();
//       const filePath = `${uid}-${Math.random()}.${fileExt}`;

//       let { error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(filePath, file);

//       if (uploadError) {
//         throw uploadError;
//       }

//       onUpload(filePath);
//     } catch (error) {
//       alert("Error uploading avatar!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       {avatarUrl ? (
//         <Image
//           width={size}
//           height={size}
//           src={avatarUrl}
//           alt="Avatar"
//           className="avatar image"
//           style={{ height: size, width: size }}
//         />
//       ) : (
//         <div
//           className="avatar no-image"
//           style={{ height: size, width: size }}
//         />
//       )}
//       <div style={{ width: size }}>
//         <label className="mt-5 h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" 
//            htmlFor="single">
//           {uploading ? "Uploading ..." : "Upload"}
//         </label>
//         <input
//           style={{
//             visibility: "hidden",
//             position: "absolute",
//           }}
//           type="file"
//           id="single"
//           accept="image/*"
//           onChange={uploadAvatar}
//           disabled={uploading}
//         />
//       </div>
//     </div>
//   );
// }
