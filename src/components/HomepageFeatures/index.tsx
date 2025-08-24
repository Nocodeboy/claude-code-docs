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
    title: 'Cursos Estructurados',
    emoji: '📚',
    description: (
      <>
        Aprende NoCode e Inteligencia Artificial con cursos paso a paso, 
        desde nivel básico hasta proyectos avanzados y casos de uso reales.
      </>
    ),
    link: '/docs/cursos/nocode',
  },
  {
    title: 'Herramientas Prácticas',
    emoji: '🛠️',
    description: (
      <>
        Guías completas de las mejores herramientas NoCode del mercado. 
        Bubble, Webflow, Zapier, Airtable y muchas más con ejemplos prácticos.
      </>
    ),
    link: '/docs/herramientas',
  },
  {
    title: 'Proyectos Reales',
    emoji: '🚀',
    description: (
      <>
        Construye aplicaciones, sitios web y automatizaciones reales. 
        Cada proyecto incluye tutorial completo y recursos descargables.
      </>
    ),
    link: '/docs/proyectos',
  },
  {
    title: 'Integración con IA',
    emoji: '🤖',
    description: (
      <>
        Aprende a integrar ChatGPT, Claude, Midjourney y otras herramientas 
        de IA en tus aplicaciones NoCode para crear soluciones innovadoras.
      </>
    ),
    link: '/docs/cursos/ia',
  },
  {
    title: 'Tutoriales Específicos',
    emoji: '💡',
    description: (
      <>
        Soluciones rápidas para problemas específicos. Conectar APIs, 
        automatizar procesos, resolver errores comunes y optimizar rendimiento.
      </>
    ),
    link: '/docs/tutoriales',
  },
  {
    title: 'Recursos Descargables',
    emoji: '📦',
    description: (
      <>
        Plantillas, checklists, templates de Bubble y Webflow, 
        automatizaciones de Zapier y recursos gratuitos para acelerar tu desarrollo.
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