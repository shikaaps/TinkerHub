import React, {useState} from 'react'

export default function ProfileCard({ alien, onAbduct, zeroG }){
  const [abducting, setAbducting] = useState(false)
  const avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(alien.name+alien.id)}`

  function handleAbduct(){
    setAbducting(true)
    setTimeout(()=>{
      onAbduct(alien.id)
      setAbducting(false)
    },1200)
  }

  return (
    <div className={`card ${zeroG? 'zero-g':''} ${abducting? 'abducting':''}`}>
      <div className="avatar-wrap">
        <img src={avatar} alt="avatar" className="avatar" />
        <div className="beam" />
      </div>
      <div className="info">
        <div className="name">{alien.name} <span className="species">{alien.species}</span></div>
        <div className="meta">{alien.planet} — {alien.appendages} — {alien.eyes} eyes</div>
        <div className="bio">{alien.biography}</div>
        <div className="attrs">
          <div>Atmosphere: {alien.atmosphere}</div>
          <div>Diet: {alien.diet}</div>
          <div>Lifespan: {alien.lifespan}</div>
          <div>Transport: {alien.transportation}</div>
        </div>
        <div className="flags"><strong>Green:</strong> {alien.greenFlags} <strong>Red:</strong> {alien.redFlags}</div>
      </div>
      <div className="actions">
        <button className="abduct" onClick={handleAbduct}>ABDUCT</button>
      </div>
    </div>
  )
}
