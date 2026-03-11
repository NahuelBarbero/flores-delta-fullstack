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

    // ✅ FASE 3: Validación runtime con Zod (Sanitización)
    const parsed = z.array(PlantaDtoSchema).safeParse(response.data);

    if (!parsed.success) {
      console.warn("⚠️ Data Sanitization applied in getPlantas:", parsed.error.issues);
      // Falla ruidosa solo en dev, o retorno de data cruda si es preferible
      // En estrategia v2 'Shield', preferimos retornar lo que se pueda o la data cruda como fallback
      console.log("Raw data returned due to partial validation failure");
      return response.data as PlantaDto[];
    }

    return parsed.data;  // ✅ Datos garantizados conformes
  },

  getPlantaById: async (id: string): Promise<PlantaDto> => {
    const response = await api.get(`/api/plantas/${id}`);

    // ✅ SPRINT D - FASE 3: Degradación elegante (no crash si schema no matchea)
    const parsed = PlantaDtoSchema.safeParse(response.data);

    if (!parsed.success) {
      console.warn('⚠️ PlantaDto validation warning (byId):', parsed.error.issues);
      return response.data;  // Degradación elegante: datos crudos pero usables
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

  // ✅ SPRINT D - FASE 1: updatePlanta (PUT /api/plantas/{id})
  // Conecta con PlantaController.java L69 - @PutMapping("/{id}")
  // Usa safeParse+warn (no throw) para degradación elegante post-guardado
  updatePlanta: async (id: number, data: Partial<PlantaDto>): Promise<PlantaDto> => {
    const response = await api.put(`/api/plantas/${id}`, data);
    const result = PlantaDtoSchema.safeParse(response.data);
    if (!result.success) {
      console.warn('[updatePlanta] Zod validation warning:', result.error.issues);
      return response.data;
    }
    return result.data;
  },

  deletePlanta: async (id: number): Promise<void> => {
    await api.delete(`/api/plantas/${id}`);
  },

  // ✅ SPRINT C - FASE 1: Endpoints "olvidados" del backend
  // Filosofía: Backend-First - Delegar lógica al servidor, no filtrar en cliente

  /**
   * Búsqueda inteligente de plantas (delegada al backend)
   * Evita filtrar arrays en el cliente - escalable con millones de registros
   */
  searchPlantas: async (keyword: string): Promise<PlantaDto[]> => {
    const response = await api.get(`/api/plantas/search?palabraClave=${encodeURIComponent(keyword)}`);

    const parsed = z.array(PlantaDtoSchema).safeParse(response.data);
    if (!parsed.success) {
      console.error("❌ Backend violó contrato PlantaDto (search):", parsed.error.issues);
      throw new Error("Invalid server response for search plantas");
    }
    return parsed.data;
  },

  /**
   * Plantas por sala (lazy loading real)
   * Carga solo lo necesario cuando el usuario filtra por sala
   */
  getPlantasBySala: async (salaId: number): Promise<PlantaDto[]> => {
    const response = await api.get(`/api/plantas/sala/${salaId}`);

    const parsed = z.array(PlantaDtoSchema).safeParse(response.data);
    if (!parsed.success) {
      console.error("❌ Backend violó contrato PlantaDto (bySala):", parsed.error.issues);
      throw new Error("Invalid server response for plantas by sala");
    }
    return parsed.data;
  },

  /**
   * Toggle visibilidad pública de planta
   * Acción atómica en servidor - garantiza consistencia
   */
  togglePublicStatus: async (plantaId: number): Promise<PlantaDto> => {
    const response = await api.put(`/api/plantas/${plantaId}/toggle-public`);

    const parsed = PlantaDtoSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error("❌ Backend violó contrato PlantaDto (togglePublic):", parsed.error.issues);
      throw new Error("Invalid server response for toggle public");
    }
    return parsed.data;
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

  createPlanta: async (data: PlantaDto): Promise<PlantaDto> => {
    console.log("🌐 API createPlanta payload:", data); // DIAGNOSIS
    const response = await api.post('/api/plantas', data);
    console.log("✅ API createPlanta response:", response.data); // DIAGNOSIS

    return validateResponse(PlantaDtoSchema, response.data, 'POST /api/plantas');
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

  // --- ALL EVENTS ---
  getAllEvents: async (filters: any = {}): Promise<BackendEvent[]> => {
    const plantIdParam = filters.plantId && filters.plantId !== 'Todas' ? filters.plantId : null;
    const typeParam = filters.type && filters.type !== 'Todos' ? filters.type : null;
    // Fetch all endpoints and filter manually 
    const [watering, nutrient, pruning, note, stageChange] = await Promise.all([
      api.get('/api/events/watering').catch(() => ({ data: [] })),
      api.get('/api/events/nutrient').catch(() => ({ data: [] })),
      api.get('/api/events/pruning').catch(() => ({ data: [] })),
      api.get('/api/events/note').catch(() => ({ data: [] })),
      api.get('/api/events/stage-change').catch(() => ({ data: [] })),
    ]);
    let allEvents: BackendEvent[] = [
      ...watering.data,
      ...nutrient.data,
      ...pruning.data,
      ...note.data,
      ...stageChange.data,
    ];
    // Filter logic (simplified for fix)
    if (typeParam) allEvents = allEvents.filter((e) => e.eventType === typeParam);
    if (plantIdParam) allEvents = allEvents.filter((e) => e.plantaIds?.includes(Number(plantIdParam)));
    allEvents.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    return allEvents;
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

  createNoteEvent: async (data: FormData): Promise<BackendEvent> => {
    const response = await api.post('/api/events/note', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateNoteEvent: async (id: number, data: FormData): Promise<BackendEvent> => {
    const response = await api.put(`/api/events/note/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
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

  // ✅ SPRINT C - FASE 2: MeasurementEvent CRUD
  // Conecta con MeasurementEventController del backend

  /**
   * Crear evento de medición (altura, temp, humedad, etc.)
   * Datos estructurados para analítica rica (no notas de texto)
   */
  createMeasurementEvent: async (eventData: {
    fecha: string;
    plantaIds: number[];
    horasLuz?: string;
    humedad?: number;
    temperaturaAmbiente?: number;
    alturaPlanta?: number;
    distanciaLuz?: number;
    nota?: string;
  }): Promise<BackendEvent> => {
    const response = await api.post('/api/events/measurement', eventData);
    return response.data;
  },

  /**
   * Obtener eventos de medición (para gráficos y analítica)
   */
  getMeasurementEvents: async (): Promise<BackendEvent[]> => {
    const response = await api.get('/api/events/measurement');
    return response.data;
  },

  /**
   * Obtener mediciones de una planta específica (analítica por planta)
   */
  getMeasurementEventsByPlanta: async (plantaId: number): Promise<BackendEvent[]> => {
    const response = await api.get(`/api/events/measurement/planta/${plantaId}`);
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

