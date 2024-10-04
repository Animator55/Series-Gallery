
import { useState, useRef, useEffect } from "react";
import { series } from "../default/series";
import VideoItem from "./VideoItem";
import { Video } from "../vite-env";

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
            ...items.slice((index - 9 + totalItems) % totalItems, totalItems),
            ...items,
            ...items.slice(0, (index + 9) % totalItems),
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
        scrollToItem(5, false);
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
