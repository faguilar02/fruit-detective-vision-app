
interface BackendResponse {
  class: string;
  confidence: number;
}

export interface ProcessedAnalysisResult {
  fruitType: 'apple' | 'orange' | 'banana';
  condition: 'fresh' | 'rotten';
  confidence: number;
}

const API_BASE_URL = 'https://backend-fastapi-ia.onrender.com';

export const analyzeFruitImage = async (file: File): Promise<ProcessedAnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: BackendResponse = await response.json();
    
    // Procesar la respuesta del backend
    return processBackendResponse(data);
  } catch (error) {
    console.error('Error calling backend API:', error);
    throw new Error('Error al conectar con el servidor. Inténtalo de nuevo.');
  }
};

const processBackendResponse = (data: BackendResponse): ProcessedAnalysisResult => {
  const className = data.class.toLowerCase();
  
  // Determinar el tipo de fruta
  let fruitType: 'apple' | 'orange' | 'banana';
  if (className.includes('apple')) {
    fruitType = 'apple';
  } else if (className.includes('orange')) {
    fruitType = 'orange';
  } else if (className.includes('banana')) {
    fruitType = 'banana';
  } else {
    // Fallback por si hay alguna clase no esperada
    fruitType = 'apple';
  }

  // Determinar el estado (fresh o rotten)
  const condition: 'fresh' | 'rotten' = className.includes('fresh') ? 'fresh' : 'rotten';

  // Convertir confidence a porcentaje
  const confidence = Math.round(data.confidence * 100);

  return {
    fruitType,
    condition,
    confidence
  };
};
