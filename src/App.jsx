import React, {useEffect, useMemo, useState} from 'react'
import baseAliens from './data/aliens'
import NavBar from './components/NavBar'
import ProfileCard from './components/ProfileCard'
import Filters from './components/Filters'
import CreateAlien from './components/CreateAlien'
import Compatibility from './components/Compatibility'
import Translator from './components/Translator'
import EarthSurvival from './components/EarthSurvival'

function useLocalStorage(key, initial){
  const [state, setState] = useState(()=>{
    try{ const s = localStorage.getItem(key); return s? JSON.parse(s): initial }catch(e){ return initial }
  })
  useEffect(()=>{ localStorage.setItem(key, JSON.stringify(state)) },[key,state])
  return [state, setState]
}

export default function App(){
  const [view, setView] = useState('PROFILES')
  const [zeroG, setZeroG] = useLocalStorage('am_zero_g', false)
  const [abducted, setAbducted] = useLocalStorage('am_abducted', [])
  const [created, setCreated] = useLocalStorage('am_created', [])
  const [systemMessages, setSystemMessages] = useState([])

  const allAliens = useMemo(()=> [...baseAliens, ...created], [created])

  function onAbduct(id){
    if(abducted.includes(id)) return
    const next = [...abducted, id]
    setAbducted(next)
    const who = allAliens.find(a=>a.id===id)
    const msg = `ABDUCTION LOG: ${who?.name||id} successfully abducted. Reproductive waiver index +5.`
    setSystemMessages(m=>[msg,...m].slice(0,6))
  }

  function onCreate(obj){
    const avatarSeed = obj.name + Date.now()
    const alien = {...obj, id: obj.id || 'c'+Date.now(), name: obj.name||'Unnamed', avatarSeed}
    setCreated(prev=>[alien,...prev])
    setView('PROFILES')
    setSystemMessages(m=>[`CREATION: ${alien.name} added to registry.`,...m].slice(0,6))
  }

  const [filters, setFilters] = useState({species:'',appendages:'',atmosphere:'',diet:'',eyes:'',transportation:'',lifespan:''})

  function resetFilters(){ setFilters({species:'',appendages:'',atmosphere:'',diet:'',eyes:'',transportation:'',lifespan:''}) }

  const speciesOptions = Array.from(new Set(allAliens.map(a=>a.species))).filter(Boolean)
  const appendOptions = Array.from(new Set(allAliens.map(a=>a.appendages))).filter(Boolean)
  const atmosphereOptions = Array.from(new Set(allAliens.map(a=>a.atmosphere))).filter(Boolean)
  const dietOptions = Array.from(new Set(allAliens.map(a=>a.diet))).filter(Boolean)
  const transportOptions = Array.from(new Set(allAliens.map(a=>a.transportation))).filter(Boolean)

  const filtered = allAliens.filter(a=>{
    if(filters.species && a.species!==filters.species) return false
    if(filters.appendages && a.appendages!==filters.appendages) return false
    if(filters.atmosphere && a.atmosphere!==filters.atmosphere) return false
    if(filters.diet && a.diet!==filters.diet) return false
    if(filters.eyes && String(a.eyes)!==filters.eyes) return false
    if(filters.transportation && a.transportation!==filters.transportation) return false
    if(filters.lifespan){
      if(filters.lifespan==='short' && a.lifespan>=50) return false
      if(filters.lifespan==='medium' && (a.lifespan<50||a.lifespan>500)) return false
      if(filters.lifespan==='long' && a.lifespan<=500) return false
    }
    return true
  })

  useEffect(()=>{
    document.body.classList.toggle('zero-g', !!zeroG)
  },[zeroG])

  return (
    <div className="app">
      <NavBar view={view} setView={setView} zeroG={zeroG} setZeroG={setZeroG} />
      <div className="container">
        <aside className="left">
          <Filters filters={filters} setFilters={setFilters} reset={resetFilters} speciesOptions={speciesOptions} appendOptions={appendOptions} atmosphereOptions={atmosphereOptions} dietOptions={dietOptions} transportOptions={transportOptions} />
          <div className="messages">
            {systemMessages.map((m,i)=>(<div key={i} className="msg">{m}</div>))}
          </div>
        </aside>
        <main className="main">
          {view==='PROFILES' && (
            <div>
              <div className="grid">
                {filtered.map(a=> (
                  <ProfileCard key={a.id} alien={a} onAbduct={onAbduct} zeroG={zeroG} />
                ))}
              </div>
            </div>
          )}

          {view==='ABDUCTED' && (
            <div className="abducted">
              <h2>ABDUCTED MATCHES</h2>
              <div className="grid">
                {abducted.length===0 && <div className="none">No abducted aliens yet.</div>}
                {abducted.map(id=>{
                  const a = allAliens.find(x=>x.id===id)
                  return a? <ProfileCard key={id} alien={a} onAbduct={()=>{}} zeroG={zeroG} />: null
                })}
              </div>
            </div>
          )}

          {view==='COMPATIBILITY' && <Compatibility aliens={allAliens} />}
          {view==='TRANSLATOR' && <Translator />}
          {view==='EARTH SURVIVAL' && <div className="survival-panel"><EarthSurvival /></div>}
          {view==='CREATE ALIEN' && <CreateAlien onCreate={onCreate} />}
        </main>
      </div>
    </div>
  )
}
