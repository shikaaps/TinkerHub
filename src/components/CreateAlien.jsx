import React, {useState} from 'react'

const blank = {name:'',species:'',planet:'',eyes:2,arms:2,appendages:'',atmosphere:'oxygen',diet:'omnivore',temperature:'temperate',lifespan:100,transportation:'walk',travelSpeed:'moderate',earthHabits:'',redFlags:'',greenFlags:'',biography:''}

export default function CreateAlien({ onCreate }){
  const [form, setForm] = useState(blank)
  function update(k,v){ setForm(prev=>({...prev,[k]:v})) }
  function submit(e){
    e.preventDefault()
    const id = 'u'+Date.now()
    onCreate({...form,id})
    setForm(blank)
  }
  return (
    <form className="create" onSubmit={submit}>
      <div className="col">
        <input placeholder="Name" value={form.name} onChange={e=>update('name',e.target.value)} required />
        <input placeholder="Species" value={form.species} onChange={e=>update('species',e.target.value)} />
        <input placeholder="Planet" value={form.planet} onChange={e=>update('planet',e.target.value)} />
        <input placeholder="Appendages" value={form.appendages} onChange={e=>update('appendages',e.target.value)} />
        <input placeholder="Atmosphere" value={form.atmosphere} onChange={e=>update('atmosphere',e.target.value)} />
      </div>
      <div className="col">
        <input type="number" placeholder="Eyes" value={form.eyes} onChange={e=>update('eyes',Number(e.target.value))} />
        <input type="number" placeholder="Arms" value={form.arms} onChange={e=>update('arms',Number(e.target.value))} />
        <input type="number" placeholder="Lifespan" value={form.lifespan} onChange={e=>update('lifespan',Number(e.target.value))} />
        <input placeholder="Transportation" value={form.transportation} onChange={e=>update('transportation',e.target.value)} />
        <input placeholder="Travel Speed" value={form.travelSpeed} onChange={e=>update('travelSpeed',e.target.value)} />
      </div>
      <textarea placeholder="Biography" value={form.biography} onChange={e=>update('biography',e.target.value)} />
      <input placeholder="Green Flags" value={form.greenFlags} onChange={e=>update('greenFlags',e.target.value)} />
      <input placeholder="Red Flags" value={form.redFlags} onChange={e=>update('redFlags',e.target.value)} />
      <button type="submit">Create Alien</button>
    </form>
  )
}
