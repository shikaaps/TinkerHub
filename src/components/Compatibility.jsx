import React, {useState} from 'react'

export default function Compatibility({ aliens }){
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState(null)

  function compute(){
    const A = aliens.find(x=>x.id===a)
    const B = aliens.find(x=>x.id===b)
    if(!A||!B||A.id===B.id) return
    let score = 50
    if(A.species===B.species) score+=20
    if(A.atmosphere===B.atmosphere) score+=10
    if(A.diet===B.diet) score+=10
    const eyeDiff = Math.abs((A.eyes||0)-(B.eyes||0))
    score -= eyeDiff*3
    if(A.appendages===B.appendages) score+=5
    if(A.transportation===B.transportation) score+=5
    score = Math.max(0, Math.min(100, Math.round(score)))
    let label='UNDEFINED'
    let explanation=''
    if(score>85){ label='COSMIC SOULMATES'; explanation='Their quantum fields hum in perfect harmony.' }
    else if(score>60){ label='PROMISING'; explanation='Mostly compatible with occasional dimensional hiccups.' }
    else if(score>35){ label='MEDICALLY CONCERNING'; explanation='May require masks, disclaimers, and a waiver.' }
    else { label='PLANETARY HAZARD'; explanation='Pairing may destabilize local ecosystems.' }
    setResult({score,label,explanation,A,B})
  }

  return (
    <div className="compat">
      <div className="pick">
        <select value={a} onChange={e=>setA(e.target.value)}>
          <option value="">Choose Alien A</option>
          {aliens.map(x=> <option key={x.id} value={x.id}>{x.name} — {x.species}</option>)}
        </select>
        <select value={b} onChange={e=>setB(e.target.value)}>
          <option value="">Choose Alien B</option>
          {aliens.map(x=> <option key={x.id} value={x.id}>{x.name} — {x.species}</option>)}
        </select>
        <button onClick={compute}>CALCULATE COMPATIBILITY</button>
      </div>
      {result && (
        <div className="result">
          <div className="label">{result.label}</div>
          <div className="score">{result.score}%</div>
          <div className="explain">{result.explanation}</div>
          <div className="details">{result.A.name} + {result.B.name}</div>
        </div>
      )}
    </div>
  )
}
