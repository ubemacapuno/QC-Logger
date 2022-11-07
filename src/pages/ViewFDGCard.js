import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import supabase from '../config/supabaseClient'

const ViewFDGCard = () => { 
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
    <div className="view-card">
      <h3>{batch}</h3>

      <h3>End of Synthesis Date: <span>{date}</span></h3>

      <h3>pH: <span>{ph}</span></h3>

      <h3>Endotoxin: <span>{endotoxin}</span></h3>
      
      <h3>Ethanol: <span>{etoh}</span></h3>

      <h3>Acetonitrile: <span>{acn}</span></h3>

      <h3>Sterility: <span>{sterility}</span></h3>

      <h3>Kryptofix: <span>{kryptofix}</span></h3>

      <Link className="button" to="/">Go Back</Link>

    </div>
  )
}

export default ViewFDGCard