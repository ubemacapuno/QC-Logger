import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'

// Card component for the reports
import ReportCard from "../components/ReportCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [reports, setReports] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at') //sort using Supabase

  //Function for looking through reports and 
  //update them based on if the report was JUST DELETED!
  const handleDelete = (id) => {
    setReports(prevReports => {
      return prevReports.filter(el => el.id !== id)
    })
  }

  //useEffect hook to store the data
  //Fires when component renders

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select()
        .order(orderBy, {ascending: true})

        if(error){
          setFetchError("Could not find reports in the database!")
          setReports(null)
          console.log(error)
        }
        if(data){
          setReports(data)
          setFetchError(null)
        }
    }

    fetchReports()

  }, [orderBy]) //re-fetch happens (useEffect runs again) when orderBy updates

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {reports && (
        <div className="smoothies"> 
        <div className="order-by">
          <p>Order by: </p><span>{orderBy}</span>
          <div className="buttons">
            <button onClick={() => setOrderBy('created_at')}>Created</button>
            <button onClick={() => setOrderBy('batch')}>Batch Name</button>
            <button onClick={() => setOrderBy('date')}>EOS Date</button>
          </div>
        </div>
          <div className="smoothie-grid">
            {reports.map(el => (
              <ReportCard 
                key={el.id} 
                report={el} 
                onDelete = {handleDelete}
              />
            ))}
          </div>
        </div>

      )}
    </div>
  )
}

export default Home