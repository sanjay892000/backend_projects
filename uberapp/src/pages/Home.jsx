import 'remixicon/fonts/remixicon.css'
import { useEffect, useRef, useState } from "react"
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from './../components/VehiclePanel';


function Home() {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pannelTop, setPannelTop] = useState(false)


  const divPannelRef = useRef(null)
  const downArrowRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(pickup, destination)
    // handle the form submission logic here
  }

  useEffect(() => {
    if (pannelTop) {
      divPannelRef.current.style.height = "100%";
      downArrowRef.current.style.opacity = "1";
    } else {
      divPannelRef.current.style.height = "0%";
      downArrowRef.current.style.opacity = "0";
    }
  }, [pannelTop])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        <img className="h-full w-full object-cover object-center" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="loading..." />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={downArrowRef} className='absolute right-6 opacity-0 top-6 text-2xl' onClick={() => setPannelTop(false)} >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form className='relative py-3' onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[32%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onChange={(e) => setPickup(e.target.value)}
              value={pickup}
              onClick={() => setPannelTop(true)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              onClick={() => setPannelTop(true)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
              type="text"
              placeholder='Enter your destination' />
            <button
              className='bg-black text-white px-4 py-2 rounded-lg mt-8 w-full'>
              Find Trip
            </button>
          </form>
        </div>
        <div ref={divPannelRef} className="bg-white w-full transition-all duration-300 ease-linear h-[0%]">
          <LocationSearchPanel />
          <LocationSearchPanel />
          <LocationSearchPanel />
          <LocationSearchPanel />
          <LocationSearchPanel />
          <LocationSearchPanel />
          <LocationSearchPanel />
          <LocationSearchPanel />
          <LocationSearchPanel />
        </div>
        <div className='fixed w-full z-50 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <VehiclePanel />
        </div>
      </div>
    </div>
  )
}

export default Home
