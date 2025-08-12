import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'assets/database.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => ({
        products: data.products
      }))
    );
  }

  getProductsByCategory(category: string): Observable<{ products: Product[] }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => ({
        products: data.products.filter((product: Product) => 
          product.category.toLowerCase() === category.toLowerCase()
        )
      }))
    );
  }

  searchProducts(query: string): Observable<{ products: Product[] }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => ({
        products: data.products.filter((product: Product) => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
      }))
    );
  }
} 