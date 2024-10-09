
import React, { useState, useRef, useEffect } from "react";
import VideoItem from "./VideoItem";
import { Video, VideoList } from "../vite-env";
import { mediaList } from "../default/mediaList";

export default function Gallery({setSelected}:{setSelected: Function}) { 
    const [selectedRow, setSelectedRow] = React.useState(0)
    
    const blockedThemes: string[] = []
    const themes = ["Acción", "Romance", "Fantasía", "Ciencia Ficción", "Crimen"]
    let GalleryRows = themes.map(theme=>{
        if(blockedThemes.includes(theme))return
        let media = mediaList.filter(el=>{if(el.tags.includes(theme))return el})
        let result: VideoList = {
            _id: `${theme}`,title: theme, list: media
        }
        return result
    })
    return <section className="gallery">
        
        {GalleryRows && GalleryRows.length !== 0 && GalleryRows.map(list => {
            if(!list)return
            return <section key={Math.random()}>
                <label>{list.title}</label>
                <InfiniteScrollCarousel list={list.list}/>
            </section>
        })}
    </section>
}

type CarrouselProps = {
    list: Video[]
}

export const InfiniteScrollCarousel = ({list}: CarrouselProps) => {
    const items = [...list]
    const [selectedItem, setSelectedItem] = useState(0);
    const [visibleItems, setVisibleItems] = useState(items);
    const carouselRef = useRef(null);
    const updateVisibleItems = (index: number) => {
        const totalItems = items.length;
        const newVisibleItems = [
            ...items.slice((index - (totalItems/2) + totalItems) % totalItems, totalItems),
            ...items,
            ...items.slice(0, (index + (totalItems/2)) % totalItems),
        ];
        setVisibleItems(newVisibleItems);
    };

    const handleSelectItem = (index: number) => {
        scrollToItem(5 - (selectedItem - index), true);
        setTimeout(()=>{
            setSelectedItem(index);
            updateVisibleItems(index);
        }, 300)
    };

    const scrollToItem = (index: number, smooth: boolean) => {
        const carousel: HTMLDivElement = carouselRef.current! as HTMLDivElement
        if (!carousel) return
        const selectedElement = carousel.children[index] as HTMLDivElement;
        if (!selectedElement) return
        const offsetLeft = selectedElement.offsetLeft;
        carousel.scrollTo({
            left: offsetLeft -30,
            behavior: smooth ? "smooth" : "instant",
        });
    };

    useEffect(() => {
        updateVisibleItems(selectedItem); 
        scrollToItem(list.length/3, false);
    }, [selectedItem]);

    return (
        <div
            ref={carouselRef}
            className="row"
        >
            {visibleItems.map((item, index) => {
                let selectedBool = selectedItem === (selectedItem + index - 5 + items.length) % items.length
                return <VideoItem
                    key={index}
                    selected={selectedBool}
                    setSelected={() => handleSelectItem((selectedItem + index - 5 + items.length) % items.length)}
                    data={item}
                />
            })}
        </div>
    );
};
