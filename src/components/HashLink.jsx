import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToId } from '../utils/scroll.js'

/**
 * A link that works whether its target is a section on the home page
 * ("/#services") or a real route ("/ghana"). When already on the target
 * page it smooth-scrolls; otherwise it navigates first, then scrolls
 * once the new page has rendered.
 */
export function HashLink({ to, children, className, onClick, ...rest }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [path, hash] = to.split('#')
  const targetPath = path || '/'

  const handleClick = (event) => {
    event.preventDefault()
    onClick?.(event)

    if (!hash) {
      navigate(targetPath)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (location.pathname === targetPath) {
      scrollToId(hash)
    } else {
      navigate(`${targetPath}#${hash}`)
    }
  }

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
