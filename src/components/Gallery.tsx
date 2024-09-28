import { VideoList } from "../vite-env";
import VideoItem from "./VideoItem";

type Props = {
    setSelected:Function
}

const data: VideoList[] = [

]

export default function Gallery ({setSelected}:Props){
    return <section className="gallery">
        {data.map(list=>{
            return <ul
                key={Math.random()}
                className="row"
            >
                {list.list.map(el=>{
                    return <VideoItem data={el} setSelected={setSelected}/>
                })}
            </ul>
        })}
    </section>
}