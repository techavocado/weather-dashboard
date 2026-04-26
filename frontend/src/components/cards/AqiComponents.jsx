import "./AqiComponents.css"

export default function AqiComponents({ name, value }) {
    return(
        <div className="Box">
            <div>
                <div style={{ marginBottom: "12px" , fontSize : "30px" }}>{value}</div>
                <div style={{ color: "#aaa", marginBottom: "12px" }}>{name}</div>
            </div>
        </div>
    )
}