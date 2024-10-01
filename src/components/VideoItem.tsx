import { Video } from "../vite-env"

type Props = {
    setSelected: Function
    data: Video
}

export default function VideoItem ({data, setSelected}:Props){
    return <div
        className="row-item"
        onMouseEnter={()=>{
            setSelected(data._id)
        }}
    >
        <div className="img"></div>
        {/* <img/> */}
        <p>{data.title}</p>
    </div>
}