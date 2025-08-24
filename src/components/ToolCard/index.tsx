/**
 * ToolCard Component
 * Academy NoCode - Individual tool display card
 */
import React from 'react';
import Link from '@docusaurus/Link';
import { Tool, CATEGORY_LABELS, CATEGORY_ICONS } from '../../data/toolsData';
import { Badge } from '../ui/badge';
import styles from './styles.module.css';

interface ToolCardProps {
  tool: Tool;
  showFullDescription?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, showFullDescription = false }) => {
  const getPricingBadge = (pricing: string) => {
    const badges = {
      free: { label: 'Gratis', className: styles.badgeFree },
      freemium: { label: 'Freemium', className: styles.badgeFreemium },
      paid: { label: 'Pago', className: styles.badgePaid },
      enterprise: { label: 'Enterprise', className: styles.badgeEnterprise }
    };
    return badges[pricing] || badges.free;
  };

  const getDifficultyBadge = (difficulty: string) => {
    const badges = {
      beginner: { label: 'Principiante', className: styles.badgeBeginner },
      intermediate: { label: 'Intermedio', className: styles.badgeIntermediate },
      advanced: { label: 'Avanzado', className: styles.badgeAdvanced }
    };
    return badges[difficulty] || badges.beginner;
  };

  const pricingBadge = getPricingBadge(tool.pricing);
  const difficultyBadge = getDifficultyBadge(tool.difficulty);

  return (
    <div className={styles.toolCard}>
      {tool.isRecommended && (
        <div className={styles.recommendedBadge}>
          ⭐ Recomendado
        </div>
      )}
      
      <div className={styles.cardHeader}>
        <div className={styles.toolLogo}>
          <img 
            src={tool.logo} 
            alt={`${tool.name} logo`}
            onError={(e) => {
              e.currentTarget.src = '/img/tools/default-tool-logo.svg';
            }}
          />
        </div>
        <div className={styles.toolInfo}>
          <h3 className={styles.toolName}>{tool.name}</h3>
          <div className={styles.toolMeta}>
            <span className={styles.category}>
              {CATEGORY_ICONS[tool.category]} {CATEGORY_LABELS[tool.category]}
            </span>
            {tool.subcategory && (
              <span className={styles.subcategory}>• {tool.subcategory}</span>
            )}
          </div>
        </div>
        <div className={styles.popularityScore}>
          <div className={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={i < Math.round(tool.popularity / 2) ? styles.starFilled : styles.starEmpty}
              >
                ★
              </span>
            ))}
          </div>
          <span className={styles.popularityNumber}>{tool.popularity}/10</span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <p className={styles.toolDescription}>
          {showFullDescription ? tool.description : tool.shortDescription}
        </p>

        <div className={styles.toolTags}>
          {tool.tags.slice(0, 4).map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
          {tool.tags.length > 4 && (
            <span className={styles.tagMore}>+{tool.tags.length - 4}</span>
          )}
        </div>

        <div className={styles.toolBadges}>
          <span className={pricingBadge.className}>
            {pricingBadge.label}
          </span>
          <span className={difficultyBadge.className}>
            {difficultyBadge.label}
          </span>
        </div>

        <div className={styles.toolFeatures}>
          <h4>Características principales:</h4>
          <ul>
            {tool.features.slice(0, 3).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.cardActions}>
        <div className={styles.primaryActions}>
          <Link
            to={tool.website}
            className={styles.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            🌐 Sitio Web
          </Link>
          {tool.documentation && (
            <Link
              to={tool.documentation}
              className={styles.docsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              📚 Docs
            </Link>
          )}
        </div>
        
        <div className={styles.secondaryActions}>
          {tool.github && (
            <Link
              to={tool.github}
              className={styles.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver en GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>
          )}
          <Link
            to={`/tools?id=${tool.id}`}
            className={styles.detailsLink}
            title="Ver detalles completos"
          >
            →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;