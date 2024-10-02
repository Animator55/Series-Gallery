import { Video } from "../vite-env"

type Props = {
    setSelected: Function
    data: Video
}

export default function VideoItem ({data, setSelected}:Props){
    return <div
        className="row-item"
        onClick={()=>{
            setSelected(data._id)
        }}
        id={"row-item:"+data._id}
    >
        <div className="img"></div>
        {/* <img/> */}
        <p>{data._id}</p>
    </div>
}
