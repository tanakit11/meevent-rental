import ProductCard from './ProductCard'
import { useState } from 'react'

export default function HomePage({ products, cats, onNavigate }) {
  const [activeCat, setActiveCat] = useState('ทั้งหมด')

  const activeProducts = products.filter(p => p.status === 'active')
  const filtered = activeCat === 'ทั้งหมด'
    ? activeProducts
    : activeProducts.filter(p => p.cat === activeCat)

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-tag">✦ บริการระดับพรีเมียม</div>
        <h1>เช่าสินค้าและจัดสถานที่<br /><span>ครบวงจร สวยงาม</span></h1>
        <p>บริการเช่าอุปกรณ์งานแต่ง งานเลี้ยง สัมมนา และตกแต่งสถานที่ทุกรูปแบบ</p>
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => document.getElementById('cat-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <i className="ti ti-search" aria-hidden="true"></i> ดูสินค้าทั้งหมด
          </button>
          <button className="btn-outline">
            <i className="ti ti-phone" aria-hidden="true"></i> ติดต่อเรา
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-num">{activeProducts.length}</div>
          <div className="stat-label">รายการสินค้า</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">{cats.filter(c => c !== 'ทั้งหมด').length}</div>
          <div className="stat-label">หมวดหมู่</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">500+</div>
          <div className="stat-label">งานที่ผ่านมา</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">★ 4.9</div>
          <div className="stat-label">คะแนนรีวิว</div>
        </div>
      </div>

      {/* Products */}
      <div className="main-content" id="cat-section">
        <h2 className="section-title">สินค้า<span>ให้เช่า</span></h2>
        <p className="section-sub">เลือกดูสินค้าตามหมวดหมู่ที่ต้องการ</p>

        <div className="categories">
          {cats.map(c => (
            <button
              key={c}
              className={`cat-pill${c === activeCat ? ' active' : ''}`}
              onClick={() => setActiveCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              ไม่พบสินค้าในหมวดหมู่นี้
            </div>
          ) : (
            filtered.map(p => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </div>

      <footer>
        © 2024 <span>GrandRent</span> — บริการเช่าสินค้าและจัดสถานที่ครบวงจร
      </footer>
    </div>
  )
}
