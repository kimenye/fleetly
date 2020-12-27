import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { format, isToday } from "date-fns";
import { Link } from 'react-router-dom';
import TopNavBar from '../common/TopNavBar';
import useGlobal from "../../store";

const cx = require('classnames');

const DateStr = ({ date }) => {
  const dtStr = isToday(date) ? format(date, 'h:mm bb') : format(date, 'd MMM h:mm bb');
  return (
    <div className="text-sm text-gray-900">{ dtStr }</div>
  )
}

const TweetRow = ({ tweet }) => {
  return (
    <tr>
      <td className="px-6 py-4">
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
        <DateStr date={ new Date(tweet.tweeted_at) } />
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

const LoadButton = ({ actions, userId }) => {

  const [loading, setLoading] = useState(false);

  let btnCls = cx({
    "my-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-purple-100": true,
    "cursor-wait": loading
  })

  const load = async () => {
    if (!loading) {
      setLoading(true);
      actions.fetchTweets(userId);
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

  const [globalState, globalActions] = useGlobal();
  const { tweets, user, dataFetched } = globalState;

  useEffect(() => {
    if (!dataFetched)
      globalActions.fetchUserAndTweets();
  }, [])

  let tweetsLoaded = tweets.length > 0;

  return (
    <>
      <TopNavBar currentPage="dashboard" />
      { user && <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
            <small className="block text-gray-800 text-sm font-normal">Welcome <em>{ user.name }</em> to your Fleetly Dashboard. Your tweets are displayed below with number of RTs and Likes.</small>
            {
              !tweetsLoaded &&
              <div className="loadTweets">
                <LoadButton userId={ user.id } actions={ globalActions } />
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
