import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import supabase from '../config/supabaseClient'

const Update = () => { 
  const { id } = useParams()
  const navigate = useNavigate()

  const [batch, setBatch] = useState('')
  const [date, setDate] = useState('')
  const [ph, setph] = useState('')
  const [endotoxin, setEndotoxin] = useState('')
  const [etoh, setetoh] = useState('')
  const [acn, setacn] = useState('')
  const [sterility, setSterility] = useState('')
  const [kryptofix, setKryptofix] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault() //prevents reloading

    //Prevent form submission if fields aren't populated
    if(!batch || !date || !ph || !endotoxin || !etoh || !acn || !sterility || !kryptofix){
      setFormError('Please fill in all the fields correctly')
      return
    }

    const { data, error } = await supabase
      .from('reports')
      .update({ batch, date, ph, endotoxin, etoh, acn, sterility, kryptofix})
      .eq('id',id)
      .select()

    if(error){
      setFormError('Please fill in all the fields correctly')
      console.log(error)
    }

    if(data){
      setFormError(null)
      console.log(data)
      navigate('/')

    }

  }

  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select()
        .eq("id", id) //where id in the column("id") is equal to id that is passed in (id)
        .single() //grab single item in database

      if(error){
        console.log(error)
        navigate('/', { replace: true }) //"replace: true" replaces the route in the history with the homepage
      }

      if(data){
        setBatch(data.batch)
        setDate(data.date)
        setph(data.ph)
        setEndotoxin(data.endotoxin)
        setetoh(data.etoh)
        setacn(data.acn)
        setSterility(data.sterility)
        setKryptofix(data.kryptofix)
        // console.log(data)
      }

    }
    fetchReport()
  }, [id, navigate])

  return (
    <div className="page update">
     <form onSubmit={handleSubmit}>
        <label htmlFor="batch">Batch:</label>
        <input 
          type="text" 
          id="batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />

        <label htmlFor="date">EOS Date:</label>
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

        <label htmlFor="endotoxin">Endotoxin:</label>
        <input 
          type="number"
          id="endotoxin"
          value={endotoxin}
          onChange={(e) => setEndotoxin(e.target.value)}
        />

        <label htmlFor="etOH">Ethanol:</label>
        <input 
          type="number"
          id="etOH"
          value={etoh}
          onChange={(e) => setetoh(e.target.value)}
        />

        <label htmlFor="aCN">Acetonitrile:</label>
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
          value={sterility}
          onChange={(e) => setSterility(e.target.value)}
        >
            <option value="Fail">Fail</option>
            <option value="Pass">Pass</option>
        </select>

        <label htmlFor="kryptofix">Kryptofix:</label>
        <select 
          name="kryptofix" 
          id="kryptofix"
          value={kryptofix}
          onChange={(e) => setKryptofix(e.target.value)}
        >
            <option value="Fail">Fail</option>
            <option value="Pass">Pass</option>
        </select>

     
        <button>Update QC Report</button>

        {formError && <p className="error">{formError}</p>}
      </form>

    </div>
  )
}

export default Update