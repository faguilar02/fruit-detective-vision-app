
import { CheckCircle, XCircle, AlertCircle, Brain } from "lucide-react";
import { AnalysisResult } from "@/pages/Index";

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const getFruitEmoji = (fruit: string | null) => {
    switch (fruit) {
      case 'apple': return '🍎';
      case 'orange': return '🍊';
      case 'banana': return '🍌';
      default: return '❓';
    }
  };

  const getFruitName = (fruit: string | null) => {
    switch (fruit) {
      case 'apple': return 'Manzana';
      case 'orange': return 'Naranja';
      case 'banana': return 'Banana';
      default: return 'No detectado';
    }
  };

  const getConditionIcon = (condition: string | null) => {
    if (condition === 'fresh') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (condition === 'rotten') return <XCircle className="w-5 h-5 text-red-500" />;
    return <AlertCircle className="w-5 h-5 text-gray-400" />;
  };

  const getConditionText = (condition: string | null) => {
    switch (condition) {
      case 'fresh': return 'Fresca';
      case 'rotten': return 'En mal estado';
      default: return 'No analizado';
    }
  };

  const getConditionColor = (condition: string | null) => {
    switch (condition) {
      case 'fresh': return 'text-green-700 bg-green-100';
      case 'rotten': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  if (result.processing) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="relative">
          <Brain className="w-12 h-12 text-blue-500 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Analizando con IA</h3>
          <p className="text-sm text-gray-600">Procesando imagen y clasificando fruta...</p>
        </div>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!result.fruitType) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Brain className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Sin análisis</h3>
          <p className="text-sm text-gray-600">
            Sube una imagen y presiona "Analizar" para obtener resultados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Fruit Type */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-blue-900">Tipo de Fruta</h3>
          <span className="text-2xl">{getFruitEmoji(result.fruitType)}</span>
        </div>
        <p className="text-xl font-bold text-blue-900">{getFruitName(result.fruitType)}</p>
      </div>

      {/* Condition */}
      <div className={`rounded-xl p-4 border ${result.condition === 'fresh' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100' : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-100'}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-sm font-medium ${result.condition === 'fresh' ? 'text-green-900' : 'text-red-900'}`}>
            Estado de la Fruta
          </h3>
          {getConditionIcon(result.condition)}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(result.condition)}`}>
            {getConditionText(result.condition)}
          </span>
        </div>
      </div>

      {/* Confidence */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-purple-900">Nivel de Confianza</h3>
          <span className="text-lg font-bold text-purple-900">{result.confidence}%</span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
        <p className="text-xs text-purple-700 mt-1">
          {result.confidence >= 90 ? 'Muy alta' : 
           result.confidence >= 70 ? 'Alta' : 
           result.confidence >= 50 ? 'Media' : 'Baja'}
        </p>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Resumen</h3>
        <p className="text-sm text-gray-700">
          Se ha detectado una <strong>{getFruitName(result.fruitType).toLowerCase()}</strong> en estado{' '}
          <strong className={result.condition === 'fresh' ? 'text-green-600' : 'text-red-600'}>
            {result.condition === 'fresh' ? 'fresco' : 'deteriorado'}
          </strong>{' '}
          con un {result.confidence}% de confianza.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
