
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
    setIsDragActive(false);
  }, [onImageSelect]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    noClick: true
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragActive 
            ? 'border-green-400 bg-green-50 scale-105' 
            : 'border-gray-300 bg-gray-50 hover:border-green-300 hover:bg-green-25'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
            ${isDragActive ? 'bg-green-200' : 'bg-gray-200'}
          `}>
            {isDragActive ? (
              <Upload className="w-8 h-8 text-green-600" />
            ) : (
              <ImageIcon className="w-8 h-8 text-gray-600" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {isDragActive ? "¡Suelta la imagen aquí!" : "Arrastra una imagen aquí"}
            </h3>
            <p className="text-sm text-gray-600">
              o haz clic en el botón para seleccionar
            </p>
          </div>

          <Button 
            onClick={open}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          >
            Seleccionar Imagen
          </Button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Formatos: JPG, PNG, WebP • Máximo: 10MB
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
