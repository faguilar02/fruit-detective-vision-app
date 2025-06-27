import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import ImagePreview from "@/components/ImagePreview";
import ResultsDisplay from "@/components/ResultsDisplay";
import { analyzeFruitImage } from "@/services/fruitAnalysisService";
import { useToast } from "@/hooks/use-toast";

export interface AnalysisResult {
  fruitType: 'apple' | 'orange' | 'banana' | null;
  condition: 'fresh' | 'rotten' | null;
  confidence: number;
  processing: boolean;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>({
    fruitType: null,
    condition: null,
    confidence: 0,
    processing: false
  });
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset previous results
    setAnalysisResult({
      fruitType: null,
      condition: null,
      confidence: 0,
      processing: false
    });
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setAnalysisResult(prev => ({ ...prev, processing: true }));

    try {
      const result = await analyzeFruitImage(selectedImage);
      
      setAnalysisResult({
        fruitType: result.fruitType,
        condition: result.condition,
        confidence: result.confidence,
        processing: false
      });

      toast({
        title: "Análisis completado",
        description: "La imagen ha sido procesada exitosamente.",
      });
    } catch (error) {
      console.error('Error during analysis:', error);
      
      setAnalysisResult(prev => ({ ...prev, processing: false }));
      
      toast({
        title: "Error en el análisis",
        description: error instanceof Error ? error.message : "Error desconocido al procesar la imagen.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult({
      fruitType: null,
      condition: null,
      confidence: 0,
      processing: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">🍎</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">FruitAnalyzer</h1>
                <p className="text-sm text-gray-600">Clasificación inteligente de frutas con IA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  📤
                </span>
                Subir Imagen
              </h2>
              <ImageUpload onImageSelect={handleImageSelect} />
            </div>

            {imagePreview && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    👁️
                  </span>
                  Vista Previa
                </h2>
                <ImagePreview 
                  imageUrl={imagePreview} 
                  onAnalyze={handleAnalyze}
                  onReset={handleReset}
                  isProcessing={analysisResult.processing}
                />
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 min-h-[400px]">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  🤖
                </span>
                Resultados del Análisis
              </h2>
              <ResultsDisplay result={analysisResult} />
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Instrucciones</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Sube una imagen clara de una fruta
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Formatos soportados: JPG, PNG, WebP
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Tamaño máximo: 10MB
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Frutas detectables: 🍎 Manzana, 🍊 Naranja, 🍌 Banana
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
