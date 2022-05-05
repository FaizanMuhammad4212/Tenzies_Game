import { useEffect, useState } from "react"
import Diec from "./components/Dice"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [valu,setvalue]=useState(gennewdice())
  const [tenval,settenval]=useState(false)
  const [time,settime]=useState()

  useEffect(()=>{
    
      settime(performance.now());
    
  },[])
  

  useEffect(()=>{
    
    const v=valu[0].val
    let allis=valu.every(va=>va.isHeld)
    let allval=valu.every(va=>va.val===v)
    if(allis && allval){
      settenval(true)
    }
  },[valu,tenval])

  function gennewdice(){
    const arr=[]
    for(let i=0;i<10;i++){
      arr.push({
        id:nanoid(),
        val:Math.floor(Math.random()*9),
        isHeld:false,
      })
    }
    return arr;
  }

  function rolldice(){
    if(!tenval){
    setvalue(pre=>pre.map(pe=>{
      return pe.isHeld?pe:pe=
        {
          id:nanoid(),
          val:Math.floor(Math.random()*9),
          isHeld:false,
        }
    })) 
  }
  else{
      settenval(false)
      setvalue(gennewdice())
      
  }
}



  function selecteddice(id){
    setvalue(pre=>pre.map(pe=>{
      return pe.id===id?{...pe,isHeld:!pe.isHeld}:pe
    }))
  }
  const arr=valu.map(di=>{
    return (<Diec key={di.id} val={di.val} isH={di.isHeld} selec={()=>selecteddice(di.id)}/>)

  })

  
  return (
    
    <div className="boxdice">
      {tenval && <Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.<br></br>Click each die to freeze it at its current value between rolls.</p>
      <div className="boxcont">      
      {arr}
      </div>
            <button className="roll-dice" onClick={rolldice}>{!tenval?"Roll Dice":"New Game"}</button>
             {tenval && <p className="cong">Congragulations you finished the game in {((performance.now()-time)/1000).toFixed(2)} seconds</p>} 
    </div> 

  );
  }


