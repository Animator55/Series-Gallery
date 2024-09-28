import { Video } from "../vite-env"

type Props = {
    data: Video
}

export default function VideoItem ({data}:Props){
    return <div
        className="row-item"
        onClick={()=>{
            console.log(data._id)
        }}
    >
        {/* <img/> */}
        <p>{data.title}</p>
    </div>
}