import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { Button } from '../ui/button';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Herramientas de Desarrollo',
    emoji: '🛠️',
    description: (
      <>
        Directorio completo de herramientas modernas para desarrollo web. 
        React, Next.js, Tailwind CSS, shadcn/ui y más con ejemplos prácticos.
      </>
    ),
    link: '/tools',
  },
  {
    title: 'Proyectos Reales',
    emoji: '🚀',
    description: (
      <>
        Aplicaciones completas desarrolladas con herramientas modernas, 
        desde scripts simples hasta aplicaciones web complejas con IA integrada.
      </>
    ),
    link: '/docs/proyectos',
  },
  {
    title: 'Guías Paso a Paso',
    emoji: '📖',
    description: (
      <>
        Desde la configuración inicial hasta técnicas avanzadas. 
        Aprende desarrollo moderno desde cero hasta nivel experto.
      </>
    ),
    link: '/docs/guias',
  },
  {
    title: 'Automatización Inteligente',
    emoji: '🤖',
    description: (
      <>
        Scripts que automatizan tareas de desarrollo usando herramientas modernas:
        testing, screenshots, deployment y más con Puppeteer y Playwright.
      </>
    ),
    link: '/docs/casos-uso/automation',
  },
  {
    title: 'Integración con IA',
    emoji: '🧠',
    description: (
      <>
        Proyectos que combinan desarrollo moderno con herramientas de IA 
        para crear soluciones innovadoras y aplicaciones inteligentes.
      </>
    ),
    link: '/docs/casos-uso/ai-development',
  },
  {
    title: 'Recursos Descargables',
    emoji: '📦',
    description: (
      <>
        Configuraciones optimizadas, templates de proyectos, snippets de código
        y recursos gratuitos para acelerar tu desarrollo moderno.
      </>
    ),
    link: '/docs/recursos',
  },
];

function Feature({title, emoji, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')} style={{marginBottom: '2rem'}}>
      <div className={styles.featureCard}>
        <div className={styles.featureEmoji}>{emoji}</div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
        <div className={styles.featureButton}>
          <Button asChild variant="default" size="sm">
            <Link to={link}>
              Explorar →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            ¿Qué encontrarás en Academy NoCode?
          </Heading>
          <p className={styles.sectionSubtitle}>
            Todo lo que necesitas para dominar el NoCode y la Inteligencia Artificial
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className={styles.ctaSection}>
          <Button asChild variant="default" size="lg">
            <Link to="/docs/intro">
              🚀 Comenzar mi viaje NoCode
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}