import { useState } from 'react'
import ProductModal from './ProductModal'

function ThumbCell({ product }) {
  const [err, setErr] = useState(false)
  if (product.img && !err) {
    return <img className="thumb-preview" src={product.img} alt="" onError={() => setErr(true)} />
  }
  return <div className="thumb-fallback">{product.icon || '📦'}</div>
}

export default function AdminPage({ state, onUpdate, onLogout, showToast }) {
  const [tab, setTab] = useState('dashboard')
  const [filter, setFilter] = useState('')
  const [modal, setModal] = useState(null) // null = closed, 'new', or product object
  const [newCat, setNewCat] = useState('')

  const { products, cats } = state

  const filteredProducts = filter
    ? products.filter(p => p.name.toLowerCase().includes(filter) || p.cat.toLowerCase().includes(filter))
    : products

  const saveProduct = (data) => {
    if (modal && modal !== 'new') {
      onUpdate({
        ...state,
        products: state.products.map(p => p.id === modal.id ? { ...p, ...data } : p)
      })
      showToast('แก้ไขสินค้าแล้ว')
    } else {
      onUpdate({
        ...state,
        products: [...state.products, { id: state.nextId, ...data }],
        nextId: state.nextId + 1
      })
      showToast('เพิ่มสินค้าใหม่แล้ว')
    }
    setModal(null)
  }

  const delProduct = (id) => {
    onUpdate({ ...state, products: state.products.filter(p => p.id !== id) })
    showToast('ลบสินค้าแล้ว')
  }

  const addCategory = () => {
    if (!newCat.trim()) return
    if (cats.includes(newCat.trim())) { showToast('หมวดหมู่นี้มีอยู่แล้ว'); return }
    onUpdate({ ...state, cats: [...cats, newCat.trim()] })
    setNewCat('')
    showToast(`เพิ่มหมวดหมู่ "${newCat.trim()}" แล้ว`)
  }

  const delCat = (c) => {
    onUpdate({ ...state, cats: cats.filter(x => x !== c) })
    showToast('ลบหมวดหมู่แล้ว')
  }

  const active = products.filter(p => p.status === 'active').length
  const draft = products.filter(p => p.status === 'draft').length

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-section">
          <div style={{ color: 'var(--gold)', fontFamily: "'Playfair Display',serif", fontSize: '18px', marginBottom: '4px' }}>GrandRent</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>ระบบจัดการ</div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-label">เมนูหลัก</div>
          {[
            { key: 'dashboard', icon: 'ti-layout-dashboard', label: 'Dashboard' },
            { key: 'products', icon: 'ti-package', label: 'จัดการสินค้า' },
            { key: 'categories', icon: 'ti-tags', label: 'หมวดหมู่' },
          ].map(item => (
            <div
              key={item.key}
              className={`sidebar-item${tab === item.key ? ' active' : ''}`}
              onClick={() => setTab(item.key)}
            >
              <i className={`ti ${item.icon}`} aria-hidden="true"></i> {item.label}
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: '24px', width: '200px', padding: '0 20px' }}>
          <div className="sidebar-item" onClick={onLogout}>
            <i className="ti ti-logout" aria-hidden="true"></i> ออกจากระบบ
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="admin-main">
        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div>
            <div className="admin-header">
              <h2 className="admin-title">Dashboard</h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>ยินดีต้อนรับ, Admin</span>
            </div>
            <div className="admin-stats">
              <div className="astat"><div className="astat-label"><i className="ti ti-package" aria-hidden="true"></i> สินค้าทั้งหมด</div><div className="astat-val gold">{products.length}</div></div>
              <div className="astat"><div className="astat-label"><i className="ti ti-tags" aria-hidden="true"></i> หมวดหมู่</div><div className="astat-val">{cats.filter(c => c !== 'ทั้งหมด').length}</div></div>
              <div className="astat"><div className="astat-label"><i className="ti ti-eye" aria-hidden="true"></i> สินค้าที่แสดง</div><div className="astat-val">{active}</div></div>
              <div className="astat"><div className="astat-label"><i className="ti ti-archive" aria-hidden="true"></i> แบบร่าง</div><div className="astat-val">{draft}</div></div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #E8E8E8' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                ไปที่ <b>จัดการสินค้า</b> เพื่อเพิ่มหรือแก้ไขสินค้า รองรับการใส่ลิงก์รูปภาพ URL จากอินเทอร์เน็ต
              </p>
              <button className="btn-add" onClick={() => setTab('products')}>
                <i className="ti ti-arrow-right" aria-hidden="true"></i> ไปจัดการสินค้า
              </button>
            </div>
          </div>
        )}

        {/* Products */}
        {tab === 'products' && (
          <div>
            <div className="admin-header">
              <h2 className="admin-title">จัดการสินค้า</h2>
              <button className="btn-add" onClick={() => setModal('new')}>
                <i className="ti ti-plus" aria-hidden="true"></i> เพิ่มสินค้า
              </button>
            </div>
            <div className="admin-table-wrap">
              <div className="table-head">
                <span style={{ fontSize: '14px', fontWeight: 600 }}>รายการสินค้า</span>
                <input
                  className="table-search"
                  type="text"
                  placeholder="ค้นหาสินค้า..."
                  value={filter}
                  onChange={e => setFilter(e.target.value.toLowerCase())}
                />
              </div>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>รูป</th>
                    <th>ชื่อสินค้า</th>
                    <th>หมวดหมู่</th>
                    <th>ราคา/วัน</th>
                    <th>Facebook</th>
                    <th>สถานะ</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id}>
                      <td><ThumbCell product={p} /></td>
                      <td><b>{p.name}</b></td>
                      <td>{p.cat}</td>
                      <td>{Number(p.price).toLocaleString()} บาท</td>
                      <td>
                        <a href={p.fb} target="_blank" rel="noreferrer"
                          style={{ color: '#1877F2', fontSize: '13px' }}>Facebook ↗</a>
                      </td>
                      <td>
                        <span className={`badge ${p.status === 'active' ? 'badge-active' : 'badge-draft'}`}>
                          {p.status === 'active' ? 'แสดง' : 'แบบร่าง'}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn" onClick={() => setModal(p)}>
                          <i className="ti ti-edit" aria-hidden="true"></i> แก้ไข
                        </button>
                        <button className="action-btn del" onClick={() => delProduct(p.id)}>
                          <i className="ti ti-trash" aria-hidden="true"></i> ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories */}
        {tab === 'categories' && (
          <div>
            <div className="admin-header">
              <h2 className="admin-title">จัดการหมวดหมู่</h2>
            </div>
            <div className="cat-manager">
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                เพิ่มหรือลบหมวดหมู่ได้ตามต้องการ อัปเดตทันทีในหน้าลูกค้า
              </p>
              <div className="cat-list">
                {cats.filter(c => c !== 'ทั้งหมด').map(c => (
                  <div key={c} className="cat-tag">
                    <i className="ti ti-tag" style={{ fontSize: '14px', color: 'var(--gold-dark)' }} aria-hidden="true"></i>
                    {c}
                    <button className="cat-del" onClick={() => delCat(c)} aria-label={`ลบ ${c}`}>×</button>
                  </div>
                ))}
              </div>
              <div className="cat-add-row">
                <input
                  className="cat-input"
                  type="text"
                  placeholder="ชื่อหมวดหมู่ใหม่..."
                  value={newCat}
                  onChange={e => setNewCat(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCategory()}
                />
                <button className="btn-add" onClick={addCategory}>
                  <i className="ti ti-plus" aria-hidden="true"></i> เพิ่ม
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal !== null && (
        <ProductModal
          product={modal === 'new' ? null : modal}
          cats={cats}
          onSave={saveProduct}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
