import "./AqiComponents.css"

export default function AqiComponents({ name, value }) {
    return(
        
        <div className="Box">
            <div style={{height: "60px"}}>
                <div style={{ marginBottom: "9px" , fontSize : "20px"}}>{value}</div>
                <div style={{ color: "#aaa", marginBottom: "12px" }}>{name}</div>
            </div>
            
        </div>
    )
}