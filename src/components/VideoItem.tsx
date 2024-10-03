import { Video } from "../vite-env"

type Props = {
    selected: boolean
    setSelected: Function
    data: Video
}

export default function VideoItem ({selected, data, setSelected}:Props){
    return <div
        className="row-item"
        onClick={()=>{
            setSelected(data._id)
        }}
        id={"row-item:"+data._id}
    >
        <div
            style={selected ? {backgroundColor: "red"}:{}}
         className="img"></div>
        {/* <img/> */}
        <p>{data._id}</p>
    </div>
}
