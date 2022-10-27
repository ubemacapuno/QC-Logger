import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'

// Card component for the reports
import ReportCard from "../components/ReportCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [reports, setReports] = useState(null)

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

  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {reports && (
        <div className="smoothies"> 
        {/* order-by buttons */}
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