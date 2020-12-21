import React, { useState } from 'react';
import Button from '../common/Button';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";


const Banner = (props) => {

  const [email, setEmail] = useState(props.email)
  const [name, setName] = useState("")
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  let { token } = props

  const verifyToken = async (props) => {
    try {
      setLoading(true)
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/invites/${token}?email=${email}`);
      const status = result.status;
      if (status === 200) {
        let { data } = result.data

        const updateResponse = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${data[0].id}`, { name: name })
        const updateStatus = updateResponse.status

        if (status == 200) {
          // props.history.push('/auth/twitter/request');
          window.location.replace("/auth/twitter/request");
        }

        return true
      }
    } catch(err) {
      console.log('Error', err);
      alert('Invalid email or authentication token. Please confirm and try again');
      setLoading(false)
    }

  }

  function verifyAndConnectToTwitter() {
    verifyToken(props)
  }

  return (
    <div class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <p class="mt-2 text-8xl logo text-purple-600 leading-8 py-8 font-bold tracking-tight sm:text-4xl">
            Fleetly
          </p>
        </div>

        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Hi</h3>
              <p class="mt-1 text-sm text-gray-600">
                Welcome to Fleetly. A tool to help you make the most of your most engaged tweets by scheduling them as Fleets. In order to continue,
                you need to verify your account and connect to Twitter.
              </p>
            </div>
          </div>


          <div class="mt-5 md:mt-0 md:col-span-2 bg-gray-200">
            <form action="#" method="POST">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">

                    <div class="col-span-6 sm:col-span-4">
                      <label class="block text-sm font-medium text-gray-700">Your name</label>
                      <input type="text" value={ name } onChange={e => setName(e.target.value)} placeholder="Jane Doe" autoComplete="family-name" className="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label class="block text-sm font-medium text-gray-700">Email address</label>
                      <input type="email" value={ email } onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" autoComplete="email" className="mt-1 border focus:ring-purple-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button text='Connect with Twitter' onClick={ verifyAndConnectToTwitter } loading={ loading } />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BannerWithRouter = withRouter(Banner)

const TwitterConnect = () => {

  let { uuid } = useParams();
  let query = useQuery();
  let email = query.get('email');

  console.log('Id', uuid, email);

  return (
    <BannerWithRouter token={ uuid } email={ email } />
  )
}

export default TwitterConnect;
