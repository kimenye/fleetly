import React from 'react';
import useGlobalHook from 'use-global-hook';
import * as actions from './actions';

const initialState = {
  dataFetched: false,
  user: {},
  tweets: []
}

export default useGlobalHook(React, initialState, actions);
