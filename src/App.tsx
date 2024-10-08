
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

  return <main>
    <SelectedRender/>

    <Gallery/>
  </main>
}