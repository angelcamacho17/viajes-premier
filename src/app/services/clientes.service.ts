import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError, map } from 'rxjs';
import {
  Customer,
  Inquiry,
  Stats,
  ApiResponse,
  CustomerFilters
} from '../models/cliente.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Health Check
  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get All Customers with Filters
  getCustomers(filters: CustomerFilters = {}): Observable<ApiResponse<Customer[]>> {
    let params = new HttpParams();

    Object.keys(filters).forEach(key => {
      const value = filters[key as keyof CustomerFilters];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => params = params.append(key, v));
        } else {
          params = params.set(key, value.toString());
        }
      }
    });

    return this.http.get<ApiResponse<Customer[]>>(`${this.apiUrl}/api/customers`, { params })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get Single Customer
  getCustomer(subscriberId: string): Observable<ApiResponse<Customer>> {
    return this.http.get<ApiResponse<Customer>>(`${this.apiUrl}/api/customers/${subscriberId}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get Customer Inquiries
  getInquiries(subscriberId: string, limit = 50, offset = 0): Observable<ApiResponse<Inquiry[]>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<ApiResponse<Inquiry[]>>(`${this.apiUrl}/api/inquiries/${subscriberId}`, { params })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get Statistics
  getStats(): Observable<ApiResponse<Stats>> {
    return this.http.get<ApiResponse<Stats>>(`${this.apiUrl}/api/stats`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Error Handler
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.status === 0) {
      // Error de red o CORS
      console.error('Error de red:', error.error);
      errorMessage = 'Error de conexión. Por favor verifica tu conexión a internet.';
    } else {
      // Error del backend
      console.error(`Error ${error.status}:`, error.error);
      errorMessage = error.error?.error || error.error?.message || `Error del servidor (${error.status})`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
