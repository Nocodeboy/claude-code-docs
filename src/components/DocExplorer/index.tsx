import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface QuickStartProps {
  title: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
    code?: string;
    action?: string;
  }>;
}

export function QuickStart({ title, description, steps }: QuickStartProps): JSX.Element {
  return (
    <div className={styles.quickStart}>
      <h2>{title}</h2>
      <p>{description}</p>
      
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepNumber}>{index + 1}</div>
            <div className={styles.stepContent}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {step.code && (
                <div className={styles.codeBlock}>
                  <code>{step.code}</code>
                  <button className={styles.copyButton}>Copy</button>
                </div>
              )}
              {step.action && (
                <div className={styles.actionBlock}>
                  {step.action}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Buscar documentación..." }: SearchBarProps): JSX.Element {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchIcon}>🔍</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
      />
      {value && (
        <button 
          className={styles.clearButton}
          onClick={() => onChange('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}

interface FilterTagsProps {
  tags: Array<{
    id: string;
    label: string;
    count?: number;
  }>;
  selectedTag: string;
  onTagSelect: (tagId: string) => void;
}

export function FilterTags({ tags, selectedTag, onTagSelect }: FilterTagsProps): JSX.Element {
  return (
    <div className={styles.filterTags}>
      {tags.map(tag => (
        <button
          key={tag.id}
          className={clsx(
            styles.filterTag,
            selectedTag === tag.id && styles.active
          )}
          onClick={() => onTagSelect(tag.id)}
        >
          {tag.label}
          {tag.count !== undefined && (
            <span className={styles.tagCount}>({tag.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}

interface DocCardProps {
  title: string;
  description: string;
  category: string;
  icon: string;
  link: string;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
}

export function DocCard({ 
  title, 
  description, 
  category, 
  icon, 
  link, 
  tags = [], 
  difficulty,
  featured 
}: DocCardProps): JSX.Element {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return '#22c55e';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <a href={link} className={clsx(styles.docCard, featured && styles.featured)}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <span className={styles.cardCategory}>{category}</span>
      </div>
      
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      
      <div className={styles.cardFooter}>
        <div className={styles.cardTags}>
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className={styles.cardTag}>{tag}</span>
          ))}
        </div>
        {difficulty && (
          <span 
            className={styles.cardDifficulty}
            style={{ color: getDifficultyColor(difficulty) }}
          >
            {difficulty === 'beginner' ? 'Principiante' : 
             difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
          </span>
        )}
      </div>
      
      {featured && <div className={styles.featuredBadge}>⭐ Destacado</div>}
    </a>
  );
}