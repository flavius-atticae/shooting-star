import type { Meta, StoryObj } from '@storybook/react';

// Introduction component as a simple React component
const Introduction = () => {
  return (
    <div style={{ 
      fontFamily: 'Barlow, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px',
      color: '#5e4530'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ 
          fontFamily: 'The Seasons, serif',
          fontSize: '48px',
          color: '#618462',
          marginBottom: '12px'
        }}>
          Système de Design Pauline Roussel
        </h1>
        <p style={{ 
          fontSize: '18px',
          color: '#af6868',
          fontStyle: 'italic',
          margin: '0'
        }}>
          Guide des composants pour l'accompagnement périnatal
        </p>
      </header>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ 
          fontFamily: 'The Seasons, serif',
          color: '#618462',
          fontSize: '32px'
        }}>
          À propos de Pauline Roussel
        </h2>
        <div style={{ 
          backgroundColor: '#ffddd3',
          padding: '24px',
          borderRadius: '12px',
          borderLeft: '4px solid #618462'
        }}>
          <p style={{ margin: '0', lineHeight: '1.6' }}>
            <strong>Pauline Roussel</strong> est une professionnelle passionnée spécialisée dans l'accompagnement périnatal au Québec. Elle offre des services de yoga prénatal et postnatal, d'accompagnement à la naissance, et de soutien aux nouvelles familles.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ 
          fontFamily: 'The Seasons, serif',
          color: '#618462',
          fontSize: '32px'
        }}>
          Palette de couleurs authentique
        </h2>
        <p style={{ marginBottom: '24px' }}>
          Notre palette de couleurs reflète l'authenticité et la bienveillance de l'approche de Pauline Roussel :
        </p>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {[
            { name: 'Vert Principal', color: '#618462', emoji: '🌿' },
            { name: 'Rose Accent', color: '#af6868', emoji: '🌹' },
            { name: 'Bleu Secondaire', color: '#517982', emoji: '🌊' },
            { name: 'Beige Chaleureux', color: '#ceaf9b', emoji: '☕' }
          ].map(({ name, color, emoji }) => (
            <div key={color} style={{
              backgroundColor: color,
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              color: color === '#ceaf9b' ? '#5e4530' : 'white'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{emoji}</div>
              <div style={{ fontWeight: 'bold' }}>{name}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{color}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ 
          fontFamily: 'The Seasons, serif',
          color: '#618462',
          fontSize: '32px'
        }}>
          Typographie expressive
        </h2>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontFamily: 'The Seasons, serif',
            fontSize: '28px',
            color: '#618462'
          }}>
            The Seasons - Titres
          </h3>
          <p>Police serif élégante pour les titres principaux et l'expression de l'élégance naturelle.</p>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ 
            fontFamily: 'Moontime, cursive',
            fontSize: '24px',
            color: '#af6868'
          }}>
            Moontime - Accents
          </h4>
          <p>Police décorative cursive pour les éléments distinctifs et les touches d'authenticité.</p>
        </div>
        
        <div>
          <h4 style={{ 
            fontFamily: 'Barlow, sans-serif',
            fontSize: '20px',
            color: '#517982'
          }}>
            Barlow - Corps de texte
          </h4>
          <p>Police sans-serif claire et moderne pour le contenu principal, optimisée pour la lisibilité et l'accessibilité.</p>
        </div>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ 
          fontFamily: 'The Seasons, serif',
          color: '#618462',
          fontSize: '32px'
        }}>
          Principes de design
        </h2>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            { title: '🤱 Bienveillance', bg: '#dae6ea', desc: 'Chaque interaction doit transmettre chaleur et soutien aux futures et nouvelles mamans dans leur parcours unique.' },
            { title: '🌿 Authenticité', bg: '#ffddd3', desc: 'Refléter l\'approche naturelle et personnalisée de Pauline Roussel, en privilégiant l\'humain avant tout.' },
            { title: '♿ Accessibilité', bg: '#f5f4f2', desc: 'Conformité WCAG 2.1 AA pour une expérience inclusive, particulièrement importante pour les femmes enceintes et nouvelles mères.' }
          ].map(({ title, bg, desc }) => (
            <div key={title} style={{
              backgroundColor: bg,
              padding: '24px',
              borderRadius: '12px'
            }}>
              <h3 style={{ 
                fontFamily: 'The Seasons, serif',
                color: '#618462',
                marginTop: '0'
              }}>
                {title}
              </h3>
              <p style={{ margin: '0' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ 
        textAlign: 'center',
        backgroundColor: '#ceaf9b',
        padding: '32px',
        borderRadius: '12px',
        marginTop: '48px'
      }}>
        <p style={{ 
          fontSize: '18px',
          fontStyle: 'italic',
          margin: '0 0 12px 0'
        }}>
          "Accompagner avec authenticité et bienveillance chaque étape du voyage vers la maternité"
        </p>
        <p style={{ 
          fontFamily: 'Moontime, cursive',
          color: '#618462',
          fontSize: '16px',
          margin: '0'
        }}>
          — Pauline Roussel
        </p>
      </footer>
    </div>
  );
};

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => <Introduction />,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};