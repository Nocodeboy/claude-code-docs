import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Academy NoCode - Claude Code
        </Heading>
        <p className="hero__subtitle">Aprende Claude Code con Germán Huertas - El centro más completo en español 🚀</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/explorer"
            style={{marginRight: '10px'}}>
            🔍 Explorar Documentación
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/intro">
            📚 Empezar Tutorial
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: 'Proyectos Reales',
      emoji: '🚀',
      description: 'Aplicaciones completas desarrolladas con Claude Code, desde scripts simples hasta aplicaciones web complejas con IA integrada.',
      link: '/docs/proyectos',
    },
    {
      title: 'Herramientas y Extensiones',
      emoji: '🛠️',
      description: 'Extensiones de VS Code, templates de proyectos, workflows optimizados y integraciones con GitHub y Docker.',
      link: '/docs/herramientas',
    },
    {
      title: 'Guías Paso a Paso',
      emoji: '📖',
      description: 'Desde la instalación inicial hasta técnicas avanzadas. Aprende a dominar Claude Code desde cero hasta experto.',
      link: '/docs/guias',
    },
    {
      title: 'Recursos Descargables',
      emoji: '📦',
      description: 'Code snippets, configuraciones optimizadas, templates de proyectos y checklists para acelerar tu desarrollo.',
      link: '/docs/recursos',
    },
    {
      title: 'Automatización Inteligente',
      emoji: '🤖',
      description: 'Scripts que automatizan tareas de desarrollo usando IA: code review, documentación, testing y más.',
      link: '/docs/casos-uso/automation',
    },
    {
      title: 'Integración con IA',
      emoji: '🧠',
      description: 'Proyectos que combinan Claude Code con otras herramientas de IA para crear soluciones innovadoras.',
      link: '/docs/casos-uso/ai-development',
    },
  ];

  return (
    <section className="padding-vert--xl">
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2">¿Qué encontrarás en Academy NoCode?</Heading>
          <p style={{fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-600)'}}>
            El centro de documentación en español más completo sobre Claude Code con Germán Huertas
          </p>
        </div>
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <div className="text--center">
                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
                  {feature.emoji}
                </div>
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.description}</p>
                <Link
                  className="button button--primary button--sm"
                  to={feature.link}>
                  Explorar →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text--center margin-top--xl">
          <Heading as="h3">¿Qué es Claude Code?</Heading>
          <p style={{fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', marginBottom: '2rem'}}>
            Claude Code es el CLI oficial de Anthropic que revoluciona el desarrollo de software. 
            Funciona directamente en tu terminal e IDE, comprende codebases completos, edita archivos, 
            ejecuta comandos y crea commits automáticamente usando inteligencia artificial.
          </p>
          
          <div className="row">
            <div className="col col--6">
              <div className="card">
                <div className="card__header">
                  <h4>💻 Para Desarrolladores</h4>
                </div>
                <div className="card__body">
                  <p>Aprende con Germán Huertas cómo convertir ideas en código funcional, automatizar tareas de desarrollo y dominar Claude Code desde cero.</p>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <div className="card">
                <div className="card__header">
                  <h4>🎯 Para la Comunidad</h4>
                </div>
                <div className="card__body">
                  <p>Únete a Academy NoCode y aprende junto a otros desarrolladores. Construyamos juntos el futuro del desarrollo con IA.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{marginTop: '2rem'}}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              🚀 Comenzar mi viaje con Academy NoCode
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageShowcase() {
  return (
    <section className="padding-vert--lg" style={{backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">Proyectos Reales en Funcionamiento</Heading>
          <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-700)'}}>
            Explora screenshots de proyectos reales desarrollados completamente con Claude Code
          </p>
        </div>
        
        <div className="row">
          <div className="col col--6 margin-bottom--lg">
            <div className="card" style={{height: '100%'}}>
              <div className="card__image">
                <img src="/img/projects/documentation-center/homepage.png" alt="Centro de Documentación" style={{borderRadius: '8px 8px 0 0'}} />
              </div>
              <div className="card__body">
                <h3>Centro de Documentación</h3>
                <p>Este mismo sitio web creado desde cero en 35 minutos usando Claude Code. Incluye homepage, blog, navegación y deployment automático.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--primary" to="/docs/proyectos/centro-documentacion-docusaurus">Ver Proyecto →</Link>
              </div>
            </div>
          </div>
          
          <div className="col col--6 margin-bottom--lg">
            <div className="card" style={{height: '100%'}}>
              <div className="card__image">
                <img src="/img/projects/documentation-center/blog.png" alt="Automatización Screenshots" style={{borderRadius: '8px 8px 0 0'}} />
              </div>
              <div className="card__body">
                <h3>Screenshots Automáticos</h3>
                <p>Integración de Puppeteer para capturar automáticamente screenshots del proyecto. Script completo funcionando en menos de 30 segundos.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--secondary" to="/docs/proyectos/automatizacion-screenshots-puppeteer">Ver Proyecto →</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text--center margin-top--lg">
          <Link
            className="button button--outline button--lg"
            to="/docs/proyectos">
            📚 Ver Todos los Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Academy NoCode - Centro Claude Code"
      description="Aprende Claude Code con Germán Huertas. El centro de documentación en español más completo con proyectos, herramientas y guías paso a paso.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageShowcase />
      </main>
    </Layout>
  );
}