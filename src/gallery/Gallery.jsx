import { Link } from 'react-router-dom'
import { pages } from '../pages'
import './Gallery.css'

export default function Gallery() {
  return (
    <div className="gallery">
      <header className="gallery-header">
        <h1 className="gallery-title">JSX Gallery</h1>
        <p className="gallery-subtitle">
          {pages.length} interface{pages.length !== 1 ? 's' : ''}
        </p>
      </header>

      {pages.length === 0 ? (
        <div className="gallery-empty">
          <p>Aucune interface enregistrée.</p>
          <p className="gallery-empty-hint">
            Déposez vos fichiers .jsx dans <code>src/pages/</code> puis
            enregistrez-les dans <code>src/pages.js</code>.
          </p>
        </div>
      ) : (
        <div className="gallery-grid">
          {pages.map((page) => (
            <Link
              key={page.id}
              to={`/view/${page.id}`}
              className="gallery-card"
            >
              <div className="gallery-card-preview">
                <span className="gallery-card-icon">&#9670;</span>
              </div>
              <div className="gallery-card-info">
                <h2 className="gallery-card-title">{page.title}</h2>
                {page.description && (
                  <p className="gallery-card-desc">{page.description}</p>
                )}
              </div>
              <div className="gallery-card-arrow">&rarr;</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
