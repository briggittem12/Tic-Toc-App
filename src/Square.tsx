
type Props = {
    index: Number
    onClick(event: any): void
    player?: string
}

const Square = ({ player, onClick, index }: Props) => {

  let scale = player ? "scale-100" : "scale-0"
  let textColor = player === "X" ? "text-yellow-200" : "text-fuchsia-300" 
  let hoverStyle = "transition duration-500 hover:scale-105 transform"


  return (
    <div 
    data-cell-index={index} 
    className={`h-36 border-solid border-4 border-slate-200 font-display text-7xl flex justify-center items-center cursor-pointer ${hoverStyle}`}
    {... {onClick}}
    >
      
      <span 
      data-cell-index={index} 
      className={`transform transition-all duration-150 ${scale} ${textColor}`}>{player}</span>
    
    </div>
  )
}

export default Square