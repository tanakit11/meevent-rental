import { useState } from 'react'
import { FB } from '../data/initialData'

function ProductImage({ product }) {
  const [imgError, setImgError] = useState(false)

  if (product.img && !imgError) {
    return (
      <>
        <img
          src={product.img}
          alt={product.name}
          onError={() => setImgError(true)}
        />
        <span className="product-badge">ให้เช่า</span>
      </>
    )
  }
  return (
    <>
      <div className="img-fallback">{product.icon || '📦'}</div>
      <span className="product-badge">ให้เช่า</span>
    </>
  )
}

export default function ProductCard({ product }) {
  return (
    <div className="product-card" onClick={() => window.open(product.fb || FB, '_blank')}>
      <div className="product-img">
        <ProductImage product={product} />
      </div>
      <div className="product-body">
        <div className="product-cat">{product.cat}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-desc">{product.desc}</div>
        <div className="product-footer">
          <div className="product-price">
            {Number(product.price).toLocaleString()} <span>บาท/วัน</span>
          </div>
          <button
            className="btn-fb"
            onClick={(e) => {
              e.stopPropagation()
              window.open(product.fb || FB, '_blank')
            }}
          >
            <i className="ti ti-brand-facebook" aria-hidden="true"></i> ดูเพิ่มเติม
          </button>
        </div>
      </div>
    </div>
  )
}
