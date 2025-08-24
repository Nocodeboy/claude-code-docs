/**
 * Tools Detail Page
 * Academy NoCode - Handle individual tool details with URL parameters
 */
import React from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import { getToolById, TOOLS_DATA, CATEGORY_LABELS, CATEGORY_ICONS } from '../data/toolsData';
import ToolDirectory from '../components/ToolDirectory';
import styles from './tools.module.css';

export default function ToolsPage(): JSX.Element {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const toolId = urlParams.get('id');

  // If no tool ID is provided, show the directory
  if (!toolId) {
    return (
      <Layout
        title="Directorio de Herramientas"
        description="Descubre las mejores herramientas para desarrollo web, automatización, diseño y más. Encuentra la herramienta perfecta para tu próximo proyecto."
      >
        <main>
          <ToolDirectory />
        </main>
      </Layout>
    );
  }

  const tool = getToolById(toolId);

  if (!tool) {
    return (
      <Layout title="Herramienta no encontrada">
        <main className={styles.notFound}>
          <div className={styles.notFoundContent}>
            <h1>Herramienta no encontrada</h1>
            <p>La herramienta que buscas no existe o ha sido movida.</p>
            <Link to="/tools" className={styles.backButton}>
              ← Volver al Directorio
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

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

  // Get related tools (same category, exclude current)
  const relatedTools = TOOLS_DATA
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <Layout
      title={tool.name}
      description={tool.shortDescription}
    >
      <main className={styles.toolDetailPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link to="/tools">Herramientas</Link>
          <span className={styles.separator}>›</span>
          <span>{CATEGORY_LABELS[tool.category]}</span>
          <span className={styles.separator}>›</span>
          <span>{tool.name}</span>
        </div>

        {/* Tool Header */}
        <header className={styles.toolHeader}>
          <div className={styles.toolHeaderContent}>
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
              <div className={styles.toolMeta}>
                <span className={styles.category}>
                  {CATEGORY_ICONS[tool.category]} {CATEGORY_LABELS[tool.category]}
                </span>
                {tool.subcategory && (
                  <span className={styles.subcategory}>• {tool.subcategory}</span>
                )}
                {tool.isRecommended && (
                  <span className={styles.recommendedBadge}>⭐ Recomendado</span>
                )}
              </div>

              <h1 className={styles.toolName}>{tool.name}</h1>
              <p className={styles.toolDescription}>{tool.shortDescription}</p>

              <div className={styles.toolBadges}>
                <span className={pricingBadge.className}>
                  {pricingBadge.label}
                </span>
                <span className={difficultyBadge.className}>
                  {difficultyBadge.label}
                </span>
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
                  <span className={styles.popularityText}>
                    {tool.popularity}/10 Popularidad
                  </span>
                </div>
              </div>

              <div className={styles.toolActions}>
                <Link
                  to={tool.website}
                  className={styles.primaryAction}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🌐 Visitar Sitio Web
                </Link>
                {tool.documentation && (
                  <Link
                    to={tool.documentation}
                    className={styles.secondaryAction}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📚 Documentación
                  </Link>
                )}
                {tool.github && (
                  <Link
                    to={tool.github}
                    className={styles.secondaryAction}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Sections */}
        <div className={styles.toolContent}>
          <div className={styles.mainContent}>
            {/* Screenshots */}
            {tool.screenshots.length > 0 && (
              <section className={styles.screenshotsSection}>
                <h2>Capturas de Pantalla</h2>
                <div className={styles.screenshotsGrid}>
                  {tool.screenshots.map((screenshot, index) => (
                    <div key={index} className={styles.screenshotItem}>
                      <img 
                        src={screenshot} 
                        alt={`${tool.name} screenshot ${index + 1}`}
                        onError={(e) => {
                          e.currentTarget.src = '/img/tools/placeholder-screenshot.png';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Description */}
            <section className={styles.descriptionSection}>
              <h2>Descripción</h2>
              <p>{tool.description}</p>
            </section>

            {/* Features */}
            <section className={styles.featuresSection}>
              <h2>Características Principales</h2>
              <ul className={styles.featuresList}>
                {tool.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>

            {/* Use Cases */}
            <section className={styles.useCasesSection}>
              <h2>Casos de Uso</h2>
              <ul className={styles.useCasesList}>
                {tool.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </section>

            {/* Alternatives */}
            {tool.alternatives.length > 0 && (
              <section className={styles.alternativesSection}>
                <h2>Alternativas</h2>
                <div className={styles.alternativesList}>
                  {tool.alternatives.map((alternative, index) => (
                    <span key={index} className={styles.alternativeTag}>
                      {alternative}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Tool Tags */}
            <div className={styles.sidebarSection}>
              <h3>Tecnologías</h3>
              <div className={styles.tagsList}>
                {tool.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div className={styles.sidebarSection}>
              <h3>Plataformas</h3>
              <div className={styles.platformsList}>
                {tool.platforms.map((platform, index) => (
                  <span key={index} className={styles.platformTag}>
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            {tool.languages && tool.languages.length > 0 && (
              <div className={styles.sidebarSection}>
                <h3>Lenguajes</h3>
                <div className={styles.languagesList}>
                  {tool.languages.map((language, index) => (
                    <span key={index} className={styles.languageTag}>
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Integrations */}
            {tool.integrations && tool.integrations.length > 0 && (
              <div className={styles.sidebarSection}>
                <h3>Integraciones</h3>
                <ul className={styles.integrationsList}>
                  {tool.integrations.map((integration, index) => (
                    <li key={index}>{integration}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tool Info */}
            <div className={styles.sidebarSection}>
              <h3>Información</h3>
              <div className={styles.toolStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Última actualización:</span>
                  <span className={styles.statValue}>
                    {new Date(tool.lastUpdated).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className={styles.relatedSection}>
            <h2>Herramientas Relacionadas</h2>
            <div className={styles.relatedGrid}>
              {relatedTools.map(relatedTool => (
                <Link 
                  key={relatedTool.id}
                  to={`/tools?id=${relatedTool.id}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedLogo}>
                    <img 
                      src={relatedTool.logo} 
                      alt={`${relatedTool.name} logo`}
                      onError={(e) => {
                        e.currentTarget.src = '/img/tools/default-tool-logo.svg';
                      }}
                    />
                  </div>
                  <div className={styles.relatedInfo}>
                    <h3>{relatedTool.name}</h3>
                    <p>{relatedTool.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Directory */}
        <div className={styles.backToDirectory}>
          <Link to="/tools" className={styles.backButton}>
            ← Volver al Directorio de Herramientas
          </Link>
        </div>
      </main>
    </Layout>
  );
}