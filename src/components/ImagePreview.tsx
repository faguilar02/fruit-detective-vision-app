
import { Button } from "@/components/ui/button";
import { Loader2, Play, RotateCcw } from "lucide-react";

interface ImagePreviewProps {
  imageUrl: string;
  onAnalyze: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

const ImagePreview = ({ imageUrl, onAnalyze, onReset, isProcessing }: ImagePreviewProps) => {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl border border-gray-200">
        <img 
          src={imageUrl} 
          alt="Vista previa" 
          className="w-full h-64 object-cover"
        />
        {isProcessing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p className="text-sm">Analizando imagen...</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={onAnalyze}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Analizar
            </>
          )}
        </Button>

        <Button 
          onClick={onReset}
          variant="outline"
          className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
