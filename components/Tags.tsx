import React, { useState } from "react";
import { Input } from "./ui/Input"; // Assuming you are using a styled input from your project

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [currentTag, setCurrentTag] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (currentTag.trim() !== "") {
        setTags((prevTags) => [...prevTags, currentTag.trim()]);
        setCurrentTag(""); // Clear input after adding
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2   rounded-lg">
      {/* Render existing tags */}
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-violet-500 text-white px-3 py-1 rounded-full"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-2 text-white font-bold"
          >
            &times;
          </button>
        </div>
      ))}

      {/* Render input using the Input component */}
      <div className="flex-1">
        <Input
          type="text"
          className="w-full outline-none p-2 bg-transparent"
          placeholder="Type and press Enter"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default TagInput;
