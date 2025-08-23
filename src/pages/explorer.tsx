import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './explorer.module.css';

interface DocItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  path: string;
  icon: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
}

const documentationItems: DocItem[] = [
  // Guías Esenciales
  {
    id: 'install',
    title: 'Instalación de Claude Code',
    description: 'Guía completa de instalación paso a paso para todos los sistemas operativos',
    category: 'Guías Esenciales', 
    path: '/docs/guias/instalacion',
    icon: '🚀',
    tags: ['instalación', 'setup', 'requisitos'],
    difficulty: 'beginner',
    featured: true
  },
  {
    id: 'first-steps',
    title: 'Primeros Pasos',
    description: 'Tu primer proyecto con Claude Code - Tutorial paso a paso para principiantes',
    category: 'Guías Esenciales',
    path: '/docs/guias/primeros-pasos', 
    icon: '👶',
    tags: ['tutorial', 'principiantes', 'básico'],
    difficulty: 'beginner',
    featured: true
  },
  {
    id: 'concepts',
    title: 'Conceptos Básicos',
    description: 'Entiende cómo funciona Claude Code y domina sus conceptos fundamentales',
    category: 'Guías Esenciales',
    path: '/docs/guias/conceptos-basicos',
    icon: '🧠',
    tags: ['conceptos', 'fundamentos', 'teoría'],
    difficulty: 'beginner',
    featured: true
  },

  // Recursos y Herramientas
  {
    id: 'repositories',
    title: 'Repositorios Útiles',
    description: 'Colección curada de repositorios, templates y recursos para Claude Code',
    category: 'Recursos',
    path: '/docs/recursos/repositorios-utiles',
    icon: '📦',
    tags: ['repositorios', 'templates', 'recursos'],
    difficulty: 'beginner',
    featured: true
  },
  {
    id: 'templates',
    title: 'Claude Code Templates',
    description: '100+ templates y agentes pre-construidos por la comunidad',
    category: 'Recursos', 
    path: '/docs/recursos/repositorios-utiles#claude-code-templates-davila7',
    icon: '🎯',
    tags: ['templates', 'agentes', 'comunidad'],
    difficulty: 'intermediate'
  },
  {
    id: 'configurations',
    title: 'Configuraciones Optimizadas',
    description: 'Configuraciones recomendadas para máxima productividad',
    category: 'Recursos',
    path: '/docs/recursos/configuraciones-optimizadas',
    icon: '⚙️', 
    tags: ['configuración', 'productividad', 'optimización'],
    difficulty: 'intermediate'
  },

  // Casos de Uso
  {
    id: 'ai-development',
    title: 'Desarrollo con IA',
    description: 'Casos de uso para integrar Claude Code en proyectos de inteligencia artificial',
    category: 'Casos de Uso',
    path: '/docs/casos-uso/ai-development',
    icon: '🤖',
    tags: ['ia', 'desarrollo', 'integración'],
    difficulty: 'intermediate'
  },
  {
    id: 'automation', 
    title: 'Automatización',
    description: 'Automatiza tareas repetitivas y workflows con Claude Code',
    category: 'Casos de Uso',
    path: '/docs/casos-uso/automation',
    icon: '⚡',
    tags: ['automatización', 'workflows', 'eficiencia'],
    difficulty: 'intermediate'
  },

  // Proyectos Reales
  {
    id: 'documentation-center',
    title: 'Centro de Documentación',
    description: 'Cómo construimos este centro de documentación con Docusaurus y Claude Code',
    category: 'Proyectos',
    path: '/docs/proyectos/centro-documentacion-docusaurus',
    icon: '📚',
    tags: ['docusaurus', 'documentación', 'proyecto real'],
    difficulty: 'advanced'
  },
  {
    id: 'screenshot-automation',
    title: 'Automatización de Screenshots',
    description: 'Sistema automatizado de capturas de pantalla con Puppeteer',
    category: 'Proyectos',
    path: '/docs/proyectos/automatizacion-screenshots-puppeteer',
    icon: '📸',
    tags: ['puppeteer', 'screenshots', 'automatización'],
    difficulty: 'advanced'
  }
];

