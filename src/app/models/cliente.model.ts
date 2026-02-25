// Customer Models (from API)
export interface Customer {
  id: number;
  subscriber_id: string;
  nombre: string;
  email: string | null;
  telefono: string | null;
  instagram: string | null;
  tier: 'cold' | 'warm' | 'hot' | 'customer';
  status: 'new' | 'interested' | 'negotiating' | 'ready_to_book' | 'booked' | 'past_customer';
  pais_origen: string | null;
  idioma_preferido: string;
  fuente_captura: 'instagram' | 'facebook' | 'whatsapp' | 'n8n';
  score_engagement: number;
  cantidad_interacciones: number;
  fecha_captura: string;
  ultima_interaccion: string;
  notas_agente: string | null;
  created_at: string;
  updated_at: string;
}

// Inquiry Models
export interface Inquiry {
  id: number;
  subscriber_id: string;
  tipo_consulta: string;
  inquiry_type: 'destination_research' | 'pricing_inquiry' | 'booking_request' | 'itinerary_planning' | 'requirements_info' | 'general_question';
  destino_interes: string[];
  fecha_viaje_desde: string | null;
  fecha_viaje_hasta: string | null;
  cantidad_adultos: number;
  cantidad_ninos: number;
  cantidad_bebes: number;
  presupuesto_estimado: 'economico' | 'moderado' | 'alto' | 'lujo' | 'sin_especificar';
  preferencias: string[];
  restricciones: string[];
  estado_consulta: 'nueva' | 'en_proceso' | 'cotizada' | 'cerrada';
  tags: string[];
  keywords: string[];
  notas_consulta: string | null;
  response_message: string | null;
  next_action: string | null;
  fecha_consulta: string;
  created_at: string;
  updated_at: string;
}

// Statistics Models
export interface Stats {
  customers: {
    total_customers: string;
    tier_cold: string;
    tier_warm: string;
    tier_hot: string;
    tier_customer: string;
    status_new: string;
    status_interested: string;
    status_ready_to_book: string;
    status_booked: string;
    avg_score: string;
    total_interactions: string;
  };
  inquiries: {
    total_inquiries: string;
    type_destination_research: string;
    type_pricing: string;
    type_booking_request: string;
    type_itinerary: string;
    status_new: string;
    status_in_progress: string;
    status_quoted: string;
    status_closed: string;
    with_travel_dates: string;
    avg_travelers: string;
  };
  popular_destinations: Array<{ destination: string; count: string }>;
}

// API Response Models
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  filters?: any;
}

// Filter Models
export interface CustomerFilters {
  tier?: string | string[];
  status?: string | string[];
  search?: string;
  score_min?: number;
  score_max?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}
