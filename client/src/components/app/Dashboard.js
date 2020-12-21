import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { getUser } from "../../redux/actions";
import axios from "axios";
const cx = require('classnames');


const ProfileMenu = ({ user, logout }) => {

  let [visible, setVisible] = useState(false)
  let vCx = cx({
    "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transform scale-95": true,
    "opacity-0": !visible
  })

  return (
    <div className="ml-3 relative">
      <div>
        <button onClick={() => setVisible(!visible) } className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={ user.profile_pic_url } alt="" />
        </button>
      </div>

      <div className={ vCx } role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
        { /*<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a> */}
        <a onClick={ logout } className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
      </div>
    </div>
  )
}

const TopNavBar = ({ user, logout }) => {

  return (
    <nav className="bg-purple-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="logo text-white">Fleetly</h1>
              { /*<img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
              <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" /> */}
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="#" className="bg-purple-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                { /*<a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a> */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            { user && <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>

              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button> }


            { user && <ProfileMenu user={user} logout={logout} /> }
          </div>
        </div>
      </div>

      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">

          <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
          { /*<a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>*/ }
        </div>
      </div>
    </nav>
  )
}

const TweetRow = ({ tweet }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        {/*<div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              Jane Cooper
            </div>
            <div className="text-sm text-gray-500">
              jane.cooper@example.com
            </div>
          </div>
        </div>*/}
        <div className="text-sm text-gray-900">{ new Date(tweet.tweeted_at).toDateString() }</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{ tweet.text }</div>
        {/*<div className="text-sm text-gray-500">Optimization</div>*/}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          { tweet.retweet_count }
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-red-600">
          { tweet.favorite_count }
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {/*<a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>*/}
        { tweet.source }
      </td>
    </tr>
  )
}

const TweetTable = ({ tweets }) => {
  return  (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tweet
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    # RT
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    # ❤️
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    App
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  (tweets.length < 1) &&
                  <tr>
                    <td colSpan="5"><span className="text-center text-sm text-gray-800 py-1 block">You have no Tweets loaded yet</span></td>
                  </tr>
                }
                { tweets.map((t,i) => <TweetRow tweet={t} key={i} /> )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const Loader = () => {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

const LoadButton = ({ onClick, user_id }) => {

  const [loading, setLoading] = useState(false);

  let btnCls = cx({
    "my-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-purple-100": true,
    "cursor-wait": loading
  })

  async function loadTweets() {
    // const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/user`);
    // setUser(result.data.data)

    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${user_id}/fetchTweets`)
    console.log('Result', result);

    onClick(result);
  }

  // fetchUser();

  const load = async () => {
    if (!loading) {
      setLoading(true);

      const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${user_id}/fetchTweets`)
      console.log('Result', result);

      onClick(result.data.tweets);
      setLoading(false);
    }
  }

  let text = loading ? "Fetching Tweets ..." : "Load Tweets"

  return (
    <button type="button" onClick= { load } className={ btnCls }>
      { loading && <Loader /> }
      { text }
    </button>
  )
}

const Dashboard = ({ props }) => {

  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);

  useEffect(() => {

    async function fetchUser() {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/user`);
      const response = result.data;
      setUser(response.user);
      setTweets(response.tweets);
    }

    fetchUser();

  }, [])

  const logout = async () => {
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/user/logout`);

    if (result.success == 'success') {
      setTweets([]);
      setUser(null);
    }
    window.location.replace("/")
  }

  let tweetsLoaded = tweets.length > 0

  return (
    <>
      <TopNavBar user={user} logout={logout} />
      { user && <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
            <small className="block text-gray-800 text-sm font-normal">Welcome <em>{ user.name }</em> to your Fleetly Dashboard. Your tweets are displayed below with number of RTs and Likes.</small>
            {
              !tweetsLoaded &&
              <div className="loadTweets">
                <LoadButton onClick={ setTweets } user_id={ user.id } />
              </div>
            }
          </h1>
        </div>
      </header> }
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <TweetTable tweets={ tweets } />
        </div>
      </main>
    </>
  )
}

export default Dashboard;
