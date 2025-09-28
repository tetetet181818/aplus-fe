"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Cropper from "react-easy-crop";
import { X } from "lucide-react";

interface ImageEditorProps {
  imageUrl: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
}

export default function ImageEditor({
  imageUrl,
  onSave,
  onCancel,
}: ImageEditorProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleSave = () => {
    onSave(imageUrl);
  };

  return (
    <div className="w-full mx-auto">
      <div className="fixed w-screen h-screen	top-0 left-0">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          aspect={16 / 9}
          cropShape="rect"
          showGrid={true}
        />
        <button
          onClick={onCancel}
          className="absolute top-4 left-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          onClick={handleSave}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          حفظ التعديل
        </Button>
      </div>
    </div>
  );
}
