import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  companyInfo = {
    name: 'TechStore',
    founded: '2020',
    mission: 'Proporcionar tecnología de vanguardia accesible para todos',
    vision: 'Ser la tienda de tecnología más confiable y preferida de Latinoamérica'
  };

  team = [
    {
      name: 'Carlos Rodríguez',
      position: 'CEO & Fundador',
      description: 'Apasionado por la tecnología y la innovación',
      avatar: '👨‍💼'
    },
    {
      name: 'Ana García',
      position: 'Directora de Ventas',
      description: 'Experta en relaciones con clientes y estrategias comerciales',
      avatar: '👩‍💼'
    },
    {
      name: 'Miguel Torres',
      position: 'Director Técnico',
      description: 'Especialista en desarrollo de productos tecnológicos',
      avatar: '👨‍💻'
    }
  ];

  values = [
    {
      icon: '🎯',
      title: 'Calidad',
      description: 'Nos comprometemos a ofrecer solo productos de la más alta calidad.'
    },
    {
      icon: '🤝',
      title: 'Confianza',
      description: 'Construimos relaciones duraderas basadas en la confianza mutua.'
    },
    {
      icon: '💡',
      title: 'Innovación',
      description: 'Siempre buscamos las últimas tendencias y tecnologías.'
    },
    {
      icon: '❤️',
      title: 'Servicio',
      description: 'Nuestros clientes son nuestra prioridad número uno.'
    }
  ];
} 