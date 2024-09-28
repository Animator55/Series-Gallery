import { VideoList } from "../vite-env";
import VideoItem from "./VideoItem";

const data: VideoList[] = [

]

export default function Gallery (){
    return <section className="gallery">
        {data.map(list=>{
            return <ul
                key={Math.random()}
                className="row"
            >
                {list.list.map(el=>{
                    return <VideoItem data={el}/>
                })}
            </ul>
        })}
    </section>
}