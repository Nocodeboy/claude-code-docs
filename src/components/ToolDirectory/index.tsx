/**
 * ToolDirectory Component
 * Academy NoCode - Main tools directory with search and filters
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Tool, ToolCategory, TOOLS_DATA, CATEGORY_LABELS, CATEGORY_ICONS, getAllCategories } from '../../data/toolsData';
import ToolCard from '../ToolCard';
import styles from './styles.module.css';

interface FilterOptions {
  category: ToolCategory | 'all';
  pricing: 'all' | 'free' | 'freemium' | 'paid' | 'enterprise';
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced';
  isRecommended: boolean;
}

interface SortOptions {
  field: 'name' | 'popularity' | 'lastUpdated';
  order: 'asc' | 'desc';
}

const ToolDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    pricing: 'all',
    difficulty: 'all',
    isRecommended: false
  });
  const [sort, setSort] = useState<SortOptions>({
    field: 'popularity',
    order: 'desc'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get all available categories
  const categories = getAllCategories();

  // Filter and sort tools
  const filteredAndSortedTools = useMemo(() => {
    let filtered = TOOLS_DATA.filter(tool => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.shortDescription.toLowerCase().includes(query) ||
          tool.tags.some(tag => tag.toLowerCase().includes(query)) ||
          tool.features.some(feature => feature.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== 'all' && tool.category !== filters.category) {
        return false;
      }

      // Pricing filter
      if (filters.pricing !== 'all' && tool.pricing !== filters.pricing) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty !== 'all' && tool.difficulty !== filters.difficulty) {
        return false;
      }

      // Recommended filter
      if (filters.isRecommended && !tool.isRecommended) {
        return false;
      }

      return true;
    });

    // Sort tools
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch (sort.field) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'popularity':
          compareValue = a.popularity - b.popularity;
          break;
        case 'lastUpdated':
          compareValue = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;
      }

      return sort.order === 'desc' ? -compareValue : compareValue;
    });

    return filtered;
  }, [searchQuery, filters, sort]);

  // Get category statistics
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = { all: TOOLS_DATA.length };
    
    categories.forEach(category => {
      stats[category] = TOOLS_DATA.filter(tool => tool.category === category).length;
    });

    return stats;
  }, [categories]);

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (field: SortOptions['field']) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc'
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      pricing: 'all',
      difficulty: 'all',
      isRecommended: false
    });
    setSearchQuery('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.pricing !== 'all') count++;
    if (filters.difficulty !== 'all') count++;
    if (filters.isRecommended) count++;
    return count;
  };

  return (
    <div className={styles.toolDirectory}>
      {/* Header Section */}
      <div className={styles.directoryHeader}>
        <div className={styles.headerContent}>
          <h1>Directorio de Herramientas</h1>
          <p>
            Descubre las mejores herramientas para desarrollo web, automatización, diseño y más.
            Encuentra la herramienta perfecta para tu próximo proyecto.
          </p>
        </div>
        
        <div className={styles.headerStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{TOOLS_DATA.length}</span>
            <span className={styles.statLabel}>Herramientas</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{categories.length}</span>
            <span className={styles.statLabel}>Categorías</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {TOOLS_DATA.filter(tool => tool.isRecommended).length}
            </span>
            <span className={styles.statLabel}>Recomendadas</span>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className={styles.searchControls}>
        <div className={styles.searchSection}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="Buscar herramientas, tecnologías, características..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        </div>

        <div className={styles.controlsSection}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
          >
            Filtros {getActiveFiltersCount() > 0 && (
              <span className={styles.filterBadge}>{getActiveFiltersCount()}</span>
            )}
          </button>

          <div className={styles.viewToggle}>
            <button
              onClick={() => setViewMode('grid')}
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
              title="Vista en rejilla"
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              title="Vista en lista"
            >
              ☰
            </button>
          </div>

          <div className={styles.sortControls}>
            <select
              value={sort.field}
              onChange={(e) => handleSortChange(e.target.value as SortOptions['field'])}
              className={styles.sortSelect}
            >
              <option value="popularity">Popularidad</option>
              <option value="name">Nombre</option>
              <option value="lastUpdated">Actualización</option>
            </select>
            <button
              onClick={() => setSort(prev => ({ ...prev, order: prev.order === 'desc' ? 'asc' : 'desc' }))}
              className={styles.sortOrder}
              title={sort.order === 'desc' ? 'Descendente' : 'Ascendente'}
            >
              {sort.order === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filterGroup}>
            <h3>Categoría</h3>
            <div className={styles.filterOptions}>
              <label className={styles.filterOption}>
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={filters.category === 'all'}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                />
                <span>Todas ({categoryStats.all})</span>
              </label>
              {categories.map(category => (
                <label key={category} className={styles.filterOption}>
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  />
                  <span>
                    {CATEGORY_ICONS[category]} {CATEGORY_LABELS[category]} ({categoryStats[category]})
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3>Precio</h3>
            <div className={styles.filterOptions}>
              {['all', 'free', 'freemium', 'paid', 'enterprise'].map(pricing => (
                <label key={pricing} className={styles.filterOption}>
                  <input
                    type="radio"
                    name="pricing"
                    value={pricing}
                    checked={filters.pricing === pricing}
                    onChange={(e) => handleFilterChange('pricing', e.target.value)}
                  />
                  <span>
                    {pricing === 'all' ? 'Todos' : pricing === 'free' ? 'Gratis' :
                     pricing === 'freemium' ? 'Freemium' : pricing === 'paid' ? 'Pago' : 'Enterprise'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3>Dificultad</h3>
            <div className={styles.filterOptions}>
              {['all', 'beginner', 'intermediate', 'advanced'].map(difficulty => (
                <label key={difficulty} className={styles.filterOption}>
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty}
                    checked={filters.difficulty === difficulty}
                    onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  />
                  <span>
                    {difficulty === 'all' ? 'Todas' : difficulty === 'beginner' ? 'Principiante' :
                     difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3>Especiales</h3>
            <div className={styles.filterOptions}>
              <label className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={filters.isRecommended}
                  onChange={(e) => handleFilterChange('isRecommended', e.target.checked)}
                />
                <span>⭐ Solo recomendadas</span>
              </label>
            </div>
          </div>

          <div className={styles.filterActions}>
            <button onClick={clearFilters} className={styles.clearFilters}>
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className={styles.resultsSection}>
        <div className={styles.resultsHeader}>
          <h2>
            {filteredAndSortedTools.length} herramienta{filteredAndSortedTools.length !== 1 ? 's' : ''}
            {searchQuery && (
              <span className={styles.searchContext}> para "{searchQuery}"</span>
            )}
          </h2>
        </div>

        {filteredAndSortedTools.length === 0 ? (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <h3>No se encontraron herramientas</h3>
            <p>Intenta ajustar tus filtros o términos de búsqueda.</p>
            <button onClick={clearFilters} className={styles.resetButton}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className={`${styles.toolGrid} ${styles[viewMode]}`}>
            {filteredAndSortedTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolDirectory;