import React from "react";
import { series } from "../default/series";
import VideoItem from "./VideoItem";

type Props = {
    setSelected:Function
}


export default function Gallery ({setSelected}:Props){
    const ref = React.useRef<HTMLDivElement | null>(null)

    return <section className="gallery" ref={ref}>
        {series.map(list=>{
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