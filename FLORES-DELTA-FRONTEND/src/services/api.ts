import api from "@/Utils/api";
import { PlantaDto, SalaDto, CepaDto, UserDto, NutrienteDto } from "@/interfaces/Planta";  // ✅ Agregado UserDto
import { BackendEvent, WateringEventPayload, PruningEventPayload, StageChangeEventPayload } from "@/interfaces/Eventos";
import { PlantaDtoSchema, SalaDtoSchema, CepaDtoSchema, UserDtoSchema, NutrienteDtoSchema } from "@/schemas/DTOSchemas";  // ✅ Agregado UserDtoSchema
import { z } from 'zod';
import { validateResponse } from '@/Utils/validationHelper';  // ✅ Sprint 4.2

export const apiService = {
  // --- AUTH ---
  loginUser: async (email: string, password: string): Promise<any> => {
    try {
      const response = await api.post('/login', { username: email, password }); // Spring Security often expects 'username' not 'email'
      return response.data;
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
    }
  },

  registerUser: async (email: string, password: string): Promise<any> => {
    try {
      const response = await api.post('/api/users/register', {
        email,
        password,
        nombre: 'Usuario',
        apellido: 'Nuevo'
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el registro');
    }
  },

  // --- PLANTAS ---
  getPlantas: async (): Promise<PlantaDto[]> => {
    const response = await api.get('/api/plantas');

    // ✅ FASE 3: Validación runtime con Zod
    const parsed = z.array(PlantaDtoSchema).safeParse(response.data);

    if (!parsed.success) {
      console.error("❌ Backend violó contrato PlantaDto:", parsed.error.issues);
      throw new Error("Invalid server response for plantas");
    }

    return parsed.data;  // ✅ Datos garantizados conformes
  },

  getPlantaById: async (id: string): Promise<PlantaDto> => {
    const response = await api.get(`/api/plantas/${id}`);

    // ✅ FASE 3: Validación runtime
    const parsed = PlantaDtoSchema.safeParse(response.data);

    if (!parsed.success) {
      console.error("❌ Backend violó contrato PlantaDto (byId):", parsed.error.issues);
      throw new Error(`Invalid server response for planta ${id}`);
    }

    return parsed.data;
  },

  getPlantEvents: async (id: string): Promise<BackendEvent[]> => {
    const response = await api.get(`/api/plantas/${id}/events`);
    return response.data;
  },

  createPlanta: async (plantaData: Partial<PlantaDto>): Promise<PlantaDto> => {
    const response = await api.post('/api/plantas', plantaData);

    // ✅ Validación Zod en mutación POST
    return validateResponse(PlantaDtoSchema, response.data, 'POST /api/plantas');
  },

  deletePlanta: async (id: number): Promise<void> => {
    await api.delete(`/api/plantas/${id}`);
  },

  // --- SALAS ---
  getSalas: async (): Promise<SalaDto[]> => {
    const response = await api.get('/api/salas');

    // ✅ FASE 3: Validación runtime
    const parsed = z.array(SalaDtoSchema).safeParse(response.data);

    if (!parsed.success) {
      console.error("❌ Backend violó contrato SalaDto:", parsed.error.issues);
      throw new Error("Invalid server response for salas");
    }

    return parsed.data;
  },

  createSala: async (salaData: Partial<SalaDto>): Promise<SalaDto> => {
    const response = await api.post('/api/salas', salaData);

    // ✅ Validación Zod en mutación POST
    return validateResponse(SalaDtoSchema, response.data, 'POST /api/salas');
  },

  updateSala: async (id: number, salaData: Partial<SalaDto>): Promise<SalaDto> => {
    const response = await api.put(`/api/salas/${id}`, salaData);

    // ✅ Validación Zod en mutación PUT
    return validateResponse(SalaDtoSchema, response.data, `PUT /api/salas/${id}`);
  },

  deleteSala: async (id: number): Promise<void> => {
    await api.delete(`/api/salas/${id}`);
  },

  // --- CEPAS ---
  getCepas: async (): Promise<CepaDto[]> => {
    const response = await api.get('/api/cepas');

    // ✅ FASE 3: Validación runtime
    const parsed = z.array(CepaDtoSchema).safeParse(response.data);

    if (!parsed.success) {
      console.error("❌ Backend violó contrato CepaDto:", parsed.error.issues);
      throw new Error("Invalid server response for cepas");
    }

    return parsed.data;
  },

  createCepa: async (cepaData: Partial<CepaDto>): Promise<CepaDto> => {
    const response = await api.post('/api/cepas', cepaData);
    return response.data;
  },

  updateCepa: async (id: number, cepaData: Partial<CepaDto>): Promise<CepaDto> => {
    const response = await api.put(`/api/cepas/${id}`, cepaData);
    return response.data;
  },

  deleteCepa: async (id: number): Promise<void> => {
    await api.delete(`/api/cepas/${id}`);
  },

  // --- NUTRIENTES ---
  getNutrientes: async (): Promise<NutrienteDto[]> => {
    const response = await api.get('/api/nutrientes');

    const parsed = z.array(NutrienteDtoSchema).safeParse(response.data);

    if (!parsed.success) {
      console.error("❌ Backend violó contrato NutrienteDto:", parsed.error.issues);
      throw new Error("Invalid server response for nutrientes");
    }

    return parsed.data;
  },

  createNutriente: async (nutrienteData: { titulo: string, descripcion: string }): Promise<any> => {
    const response = await api.post('/api/nutrientes', nutrienteData);
    return response.data;
  },

  updateNutriente: async (id: number, nutrienteData: { titulo: string, descripcion: string }): Promise<any> => {
    const response = await api.put(`/api/nutrientes/${id}`, nutrienteData);
    return response.data;
  },

  deleteNutriente: async (id: number): Promise<void> => {
    await api.delete(`/api/nutrientes/${id}`);
  },

  // --- USUARIOS ---
  getUsers: async (): Promise<UserDto[]> => {  // ✅ FIXED: any → UserDto[]
    const response = await api.get('/api/users');

    // ✅ FASE 3: Validación Zod (Sprint 2.4)
    const parsed = z.array(UserDtoSchema).safeParse(response.data);

    if (!parsed.success) {
      console.error("❌ Backend violó contrato UserDto:", parsed.error.issues);
      throw new Error("Invalid server response for users");
    }

    return parsed.data;
  },

  // --- EVENTOS ---
  createNutrientEvent: async (eventData: any): Promise<BackendEvent> => {
    const response = await api.post('/api/events/nutrient', eventData);
    return response.data;
  },

  createWateringEvent: async (eventData: WateringEventPayload): Promise<BackendEvent> => {
    const response = await api.post('/api/events/watering', eventData);
    return response.data;
  },

  createPruningEvent: async (eventData: PruningEventPayload): Promise<BackendEvent> => {
    const response = await api.post('/api/events/pruning', eventData);
    return response.data;
  },

  createNoteEvent: async (formData: FormData): Promise<BackendEvent> => {
    const response = await api.post('/api/events/note', formData, {
      headers: { 'Content-Type': 'multipart/form-data' } // Optional, axios sets it automatically usually
    });
    return response.data;
  },

  createPhotoEvent: async (formData: FormData): Promise<BackendEvent> => {
    const response = await api.post('/api/events/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  createStageChangeEvent: async (eventData: StageChangeEventPayload): Promise<BackendEvent> => {
    const response = await api.post('/api/events/stage-change', eventData);
    return response.data;
  },

  deleteEvent: async (eventType: string, eventId: string): Promise<void> => {
    await api.delete(`/api/events/${eventType.toLowerCase()}/${eventId}`);
  },

  updateEvent: async (eventType: string, eventId: string, payload: any): Promise<BackendEvent> => {
    const isFormData = payload instanceof FormData;
    const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    const response = await api.put(`/api/events/${eventType.toLowerCase()}/${eventId}`, payload, config);
    return response.data;
  },

  getAllEventsForCurrentUser: async (filters: any = {}): Promise<BackendEvent[]> => {
    const queryParams = new URLSearchParams();
    if (filters.type && filters.type !== 'Todos') queryParams.append('eventType', filters.type);
    if (filters.sala && filters.sala !== 'Todas') queryParams.append('salaId', filters.sala);
    if (filters.plantId && filters.plantId !== 'Todas') queryParams.append('plantId', filters.plantId);
    if (filters.dateRange?.from) queryParams.append('startDate', filters.dateRange.from.toISOString().split('T')[0]);
    if (filters.dateRange?.to) queryParams.append('endDate', filters.dateRange.to.toISOString().split('T')[0]);

    const response = await api.get(`/api/log/events`, { params: queryParams });
    return response.data;
  },

  // --- FAVORITES ---
  addFavoritePlanta: async (id: number): Promise<void> => {
    await api.post(`/api/favorites/plantas/${id}`);
  },

  removeFavoritePlanta: async (id: number): Promise<void> => {
    await api.delete(`/api/favorites/plantas/${id}`);
  },

  getFavoritePlantas: async (): Promise<PlantaDto[]> => {
    const response = await api.get('/api/favorites/plantas');
    return response.data;
  },
};

