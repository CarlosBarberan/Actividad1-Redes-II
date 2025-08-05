import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(products => ({
        products: products.map(product => ({
          id: product.id,
          name: product.title,
          description: product.description,
          price: product.price,
          image: product.images[0] || 'https://via.placeholder.com/400x300?text=No+Image',
          category: product.category?.name || 'Sin categoría',
          rating: Math.floor(Math.random() * 2) + 4, // Rating aleatorio entre 4-5
          stock: Math.floor(Math.random() * 50) + 10 // Stock aleatorio entre 10-60
        }))
      }))
    );
  }
} 