import { useParams, Link } from 'react-router-dom'
import { pages } from '../pages'

export default function PageViewer() {
  const { pageId } = useParams()
  const page = pages.find((p) => p.id === pageId)

  if (!page) {
    return (
      <div style={styles.notFound}>
        <p>Interface introuvable : <code>{pageId}</code></p>
        <Link to="/" style={styles.backLink}>&larr; Retour à la galerie</Link>
      </div>
    )
  }

  const Component = page.component

  return (
    <div style={styles.viewer}>
      <Link to="/" style={styles.backButton} title="Retour à la galerie">
        &larr;
      </Link>
      <div style={styles.content}>
        <Component />
      </div>
    </div>
  )
}

const styles = {
  viewer: {
    position: 'relative',
    minHeight: '100vh',
  },
  backButton: {
    position: 'fixed',
    top: 12,
    left: 12,
    zIndex: 10000,
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(10, 10, 15, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '1.1rem',
    backdropFilter: 'blur(8px)',
    transition: 'background 0.2s',
  },
  content: {
    minHeight: '100vh',
  },
  notFound: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    background: '#0a0a0f',
    color: '#888',
    fontFamily: 'monospace',
  },
  backLink: {
    color: '#6a6a90',
    textDecoration: 'none',
    fontSize: '0.875rem',
  },
}
