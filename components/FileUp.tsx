"use client";
import { useState } from "react";

type Img64 = {
  imgUrl: string | ArrayBuffer | null | undefined;
};
export function FileUp() {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<Img64 | null>(null);
  const handleFileUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event?.target?.result;
        setImgUrl({ imgUrl: base64String });
      };

      reader.readAsDataURL(file);
      setFile(file);
      //   console.log(files);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      {/* <FileUpload onChange={handleFileUpload} /> */}
    </div>
  );
}
