import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import { Customer } from '../../models/cliente.model';

@Component({
  selector: 'app-clients-list',
  imports: [CommonModule],
  templateUrl: './clients-list.html',
  styleUrl: './clients-list.css',
})
export class ClientsList implements OnInit {
  clientes: Customer[] = [];
  clientesFiltrados: Customer[] = [];
  filtroEstado: string = 'TODOS';
  loading = true;
  error: string | null = null;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;

    this.clientesService.getCustomers({ limit: 100, orderBy: 'ultima_interaccion', orderDirection: 'DESC' }).subscribe({
      next: (response) => {
        this.clientes = response.data;
        this.clientesFiltrados = this.clientes;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.error = err.message || 'Error al cargar clientes';
        this.loading = false;
      }
    });
  }

  filtrarPorEstado(estado: string): void {
    this.filtroEstado = estado;
    if (estado === 'TODOS') {
      this.clientesFiltrados = this.clientes;
    } else {
      this.clientesFiltrados = this.clientes.filter(c => c.status === estado);
    }
  }

  getEstadoBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'new': 'bg-gray-100 text-gray-800',
      'interested': 'bg-blue-100 text-blue-800',
      'negotiating': 'bg-yellow-100 text-yellow-800',
      'ready_to_book': 'bg-orange-100 text-orange-800',
      'booked': 'bg-green-100 text-green-800',
      'past_customer': 'bg-purple-100 text-purple-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  getTierBadgeClass(tier: string): string {
    const classes: { [key: string]: string } = {
      'hot': 'bg-red-100 text-red-800',
      'warm': 'bg-orange-100 text-orange-800',
      'cold': 'bg-blue-100 text-blue-800',
      'customer': 'bg-green-100 text-green-800'
    };
    return classes[tier] || 'bg-gray-100 text-gray-800';
  }

  formatStatus(status: string): string {
    const labels: { [key: string]: string } = {
      'new': 'Nuevo',
      'interested': 'Interesado',
      'negotiating': 'Negociando',
      'ready_to_book': 'Listo para Reservar',
      'booked': 'Reservado',
      'past_customer': 'Cliente Anterior'
    };
    return labels[status] || status;
  }

  formatTier(tier: string): string {
    const labels: { [key: string]: string } = {
      'hot': 'Hot',
      'warm': 'Warm',
      'cold': 'Cold',
      'customer': 'Cliente'
    };
    return labels[tier] || tier;
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
