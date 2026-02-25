import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Stats } from '../../models/cliente.model';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics implements OnChanges {
  @Input() estadisticas!: Stats;

  // Configuración de gráfica de destinos
  destinosChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Consultas por Destino',
      data: [],
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      borderWidth: 1,
      borderRadius: 8,
    }]
  };

  destinosChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, SF Pro Display'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, SF Pro Display'
          }
        }
      }
    }
  };

  // Configuración de gráfica de objeciones
  objecionesChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#ef4444',
        '#f59e0b',
        '#3b82f6',
        '#10b981',
        '#8b5cf6',
        '#ec4899',
        '#6b7280'
      ],
      borderWidth: 0,
    }]
  };

  objecionesChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 15,
          font: {
            family: '-apple-system, BlinkMacSystemFont, SF Pro Display',
            size: 12
          },
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    }
  };

  // Configuración de gráfica de clasificadores
  clasificadoresChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#10b981',
        '#3b82f6',
        '#f59e0b',
        '#8b5cf6',
        '#6b7280'
      ],
      borderWidth: 0,
    }]
  };

  clasificadoresChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            family: '-apple-system, BlinkMacSystemFont, SF Pro Display',
            size: 12
          },
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estadisticas'] && this.estadisticas) {
      this.updateCharts();
    }
  }

  private updateCharts(): void {
    // Actualizar gráfica de destinos
    this.destinosChartData.labels = this.estadisticas.popular_destinations.map(d => d.destination);
    this.destinosChartData.datasets[0].data = this.estadisticas.popular_destinations.map(d => parseInt(d.count) || 0);

    // Actualizar gráfica de tipos de consulta (inquiry types)
    const inquiryTypes = [
      { label: 'Investigación de Destino', value: parseInt(this.estadisticas.inquiries.type_destination_research) || 0 },
      { label: 'Consulta de Precio', value: parseInt(this.estadisticas.inquiries.type_pricing) || 0 },
      { label: 'Solicitud de Reserva', value: parseInt(this.estadisticas.inquiries.type_booking_request) || 0 },
      { label: 'Planificación de Itinerario', value: parseInt(this.estadisticas.inquiries.type_itinerary) || 0 }
    ].filter(item => item.value > 0);

    this.objecionesChartData.labels = inquiryTypes.map(t => t.label);
    this.objecionesChartData.datasets[0].data = inquiryTypes.map(t => t.value);

    // Actualizar gráfica de clasificación por tier
    const tiers = [
      { label: 'Hot (Muy Interesado)', value: parseInt(this.estadisticas.customers.tier_hot) || 0 },
      { label: 'Warm (Interesado)', value: parseInt(this.estadisticas.customers.tier_warm) || 0 },
      { label: 'Cold (Poco Interés)', value: parseInt(this.estadisticas.customers.tier_cold) || 0 },
      { label: 'Cliente', value: parseInt(this.estadisticas.customers.tier_customer) || 0 }
    ].filter(item => item.value > 0);

    this.clasificadoresChartData.labels = tiers.map(t => t.label);
    this.clasificadoresChartData.datasets[0].data = tiers.map(t => t.value);
  }

  private formatObjecionLabel(tipo: string): string {
    const labels: { [key: string]: string } = {
      'PRECIO_ALTO': 'Precio Alto',
      'FECHAS_NO_DISPONIBLES': 'Fechas No Disponibles',
      'DESTINO_NO_DESEADO': 'Destino No Deseado',
      'FALTA_INFORMACION': 'Falta Información',
      'COMPARANDO_OPCIONES': 'Comparando Opciones',
      'NO_ES_MOMENTO': 'No es Momento',
      'OTROS': 'Otros'
    };
    return labels[tipo] || tipo;
  }

  private formatClasificadorLabel(tipo: string): string {
    const labels: { [key: string]: string } = {
      'CLIENTE_POTENCIAL_ALTA': 'Alta Prioridad',
      'CLIENTE_POTENCIAL_MEDIA': 'Media Prioridad',
      'CLIENTE_POTENCIAL_BAJA': 'Baja Prioridad',
      'SOLO_INFORMACION': 'Solo Información',
      'NO_CALIFICADO': 'No Calificado'
    };
    return labels[tipo] || tipo;
  }
}
