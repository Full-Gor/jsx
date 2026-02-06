import { Routes, Route } from 'react-router-dom'
import Gallery from './gallery/Gallery'
import PageViewer from './gallery/PageViewer'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/view/:pageId" element={<PageViewer />} />
    </Routes>
  )
}
