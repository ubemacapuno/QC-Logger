import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

  const [batch, setBatch] = useState('')
  const [date, setDate] = useState('')
  const [ph, setph] = useState('')
  const [endotoxin, setEndotoxin] = useState('')
  const [etoh, setetoh] = useState('')
  const [acn, setacn] = useState('')
  const [sterility, setSterility] = useState('')
  const [kryptofix, setKryptofix] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault() //prevents reloading

    //Prevent form submission if fields aren't populated
    if(!batch || !date || !ph || !endotoxin || !etoh || !acn || !sterility || !kryptofix){
      setFormError('Please fill in all the fields correctly')
      return
    }

    console.log(batch, date, ph, endotoxin, etoh, acn, sterility, kryptofix)

    const { data, error } = await supabase
      .from('reports')
      .insert([{ batch, date, ph, endotoxin, etoh, acn, sterility, kryptofix}])
      .select()

    if(error){
      console.log(error)
      setFormError('Please fill in all the fields correctly')

    }

    if(data){
      console.log(data)
      setFormError(null)
      navigate('/')      
    }
  }

  return (
    <div className="page create">
       <form onSubmit={handleSubmit}>
        <label htmlFor="batch">Batch:</label>
        <input 
          type="text" 
          id="batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />

        <label htmlFor="date">End of Synthesis Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="pH">pH:</label>
        <input 
          type="number"
          id="pH"
          value={ph}
          onChange={(e) => setph(e.target.value)}
        />

        <label htmlFor="endotoxin">Endotoxin (EU/mL):</label>
        <input 
          type="number"
          id="endotoxin"
          value={endotoxin}
          onChange={(e) => setEndotoxin(e.target.value)}
        />

        <label htmlFor="etOH">Ethanol (mg/mL):</label>
        <input 
          type="number"
          id="etOH"
          value={etoh}
          onChange={(e) => setetoh(e.target.value)}
        />

        <label htmlFor="aCN">Acetonitrile (mg/mL):</label>
        <input 
          type="number"
          id="aCN"
          value={acn}
          onChange={(e) => setacn(e.target.value)}
        />

        <label htmlFor="sterility">Sterility:</label>
        <select 
          name="sterility" 
          id="sterility"
          defaultValue={sterility}
          onChange={(e) => setSterility(e.target.value)}
        >
            <option value="" disabled>Select Pass or Fail</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
        </select>

        <label htmlFor="kryptofix">Kryptofix:</label>
        <select 
          name="kryptofix" 
          id="kryptofix"
          defaultValue={kryptofix}
          onChange={(e) => setKryptofix(e.target.value)}
        >
            <option value="" disabled>Select Pass or Fail</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
        </select>

     
        <button>Submit Report</button>

        {formError && <p className="error">{formError}</p>}
      </form>

    </div>
  )
}

export default Create