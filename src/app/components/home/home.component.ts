import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'TechStore';
  subtitle = 'Tu tienda de tecnología favorita';
  
  features = [
    {
      icon: '🛒',
      title: 'Productos de Calidad',
      description: 'Ofrecemos los mejores productos tecnológicos con garantía de calidad.'
    },
    {
      icon: '🚚',
      title: 'Envío Rápido',
      description: 'Entrega rápida y segura a cualquier parte del país.'
    },
    {
      icon: '💬',
      title: 'Soporte 24/7',
      description: 'Atención al cliente disponible las 24 horas del día.'
    }
  ];
} 