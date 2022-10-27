import supabase from '../config/supabaseClient'

const ReportCard = ({ report }) => {
    let qcResult = "Fail"
    if(report.pH > 5 && report.pH < 7.5 && report.etOH <= 5 && report.aCN <=0.4){
        qcResult = "Pass"
    }


    return (
        <div className="smoothie-card">
            <h3>{report.batch}</h3>
            <p>EOS Date {report.date}</p>
            <div className={qcResult}>{qcResult}</div>
        </div>
    )
}
export default ReportCard