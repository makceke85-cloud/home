
import './Pra.css'

const Pra = ({name, time}) => {
  return (
    <div className="prayar">
      <p className='name_prayar'>{name}</p>
      <p className='time_prayar'>{time}</p>
    </div>
  )
}


export default Pra
