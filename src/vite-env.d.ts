/// <reference types="vite/client" />
export type Item = {
    _id: string
    duration: string
    title: string
    description: string
    image: string
}

export type VideoList = {
    _id: string,
    title: string
    list: Video[]
}

export type Video = {
    _id: string
    image: string
    type: "film" | "serie"
    title:string
    description:string
    tags: string[]
    date:string
    rating:number
    chapters:Item[]
}