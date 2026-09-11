import React from 'react'

export default function NavBar({ view, setView, zeroG, setZeroG }) {
  return (
    <div className="navbar">
      <div className="title">
        <div className="main">ALIEN MATRIMONY</div>
        <div className="sub">Find love beyond the known universe. Medical clearance not included.</div>
      </div>
      <div className="navlinks">
        {['PROFILES','ABDUCTED','COMPATIBILITY','TRANSLATOR','EARTH SURVIVAL','CREATE ALIEN'].map(v=> (
          <button key={v} className={view===v? 'active':''} onClick={()=>setView(v)}>{v}</button>
        ))}
        <label className="zerog">
          ZERO-G
          <input type="checkbox" checked={zeroG} onChange={e=>setZeroG(e.target.checked)} />
        </label>
      </div>
      <div className="status">
        <div>INTERGALACTIC MATRIMONY NETWORK: <span className="online">ONLINE</span></div>
        <div>EARTH COMPATIBILITY: <span className="questionable">QUESTIONABLE</span></div>
      </div>
    </div>
  )
}
