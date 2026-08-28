import { createRoot } from 'react-dom/client'
import { BookViewer } from './components/BookViewer'
import './styles.css'

createRoot(document.getElementById('root')!).render(<BookViewer />)
