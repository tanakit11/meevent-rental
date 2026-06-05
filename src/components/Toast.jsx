import { useEffect } from 'react'

export default function Toast({ message, onHide }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onHide, 2500)
    return () => clearTimeout(t)
  }, [message, onHide])

  return (
    <div className={`toast${message ? ' show' : ''}`}>
      {message}
    </div>
  )
}