const categories = [
  'Todos',
  'Guías Esenciales', 
  'Recursos',
  'Casos de Uso',
  'Proyectos'
];

const difficultyLevels = [
  'Todos',
  'beginner',
  'intermediate', 
  'advanced'
];

const difficultyLabels = {
  'Todos': 'Todos los niveles',
  'beginner': 'Principiante',
  'intermediate': 'Intermedio',
  'advanced': 'Avanzado'
};

export default function DocumentationExplorer(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');

  const filteredItems = useMemo(() => {
    return documentationItems.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'Todos' || item.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const featuredItems = documentationItems.filter(item => item.featured);

  return (
    <Layout
      title="Explorador de Documentación"
      description="Explora toda la documentación de Claude Code de forma organizada e interactiva">
      
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              EXPLORADOR DE <span className={styles.highlight}>DOCUMENTACIÓN</span>
            </h1>
            <p className={styles.heroSubtitle}>
              🔍 Encuentra guías, tutoriales y recursos organizados por nivel y categoría
            </p>
            
            <div className={styles.searchPrompt}>
              <p style={{fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9'}}>
                ¿Qué quieres aprender hoy?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container">
        <div className={styles.searchSection}>
          <div className={styles.searchHeader}>
            <h2>🔍 Buscar documentación</h2>
            <p>Encuentra la información que necesitas de forma rápida y organizada</p>
          </div>
          
          <div className={styles.searchControls}>
            <input
              type="text"
              placeholder="Buscar documentación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <span>tipo:</span>
              {categories.map(category => (
                <button
                  key={category}
                  className={clsx(
                    styles.filterBtn,
                    selectedCategory === category && styles.active
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} 
                  {category !== 'Todos' && (
                    <span className={styles.count}>
                      ({documentationItems.filter(item => item.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <span>nivel:</span>
              {difficultyLevels.map(level => (
                <button
                  key={level}
                  className={clsx(
                    styles.filterBtn,
                    selectedDifficulty === level && styles.active
                  )}
                  onClick={() => setSelectedDifficulty(level)}
                >
                  {difficultyLabels[level]}
                  {level !== 'Todos' && (
                    <span className={styles.count}>
                      ({documentationItems.filter(item => item.difficulty === level).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Items */}
        {selectedCategory === 'Todos' && searchTerm === '' && (
          <div className={styles.featuredSection}>
            <h3 className={styles.sectionTitle}>⭐ Destacados para Principiantes</h3>
            <div className={styles.itemsGrid}>
              {featuredItems.map(item => (
                <DocCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* All Items */}
        <div className={styles.itemsSection}>
          <h3 className={styles.sectionTitle}>
            📚 {searchTerm ? `Resultados para "${searchTerm}"` : 'Toda la Documentación'} 
            <span className={styles.count}>({filteredItems.length})</span>
          </h3>
          
          <div className={styles.itemsGrid}>
            {filteredItems.map(item => (
              <DocCard key={item.id} item={item} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className={styles.noResults}>
              <p>No se encontraron resultados para tu búsqueda.</p>
              <p>Intenta con otros términos o revisa todas las categorías.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function DocCard({ item }: { item: DocItem }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#22c55e';
      case 'intermediate': return '#f59e0b'; 
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <a href={item.path} className={styles.docCard}>
      <div className={styles.cardHeader}>
        <div className={styles.icon}>{item.icon}</div>
        <div className={styles.category}>{item.category.toUpperCase()}</div>
      </div>
      
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDescription}>{item.description}</p>
      
      <div className={styles.cardFooter}>
        <div className={styles.tags}>
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div 
          className={styles.difficulty}
          style={{ color: getDifficultyColor(item.difficulty) }}
        >
          {difficultyLabels[item.difficulty]}
        </div>
      </div>
    </a>
  );
}