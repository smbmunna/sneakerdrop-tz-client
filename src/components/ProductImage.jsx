import { useState } from "react";
import { CiImageOn } from "react-icons/ci";


export default function ProductImage({ src, alt }) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-50 text-gray-400">
        <CiImageOn className="text-2xl text-gray-300" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="object-cover w-full h-full"
      onError={() => setImgError(true)}
    />
  );
}
