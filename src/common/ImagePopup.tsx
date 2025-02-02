import React from 'react';

interface ImagePopupProps {
  imageSrc: string; // URL or path of the image
  onClose: () => void; // Function to close the popup
}

const ImagePopup: React.FC<ImagePopupProps> = ({ imageSrc, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50" 
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl max-h-3xl p-4 bg-white rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
          onClick={onClose}
        >
          X
        </button>

        {/* Image */}
        <img
          src={`${import.meta.env.VITE_APP_Image_Url}${imageSrc}`}
          alt="popup"
          className="w-full h-auto max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
};

export default ImagePopup;
