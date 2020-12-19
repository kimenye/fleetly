import React, { Fragment, useState } from 'react';
import Button from './common/Button';
import axios from 'axios';

const Feature = ({ text }) => {
  return (
    <li className="flex items-start">
      <span className="h-6 flex items-center sm:h-7">
        <svg className="flex-shrink-0 h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </span>
      <p className="ml-2">
        { text }
      </p>
    </li>
  )
}

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [user, setUser] = useState(null)

  const createUser = async () => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, { email: email });
      const status = result.status;
      if (status === 201) {
        let { data } = result.data
        let saved = data[0]
        setUser(saved)
      }
    } catch(err) {
      if (err.response.status === 422)
        setUser({ email: email })
      else
        alert('Sorry, please try again later');
    }

  }

  function register(e) {
    const emailValid =   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    if (emailValid)
      createUser()
    else
      alert('Please enter a valid email to sign up')
  }

  if (user)
    return (
      <Fragment>
        <h2 className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 text-purple-600">Awesome! You'll be first to know when we're ready</h2>
      </Fragment>
    )
  else
    return (
      <Fragment>
        <input type="email" placeholder="jane@example.com" onChange={e => setEmail(e.target.value)} required={true} className="mt-1 block w-full px-0.5 border-0 border-b-2 border-purple-200 hover:border-purple-500" />
        <Button text='Sign Up' onClick={ register } />
      </Fragment>
    )

}

function Hero() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="logo text-purple-600 text-4xl">Fleetly</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Fleet like a pro.</p>
                <ul className="list-disc space-y-2">
                  <Feature text={ 'Find your best engaged Tweets' } />
                  <Feature text={ 'Schedule the best time to post them' } />
                  <Feature text={ 'Spend your time doing more productive things' } />
                </ul>
              </div>
              <div className="pt-6 text-base leading-6">
                <p className="text-gray-700 text-small">Fleetly is currently in early access. Drop your email below
                to be one of our early beta testers</p>
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
