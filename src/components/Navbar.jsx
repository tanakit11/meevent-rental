export default function Navbar({ page, onNavigate }) {
  return (
    <nav>
      <div className="nav-brand" onClick={() => onNavigate('home')}>
        <i className="ti ti-diamond" aria-hidden="true"></i>
        <span>MEevent Rental</span>
      </div>
      <div className="nav-links">
        <button
          className={`nav-btn${page === 'home' ? ' act' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <i className="ti ti-home" aria-hidden="true"></i> หน้าแรก
        </button>
        <button
          className="nav-btn"
          onClick={() => {
            onNavigate('home')
            setTimeout(() => {
              document.getElementById('cat-section')?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }}
        >
          <i className="ti ti-package" aria-hidden="true"></i> สินค้า
        </button>
        <button className="nav-btn admin-btn" onClick={() => onNavigate('login')}>
          <i className="ti ti-shield-lock" aria-hidden="true"></i> Admin
        </button>
      </div>
    </nav>
  )
}
