// components/ui/themebutton.tsx

"use client"; // Enables client-side rendering for this component

import React from 'react';
import Image from 'next/image';

interface ThemeButtonProps {
  theme: string;
  onClick: (theme: string) => void;
  imageSrc?: string; // Optional image source prop
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ theme, onClick, imageSrc }) => {
  return (
    <button
      onClick={() => onClick(theme)}
      className={`w-16 h-16 rounded-full flex items-center justify-center border-2 border-gray-300 transition-transform transform hover:scale-105 ${theme}`}
    >
      {imageSrc ? (
        <Image src={imageSrc} alt="Theme icon" width={48} height={48} className="rounded-full" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-300"></div> // Default appearance if no image
      )}
    </button>
  );
};

export default ThemeButton;