// Generate an expanded dataset of aliens with required fields.
const speciesList = ['Gleeb','Planthrop','Blobulate','Winged Gnash','Mechanoid','Mimicree','Slick','Crystalline','Synthezoid','Pebblekin','Phantasm','Springling','Elderweed','Gasling','Cycloid']
const planets = ['Xanth-3','Vera Prime','Oo','Khaos IV','Ironge','Mirrorus','Mire-9','Shard','BetaNet','Granite','Shade','Boing','Grand','Bub','Orbitus']
const appendages = ['tentacles','leaves','pseudopods','wings','antennae','mirrors','flippers','spines','cables','rocks','whispers','springs','roots','bubbles','rings']
const atmospheres = ['methane','oxygen','ammonia','carbon-dioxide','hydrogen','argon','sulfur','vacuum','neon','thin','ethereal','nitrogen-rich','oxygen-rich','helium','mixed']
const transports = ['warp-pod','vine-sling','teleport-hop','glide-suit','crawler-legs','slide-portals','buoy','quantum-slide','hover-train','roll','glide','bounce','root-walk','drift','orbit-walk']
const speeds = ['instant','slow','fast','moderate','subspace-sprint','grind','float','very slow','steady','boing','silent']
const occupations = ['Collector','Gardener','Archivist','Pilot','Engineer','Mirror-ceramist','Moisture Technician','Crystal Singer','Net Operator','Stone Keeper','Dream Listener','Bounce Instructor','Grand Provider','Party Host','Orbital Dancer']
const languages = ['Universal','Clicks','Photonic','Telepathic','Binary','Chorus','Vibrational','Glyphs','Whispers','Static']

function mkName(i){
  const syll = ['Zr','Mrr','Q','Ve','Tor','Ze','Glo','Ha','Pre','Nu','Ix','Spr','O','Fi','Vr']
  return syll[i%syll.length] + (i+3)
}

function randomPick(arr, i){ return arr[i % arr.length] }

const baseAliens = []
for(let i=0;i<75;i++){
  const species = randomPick(speciesList, i)
  const planet = randomPick(planets, i+2)
  const app = randomPick(appendages, i+3)
  const atm = randomPick(atmospheres, i+4)
  const transport = randomPick(transports, i+5)
  const speed = randomPick(speeds, i+6)
  const occupation = randomPick(occupations, i+7)
  const language = randomPick(languages, i+8)
  const name = mkName(i)
  const age = 10 + (i*7)%500
  const height = (50 + (i*3)%200) + ' cm'
  const bio = `${name} is a ${occupation.toLowerCase()} from ${planet} who prefers ${atm} environments.`
  const red = ['eats houseplants','steals umbrellas','absorbs furniture','screeches at dawn','overindexes on spreadsheets','imitates voicemail','melts socks','shards are sharp','auto-deletes feelings','very heavy','talks through walls','sudden launch','overly nostalgic','evaporates in sunlight','sings in orbits'][i%15]
  const green = ['will share spores','gives shade','excellent foot warmer','polishes your tools','repairs toaster','excellent at compliments','gives goo hugs','gives clear advice','updates firmware','never yells','excellent listener','great at trampoline dates','bakes nutrient cakes','cheerful presence','keeps you centered'][i%15]
  baseAliens.push({
    id: 'a'+(i+1),
    name,
    species,
    planet,
    appendages: app,
    atmosphere: atm,
    transportation: transport,
    travelSpeed: speed,
    biography: bio,
    redFlags: red,
    greenFlags: green,
    height,
    occupation,
    age,
    language,
    partnerPreferences: 'Open to most intelligent lifeforms',
    // keep legacy fields for filters
    eyes: (i%6),
    arms: (i%8),
    lifespan: 20 + (i*13)%1000,
    diet: ['omnivore','photosynthesis+','electricity','neon','minerals'][i%5]
  })
}

export default baseAliens
