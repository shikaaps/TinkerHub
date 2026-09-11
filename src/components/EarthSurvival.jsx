import React, {useState} from 'react'

function randomSplit(total, parts){
  const arr = []
  let left = total
  for(let i=0;i<parts-1;i++){ const v = Math.max(0, Math.floor(Math.random()*left)); arr.push(v); left -= v }
  arr.push(left)
  return arr
}

export default function EarthSurvival({ alien }){
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function run(){
    setLoading(true)
    setResult(null)
    // multi-step dramatic loading
    await new Promise(r=>setTimeout(r,600))
    await new Promise(r=>setTimeout(r,800))
    await new Promise(r=>setTimeout(r,700))
    const base = Math.floor(10 + Math.random()*80)
    const parts = randomSplit(base,5)
    setResult({total:base, physical:parts[0], social:parts[1], economic:parts[2], coffee:parts[3], discovery:parts[4], reasons:['Allergic to asphalt','Steals garden gnomes','Loves spicy coffee']})
    setLoading(false)
  }

  return (
    <div className="earth-survival">
      <button onClick={run} disabled={loading}>CALCULATE MY EARTH SURVIVAL RATE</button>
      {loading && <div className="loading">SCANNING: <span className="dots">...</span></div>}
      {result && (
        <div className="res">
          <div className="total">Survival: {result.total}%</div>
          <div>Physical: {result.physical}%</div>
          <div>Social: {result.social}%</div>
          <div>Economic: {result.economic}%</div>
          <div>Coffee Survival: {result.coffee}%</div>
          <div>Alien Discovery Risk: {result.discovery}%</div>
          <div className="reasons">Reasons: {result.reasons.join(', ')}</div>
        </div>
      )}
    </div>
  )
}
