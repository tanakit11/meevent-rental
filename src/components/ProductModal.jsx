import { useState, useEffect } from 'react'
import { FB } from '../data/initialData'

export default function ProductModal({ product, cats, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '', cat: cats[0] || '', price: '', desc: '',
    img: '', icon: '📦', fb: FB, status: 'active'
  })
  const [imgErr, setImgErr] = useState(false)

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        cat: product.cat,
        price: product.price,
        desc: product.desc,
        img: product.img || '',
        icon: product.icon || '📦',
        fb: product.fb || FB,
        status: product.status,
      })
    } else {
      setForm({ name: '', cat: cats.filter(c => c !== 'ทั้งหมด')[0] || '', price: '', desc: '', img: '', icon: '📦', fb: FB, status: 'active' })
    }
    setImgErr(false)
  }, [product, cats])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    onSave({
      ...form,
      price: parseInt(form.price) || 0,
      name: form.name || 'สินค้าใหม่',
    })
  }

  const filteredCats = cats.filter(c => c !== 'ทั้งหมด')

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3 className="modal-title">{product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</h3>

        <div className="form-group">
          <label className="form-label">ชื่อสินค้า</label>
          <input className="form-input" type="text" placeholder="เช่น โต๊ะกลม 10 ที่นั่ง"
            value={form.name} onChange={e => set('name', e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">หมวดหมู่</label>
            <select className="form-input" value={form.cat} onChange={e => set('cat', e.target.value)}>
              {filteredCats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">ราคา (บาท/วัน)</label>
            <input className="form-input" type="number" placeholder="500"
              value={form.price} onChange={e => set('price', e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">คำอธิบาย</label>
          <input className="form-input" type="text" placeholder="รายละเอียดสินค้า"
            value={form.desc} onChange={e => set('desc', e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">
            <i className="ti ti-photo" style={{ fontSize: '15px', verticalAlign: '-2px' }} aria-hidden="true"></i> URL รูปภาพสินค้า
          </label>
          <input className="form-input" type="url" placeholder="https://example.com/image.jpg"
            value={form.img} onChange={e => { set('img', e.target.value); setImgErr(false) }} />
          <div className="img-preview-box">
            {form.img && !imgErr ? (
              <img src={form.img} alt="preview" onError={() => setImgErr(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span className="no-img">
                <i className="ti ti-photo-off" aria-hidden="true"></i>{' '}
                {imgErr ? 'โหลดรูปไม่ได้ — ตรวจสอบ URL' : 'ยังไม่มีรูปภาพ'}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">ไอคอน Emoji (ใช้เมื่อไม่มีรูป)</label>
          <input className="form-input" type="text" placeholder="🎪" maxLength={4}
            value={form.icon} onChange={e => set('icon', e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">ลิงก์ Facebook (URL)</label>
          <input className="form-input" type="url" placeholder="https://www.facebook.com/..."
            value={form.fb} onChange={e => set('fb', e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">สถานะ</label>
          <select className="form-input" value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="active">แสดง (Active)</option>
            <option value="draft">แบบร่าง (Draft)</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>ยกเลิก</button>
          <button className="btn-save" onClick={handleSave}>
            <i className="ti ti-check" aria-hidden="true"></i> บันทึก
          </button>
        </div>
      </div>
    </div>
  )
}
