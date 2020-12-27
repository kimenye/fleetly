import React, { Fragment, useState, useEffect } from 'react';
import TopNavBar from '../common/TopNavBar';
import useGlobal from "../../store";
import { format } from "date-fns";
import Calendar from "react-github-contribution-calendar";
import chroma from 'chroma-js';
import { groupByDate, getUniqueItems } from '../../util';

const FrequencyChart = () => {

  const [globalState, globalActions] = useGlobal();
  const { user, tweets, dataFetched } = globalState;
  const [ chartData, setChartData ] = useState(null);
  // const [ panelColors, setPanelColors ] = useState([])
  let chartVisible = chartData != null;

  const getFrequencyData = () => {
    if (tweets.length > 0) {
      let data = groupByDate(tweets);
      let grouped = {}
      Object.keys(data).forEach((day) => {
        grouped[day] = data[day].length
      })
      setChartData(grouped);
      getPanelColors();
    }
  }

  const getPanelColors = () => {
    if (chartData != null) {
      let values = getUniqueItems(Object.values(chartData)).sort();
      let colors = chroma.scale(['#DDDDDD','#391768']).mode('lch').colors(values.length);

      let panelColors = {};
      colors.forEach((color, idx) => {
        panelColors[idx] = color
      })
      return panelColors;
    }
    else
      return []
  }

  useEffect(() => {
    if (!dataFetched) {
      globalActions.fetchUserAndTweets();
    }
  }, []);


  return (
    <>
      <TopNavBar currentPage="charts" />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Charts
            <small className="block text-gray-800 text-sm font-normal">Your charts dashboard has a few vizualizations of your Tweet activity and Frequency of engagement</small>
          </h1>
          <button onClick={ getFrequencyData } className="my-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-purple-100">Load</button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          { chartVisible &&
            <>
              <h3 className="leading-tight text-gray-900 my-4">Tweet Frequency <small className="block text-gray-800">How have you been tweeting in the given period</small></h3>
              <Calendar values={chartData} until={ format(new Date(), 'y-M-d') } panelColors={ getPanelColors() } />
            </>
          }
        </div>
      </main>
    </>
  )
}

export default FrequencyChart
