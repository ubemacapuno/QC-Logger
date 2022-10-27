import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'

// components
import ReportCard from "../components/ReportCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [reports, setReports] = useState(null)

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
              <ReportCard key={el.id} report={el} />
            ))}
          </div>
        </div>

      )}
    </div>
  )
}

export default Home