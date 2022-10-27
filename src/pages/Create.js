import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const [batch, setBatch] = useState('')
  const [date, setDate] = useState('')
  const [pH, setpH] = useState('')
  const [endotoxin, setEndotoxin] = useState('')
  const [etOH, setetOH] = useState('')
  const [aCN, setaCN] = useState('')
  const [sterility, setSterility] = useState('')
  const [kryptofix, setKryptofix] = useState('')



  return (
    <div className="page create">
      <h2>Create</h2>
    </div>
  )
}

export default Create