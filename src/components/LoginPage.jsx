import { useState } from 'react'

export default function LoginPage({ onLogin, onBack }) {
  const [usr, setUsr] = useState('')
  const [pwd, setPwd] = useState('')
  const [err, setErr] = useState(false)

  const doLogin = () => {
    if (usr === 'admin' && pwd === 'admin1234') {
      setErr(false)
      onLogin()
    } else {
      setErr(true)
      setPwd('')
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          <i className="ti ti-shield-check login-logo-icon" aria-hidden="true"></i>
          <h2 className="login-title">Admin Login</h2>
          <p className="login-sub">เข้าสู่ระบบจัดการหลังบ้าน</p>
        </div>

        <div className="form-group">
          <label className="form-label">ชื่อผู้ใช้</label>
          <input
            className="form-input"
            type="text"
            placeholder="admin"
            value={usr}
            onChange={e => setUsr(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">รหัสผ่าน</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doLogin()}
          />
        </div>

        <button className="btn-login" onClick={doLogin}>
          <i className="ti ti-login" aria-hidden="true"></i> เข้าสู่ระบบ
        </button>

        {err && (
          <div className="login-err">ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</div>
        )}

        <p
          style={{ textAlign: 'center', fontSize: '12px', color: '#aaa', marginTop: '20px', cursor: 'pointer' }}
          onClick={onBack}
        >
          ← กลับหน้าหลัก
        </p>
      </div>
    </div>
  )
}
