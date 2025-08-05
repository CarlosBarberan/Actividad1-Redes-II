import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'Todos';
  searchTerm: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.products;
        this.filteredProducts = [...this.products];
        this.categories = ['Todos', ...new Set(this.products.map(p => p.category))];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los productos. Por favor, intenta de nuevo.';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = 'Todos';
    this.searchTerm = '';
    this.filteredProducts = [...this.products];
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'Todos' || product.category === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  getStarRating(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    if (hasHalfStar) {
      stars.push('☆');
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push('☆');
    }
    
    return stars;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }
} 