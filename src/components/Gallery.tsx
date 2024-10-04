
import React, { useState, useRef, useEffect } from "react";
import { series } from "../default/series";
import VideoItem from "./VideoItem";
import { Video } from "../vite-env";


let prev = ""
export default function Gallery() {
    // const [selected, setSelected] = React.useState("")

    // React.useEffect(() => {
    //     if (selected === "") return
    //     let selDiv = document.getElementById("row-item:" + selected) as HTMLDivElement
    //     let selDivPrev = document.getElementById("row-item:" + prev) as HTMLDivElement
    //     if (!selDiv) return
    //     let ul = selDiv.parentElement as HTMLUListElement
    //     if (!ul) return
    //     if (selDivPrev) ul.scrollTo({ left: selDivPrev.offsetLeft - 50 })
    //     ul.scrollTo({ left: selDiv.offsetLeft - 50, behavior: "smooth" })
    // }, [selected])

    // const setSelectedHandler = (val: string) => {
    //     prev = selected
    //     setSelected(val)
    // }

    // const generateInfiniteList = (list: Video[]) => {
    //     let selectedIndex = -1
    //     for (let i = 0; i < list.length; i++) {
    //         if (list[i]._id === selected) {
    //             selectedIndex = i
    //             break
    //         }
    //     }
    //     if (selectedIndex === -1) return list
    //     let part1 = list.slice(selectedIndex - 5, selectedIndex)
    //     let part2 = list.slice(selectedIndex + 1)
    //     let newArray = [...part1, ...part2]
    //     console.log(newArray)
    //     return newArray
    // }

    return <section className="gallery">
        {series.map(list => {
            return <section key={Math.random()}>
                <label>{list.title}</label>
                <InfiniteScrollCarousel _id={list._id} list={list.list}/>
            </section>
        })}
    </section>
}

type CarrouselProps = {
    _id: string
    list: Video[]
}

export const InfiniteScrollCarousel = ({_id,list}: CarrouselProps) => {
    const items = [...list]
    const [selectedItem, setSelectedItem] = useState(0);
    const [visibleItems, setVisibleItems] = useState(items);
    const carouselRef = useRef(null);
    const updateVisibleItems = (index: number) => {
        const totalItems = items.length;
        const newVisibleItems = [
            ...items.slice((index - 9 + totalItems) % totalItems, totalItems),
            ...items,
            ...items.slice(0, (index + 9) % totalItems),
        ];
        setVisibleItems(newVisibleItems);
    };

    const handleSelectItem = (index: number) => {
        setSelectedItem(index);
        updateVisibleItems(index);
        scrollToItem(5);
    };

    const scrollToItem = (index: number) => {
        let carousel = document.getElementById(_id)
        if (!carousel) return
        const selectedElement = carousel.children[index] as HTMLDivElement;
        if (!selectedElement) return
        const offsetLeft = selectedElement.offsetLeft;
        carousel.scrollTo({
            left: offsetLeft -30,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        updateVisibleItems(selectedItem); 
    }, [selectedItem]);
    useEffect(()=>{
        scrollToItem(5);
    }, [visibleItems])

    return (
        <div
            id={_id}
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
