import api from "@/Utils/api";
import { PlantaDto, SalaDto, CepaDto, UserDto, NutrienteDto } from "@/interfaces/Planta";  // ✅ Agregado UserDto
import { BackendEvent, WateringEventPayload, PruningEventPayload, StageChangeEventPayload } from "@/interfaces/Eventos";
import { PlantaDtoSchema, SalaDtoSchema, CepaDtoSchema, UserDtoSchema, NutrienteDtoSchema } from "@/schemas/DTOSchemas";  // ✅ Agregado UserDtoSchema
import { z } from 'zod';
import { validateResponse } from '@/utils/validationHelper';  // ✅ Sprint 4.2

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

    return parsed.data;  // ✅ FIX: Return statement agregado
  },

  updateUserRole: async (id: number, role: string): Promise<UserDto> => {
    const response = await api.patch(`/api/users/${id}/role`, { role });
    // Verificación básica del DTO retornado
    const parsed = UserDtoSchema.safeParse(response.data);
    if (!parsed.success) {
      console.warn("⚠️ Backend retornó UserDto incompleto tras cambiar rol:", parsed.error.issues);
    }
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/api/users/${id}`);
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
    // El endpoint /api/log/events NO existe en el backend.
    // Solución: llamar a los 5 endpoints individuales y combinar resultados.
    try {
      const [watering, nutrient, pruning, note, stageChange] = await Promise.all([
        api.get('/api/events/watering').catch(() => ({ data: [] })),
        api.get('/api/events/nutrient').catch(() => ({ data: [] })),
        api.get('/api/events/pruning').catch(() => ({ data: [] })),
        api.get('/api/events/note').catch(() => ({ data: [] })),
        api.get('/api/events/stage-change').catch(() => ({ data: [] })),
      ]);

      // Combinar todos los eventos
      let allEvents: BackendEvent[] = [
        ...watering.data,
        ...nutrient.data,
        ...pruning.data,
        ...note.data,
        ...stageChange.data,
      ];

      // Aplicar filtros del cliente
      if (filters.type && filters.type !== 'Todos') {
        allEvents = allEvents.filter((e: BackendEvent) => e.eventType === filters.type);
      }
      if (filters.plantId && filters.plantId !== 'Todas') {
        const targetId = Number(filters.plantId);
        allEvents = allEvents.filter((e: BackendEvent) => e.plantaIds?.includes(targetId));
      }
      if (filters.dateRange?.from) {
        const fromDate = new Date(filters.dateRange.from);
        allEvents = allEvents.filter((e: BackendEvent) => new Date(e.fecha) >= fromDate);
      }
      if (filters.dateRange?.to) {
        const toDate = new Date(filters.dateRange.to);
        allEvents = allEvents.filter((e: BackendEvent) => new Date(e.fecha) <= toDate);
      }

      // Ordenar por fecha descendente
      allEvents.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());


      return allEvents;
    } catch (error) {
      console.error('Error fetching all events:', error);
      return [];
    }
  },


  // --- LOGS DEL SISTEMA ---
  getSystemLogs: async (lines: number = 500): Promise<string[]> => {
    const response = await api.get(`/api/logs?lines=${lines}`);
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

