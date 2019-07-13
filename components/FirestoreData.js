import Db from './firebaseConfig'

let points=Db.collection("points").get()


export default Promise.all([points]).then(value=>(
  {points:value[0].docs.map(d=>({...d.data(),id:d.id}))}
))
