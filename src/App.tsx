
import React from 'react'
import './assets/App.css'
import Gallery from './components/Gallery'
export default function App (){
  
  const [selected, setSelected] = React.useState<string | undefined>(undefined)
 
  const SelectedRender = ()=>{
    return <section className='selected'>
      {/* <img/> */}
      <h1>{selected}</h1>
    </section>
  }

  const appendNewList = (div: HTMLDivElement)=>{
    if(!div) return
    let newList = `<div>a</div>`
    div.append(newList)
  }

  return <main>
    {selected ? <SelectedRender/>:
    <Gallery  setSelected={setSelected}/>
    }
  </main>
}