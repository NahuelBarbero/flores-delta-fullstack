export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      administrador: {
        Row: {
          correo: string
          created_at: string | null
          id: string
          nombre: string
        }
        Insert: {
          correo: string
          created_at?: string | null
          id: string
          nombre: string
        }
        Update: {
          correo?: string
          created_at?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      asignacion_planta: {
        Row: {
          created_at: string | null
          espacio_id: string
          etapa_id: string
          fecha_fin: string | null
          fecha_inicio: string
          id: string
          mapa_posicion_id: string | null
          planta_id: string
        }
        Insert: {
          created_at?: string | null
          espacio_id: string
          etapa_id: string
          fecha_fin?: string | null
          fecha_inicio: string
          id?: string
          mapa_posicion_id?: string | null
          planta_id: string
        }
        Update: {
          created_at?: string | null
          espacio_id?: string
          etapa_id?: string
          fecha_fin?: string | null
          fecha_inicio?: string
          id?: string
          mapa_posicion_id?: string | null
          planta_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asignacion_planta_espacio_id_fkey"
            columns: ["espacio_id"]
            isOneToOne: false
            referencedRelation: "espacio"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asignacion_planta_etapa_id_fkey"
            columns: ["etapa_id"]
            isOneToOne: false
            referencedRelation: "etapa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asignacion_planta_mapa_posicion_id_fkey"
            columns: ["mapa_posicion_id"]
            isOneToOne: false
            referencedRelation: "mapa_posicion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asignacion_planta_planta_id_fkey"
            columns: ["planta_id"]
            isOneToOne: false
            referencedRelation: "planta"
            referencedColumns: ["id"]
          },
        ]
      }
      detalle_nutrientes: {
        Row: {
          created_at: string | null
          dosis: number | null
          id: string
          producto_aplicado: string | null
          registro_actividad_id: string
          tipo_nutriente: Database["public"]["Enums"]["tipo_nutriente"]
        }
        Insert: {
          created_at?: string | null
          dosis?: number | null
          id?: string
          producto_aplicado?: string | null
          registro_actividad_id: string
          tipo_nutriente: Database["public"]["Enums"]["tipo_nutriente"]
        }
        Update: {
          created_at?: string | null
          dosis?: number | null
          id?: string
          producto_aplicado?: string | null
          registro_actividad_id?: string
          tipo_nutriente?: Database["public"]["Enums"]["tipo_nutriente"]
        }
        Relationships: [
          {
            foreignKeyName: "detalle_nutrientes_registro_actividad_id_fkey"
            columns: ["registro_actividad_id"]
            isOneToOne: false
            referencedRelation: "registro_actividad"
            referencedColumns: ["id"]
          },
        ]
      }
      detalle_poda: {
        Row: {
          created_at: string | null
          id: string
          nro_hojas_removidas: number | null
          registro_actividad_id: string
          tipo_poda: Database["public"]["Enums"]["tipo_poda"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          nro_hojas_removidas?: number | null
          registro_actividad_id: string
          tipo_poda: Database["public"]["Enums"]["tipo_poda"]
        }
        Update: {
          created_at?: string | null
          id?: string
          nro_hojas_removidas?: number | null
          registro_actividad_id?: string
          tipo_poda?: Database["public"]["Enums"]["tipo_poda"]
        }
        Relationships: [
          {
            foreignKeyName: "detalle_poda_registro_actividad_id_fkey"
            columns: ["registro_actividad_id"]
            isOneToOne: false
            referencedRelation: "registro_actividad"
            referencedColumns: ["id"]
          },
        ]
      }
      detalle_riego: {
        Row: {
          created_at: string | null
          id: string
          ph_agua: number | null
          registro_actividad_id: string
          temperatura_agua: number | null
          volumen_ml: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ph_agua?: number | null
          registro_actividad_id: string
          temperatura_agua?: number | null
          volumen_ml?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ph_agua?: number | null
          registro_actividad_id?: string
          temperatura_agua?: number | null
          volumen_ml?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "detalle_riego_registro_actividad_id_fkey"
            columns: ["registro_actividad_id"]
            isOneToOne: false
            referencedRelation: "registro_actividad"
            referencedColumns: ["id"]
          },
        ]
      }
      espacio: {
        Row: {
          created_at: string | null
          id: string
          nombre: string
          parametros_ambientales: Json | null
          tipo: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nombre: string
          parametros_ambientales?: Json | null
          tipo?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nombre?: string
          parametros_ambientales?: Json | null
          tipo?: string | null
        }
        Relationships: []
      }
      etapa: {
        Row: {
          created_at: string | null
          duracion_tipica_dias: number | null
          id: string
          nombre: string
        }
        Insert: {
          created_at?: string | null
          duracion_tipica_dias?: number | null
          id?: string
          nombre: string
        }
        Update: {
          created_at?: string | null
          duracion_tipica_dias?: number | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      genetica: {
        Row: {
          created_at: string | null
          fenotipo: string | null
          id: string
          nombre: string
        }
        Insert: {
          created_at?: string | null
          fenotipo?: string | null
          id?: string
          nombre: string
        }
        Update: {
          created_at?: string | null
          fenotipo?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      mapa_posicion: {
        Row: {
          capacidad: number | null
          created_at: string | null
          espacio_id: string
          etiqueta: string
          id: string
        }
        Insert: {
          capacidad?: number | null
          created_at?: string | null
          espacio_id: string
          etiqueta: string
          id?: string
        }
        Update: {
          capacidad?: number | null
          created_at?: string | null
          espacio_id?: string
          etiqueta?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mapa_posicion_espacio_id_fkey"
            columns: ["espacio_id"]
            isOneToOne: false
            referencedRelation: "espacio"
            referencedColumns: ["id"]
          },
        ]
      }
      nota_imagen: {
        Row: {
          contenido: string | null
          created_at: string | null
          id: string
          registro_actividad_id: string
          url: string
        }
        Insert: {
          contenido?: string | null
          created_at?: string | null
          id?: string
          registro_actividad_id: string
          url: string
        }
        Update: {
          contenido?: string | null
          created_at?: string | null
          id?: string
          registro_actividad_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "nota_imagen_registro_actividad_id_fkey"
            columns: ["registro_actividad_id"]
            isOneToOne: false
            referencedRelation: "registro_actividad"
            referencedColumns: ["id"]
          },
        ]
      }
      planta: {
        Row: {
          archivada: boolean | null
          created_at: string | null
          etiqueta: string
          fecha_siembra: string
          genetica_id: string | null
          id: string
          notas_resumen: string | null
          user_id: string
        }
        Insert: {
          archivada?: boolean | null
          created_at?: string | null
          etiqueta: string
          fecha_siembra: string
          genetica_id?: string | null
          id?: string
          notas_resumen?: string | null
          user_id: string
        }
        Update: {
          archivada?: boolean | null
          created_at?: string | null
          etiqueta?: string
          fecha_siembra?: string
          genetica_id?: string | null
          id?: string
          notas_resumen?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "planta_genetica_id_fkey"
            columns: ["genetica_id"]
            isOneToOne: false
            referencedRelation: "genetica"
            referencedColumns: ["id"]
          },
        ]
      }
      registro_actividad: {
        Row: {
          admin_id: string
          created_at: string | null
          fecha_hora: string | null
          id: string
          planta_id: string
          resumen: string | null
          tipo_actividad: Database["public"]["Enums"]["tipo_actividad"]
        }
        Insert: {
          admin_id: string
          created_at?: string | null
          fecha_hora?: string | null
          id?: string
          planta_id: string
          resumen?: string | null
          tipo_actividad: Database["public"]["Enums"]["tipo_actividad"]
        }
        Update: {
          admin_id?: string
          created_at?: string | null
          fecha_hora?: string | null
          id?: string
          planta_id?: string
          resumen?: string | null
          tipo_actividad?: Database["public"]["Enums"]["tipo_actividad"]
        }
        Relationships: [
          {
            foreignKeyName: "registro_actividad_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "administrador"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registro_actividad_planta_id_fkey"
            columns: ["planta_id"]
            isOneToOne: false
            referencedRelation: "planta"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      tipo_actividad:
        | "RIEGO"
        | "PODA"
        | "FOTO"
        | "NOTA"
        | "NUTRIENTES"
        | "CAMBIO_ETAPA"
      tipo_nutriente: "VEGA" | "FLORA"
      tipo_poda: "APICAL" | "LST" | "DEFOLIACION"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      tipo_actividad: [
        "RIEGO",
        "PODA",
        "FOTO",
        "NOTA",
        "NUTRIENTES",
        "CAMBIO_ETAPA",
      ],
      tipo_nutriente: ["VEGA", "FLORA"],
      tipo_poda: ["APICAL", "LST", "DEFOLIACION"],
    },
  },
} as const
