export interface BackendEvent {
  id: number;
  eventType: 'WATERING' | 'PRUNING' | 'NOTE' | 'NUTRIENT' | 'PHOTO' | 'STAGE_CHANGE';
  fecha: string;
  plantaIds: number[];
  phAgua?: number;
  ecAgua?: number;
  tipoPoda?: string;
  observacion?: string;
  nuevaEtapa?: string;
  description?: string;
  mediaUrls?: string[];
  nutriente?: { id: number; titulo: string };
}

export interface WateringEventPayload {
  plantaIds: number[];
  fecha: string;
  phAgua?: number;
  ecAgua?: number;
}

export interface PruningEventPayload {
  plantaIds: number[];
  fecha: string;
  tipoPoda: string;
}

export interface NoteEventPayload {
  plantaIds: number[];
  fecha: string;
  observacion: string;
}

export interface StageChangeEventPayload {
  plantaIds: number[];
  fecha: string;
  nuevaEtapa: string;
}

// Photo events use FormData, so no JSON interface is strictly needed for the payload,
// but we can define the expected fields for documentation.
export interface PhotoEventFormData {
  plantaIds: number[]; // Sent as JSON string or individual fields
  fecha: string;
  description?: string;
  file: File;
}
