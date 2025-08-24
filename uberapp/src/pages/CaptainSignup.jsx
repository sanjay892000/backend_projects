import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCaptainContext } from '../context/CapatainContext'

const CaptainSignup = () => {

  const { signupCaptainFun } = useCaptainContext()
  const navigate = useNavigate()

  const [account, setAccount] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    gender: "",
    password: ""
  })

  const [vehicle, setVehicle] = useState({
    color: "",
    plate: "",
    capacity: "",
    vehicleType: ""
  })

  const changeAccountHandler = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }
  const changeVehicleHandler = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value })
  }


  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      ...account, vehicle
    }
    signupCaptainFun(captainData, navigate)
  }
  
  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={submitHandler}>

          <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={account.firstname}
              onChange={changeAccountHandler}
              name='firstname'
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={account.lastname}
              onChange={changeAccountHandler}
              name='lastname'
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            required
            value={account.email}
            onChange={changeAccountHandler}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            name='email'
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={account.password}
            onChange={changeAccountHandler}
            name='password'
            required type="password"
            placeholder='password'
          />


          <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's age & gender</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='Age'
              value={account.age}
              onChange={changeAccountHandler}
              name='age'
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='Gender'
              value={account.gender}
              onChange={changeAccountHandler}
              name='gender'
              list='list'
            />
            <datalist id='list'>
              <option value="male" />
              <option value="female" />
            </datalist>
          </div>

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicle.color}
              onChange={changeVehicleHandler}
              name='color'
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehicle.plate}
              onChange={changeVehicleHandler}
              name='plate'
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              name='capacity'
              value={vehicle.capacity}
              onChange={changeVehicleHandler}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicle.vehicleType}
              onChange={changeVehicleHandler}
              name='vehicleType'
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Captain Account</button>

        </form>
        <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup