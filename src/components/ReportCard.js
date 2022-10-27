import supabase from '../config/supabaseClient'
import { Link } from 'react-router-dom'

const ReportCard = ({ report }) => {
    //Logic for Pass/Fail
    let qcResult = "Fail"
    if(report.ph > 5 && report.ph < 7.5 && report.etoh <= 5 && report.acn <=0.4){
        qcResult = "Pass"
    }

    return (
        <div className="smoothie-card">
            <h3>{report.batch}</h3>
            <p>EOS Date {report.date}</p>
            <div className={qcResult}>{qcResult}</div>
            
            {/* Edit and Delete buttons: */}
            <div className="buttons">
                <Link to={'/' + report.id}>
                    <i className="material-icons">edit</i>
                </Link>
            </div>
        </div>
    )
}
export default ReportCard