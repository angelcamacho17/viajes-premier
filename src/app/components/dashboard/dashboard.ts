import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Analytics } from '../analytics/analytics';
import { ClientsList } from '../clients-list/clients-list';
import { ClientesService } from '../../services/clientes.service';
import { Stats } from '../../models/cliente.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Analytics, ClientsList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  estadisticas?: Stats;
  loading = true;
  error: string | null = null;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = null;

    this.clientesService.getStats().subscribe({
      next: (response) => {
        this.estadisticas = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas:', err);
        this.error = err.message || 'Error al cargar las estadísticas';
        this.loading = false;
      }
    });
  }
}
