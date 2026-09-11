import React, {useState} from 'react'

function corrupt(text){
  const glyphs = ['¤','¶','∆','Ω','ø','λ','Ψ','Ȣ']
  return text.split('').map(ch=> Math.random()>0.7? glyphs[Math.floor(Math.random()*glyphs.length)]: (Math.random()>0.6? ch+glyphs[Math.floor(Math.random()*glyphs.length)]: ch)).join('')
}

export default function Translator(){
  const [input, setInput] = useState('')
  const [out, setOut] = useState('')
  const [conf, setConf] = useState(0)

  function translate(){
    setOut(corrupt(input))
    setConf(Math.floor(50+Math.random()*50))
  }

  return (
    <div className="translator">
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Type human text..." />
      <div className="row">
        <button onClick={translate}>GLITCH TRANSLATE</button>
        <div className="conf">Confidence: {conf}%</div>
      </div>
      <div className="output">{out}</div>
    </div>
  )
}
