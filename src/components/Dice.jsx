
export default function Dice(props){
       
    return(
      <div className={`box ${props.isH?"change":""}`} onClick={props.selec} >
        {props.val}
        
      </div>
    )
}