
import React, { useState, useRef, useEffect } from "react";
import { series } from "../default/series";
import VideoItem from "./VideoItem";
import { Video } from "../vite-env";


let prev = ""
export default function Gallery() {
    const [selected, setSelected] = React.useState("")

    React.useEffect(() => {
        if (selected === "") return
        let selDiv = document.getElementById("row-item:" + selected) as HTMLDivElement
        let selDivPrev = document.getElementById("row-item:" + prev) as HTMLDivElement
        if (!selDiv) return
        let ul = selDiv.parentElement as HTMLUListElement
        if (!ul) return
        if (selDivPrev) ul.scrollTo({ left: selDivPrev.offsetLeft - 50 })
        ul.scrollTo({ left: selDiv.offsetLeft - 50, behavior: "smooth" })
    }, [selected])

    const setSelectedHandler = (val: string) => {
        prev = selected
        setSelected(val)
    }

    const generateInfiniteList = (list: Video[]) => {
        let selectedIndex = -1
        for (let i = 0; i < list.length; i++) {
            if (list[i]._id === selected) {
                selectedIndex = i
                break
            }
        }
        if (selectedIndex === -1) return list
        let part1 = list.slice(selectedIndex - 5, selectedIndex)
        let part2 = list.slice(selectedIndex + 1)
        let newArray = [...part1, ...part2]
        console.log(newArray)
        return newArray
    }

    return <section className="gallery">
        {series.map(list => {
            return <ul
                key={Math.random()}
                className="row"
            >
                {generateInfiniteList(list.list).map(el => {
                    return <VideoItem key={Math.random()} data={el} setSelected={setSelectedHandler} />
                })}
            </ul>
        })}
    </section>
}


export const InfiniteScrollCarousel = () => {
    const items = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`);
    const [selectedItem, setSelectedItem] = useState(0);
    const [visibleItems, setVisibleItems] = useState([...items]);
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
        scrollToItem(5); // Ajustar el scroll al item central
    };

    // Función para desplazar el scroll al item central
    const scrollToItem = (index: number) => {
        const carousel: HTMLDivElement = carouselRef.current! as HTMLDivElement
        if (!carousel) return
        const selectedElement = carousel.children[index] as HTMLDivElement;
        if (!selectedElement) return
        const offsetLeft = selectedElement.offsetLeft;
        carousel.scrollTo({
            left: offsetLeft - carousel.offsetWidth / 2 + selectedElement.offsetWidth / 2,
            behavior: "smooth",
        });
    };

    // Efecto para actualizar los items visibles al inicio
    useEffect(() => {
        updateVisibleItems(selectedItem);
        scrollToItem(5); // Centrar el scroll al inicio
    }, [selectedItem]);

    return (
        <div
            ref={carouselRef}
            style={{
                display: "flex",
                overflowX: "auto",
                scrollBehavior: "smooth",
                whiteSpace: "nowrap",
                width: "80%",
                margin: "0 auto",
                border: "1px solid #ccc",
            }}
        >
            {visibleItems.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleSelectItem((selectedItem + index - 5 + items.length) % items.length)}
                    style={{
                        display: "inline-block",
                        padding: "20px",
                        minWidth: "150px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: selectedItem === (selectedItem + index - 5 + items.length) % items.length ? "#d3d3d3" : "white",
                    }}
                >
                    {item} {selectedItem === (selectedItem + index - 5 + items.length) % items.length && "(Selected)"}
                </div>
            ))}
        </div>
    );
};
