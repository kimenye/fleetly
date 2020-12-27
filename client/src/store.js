import React from 'react';
import useGlobalHook from 'use-global-hook';
import * as actions from './actions';

const initialState = {
  user: {},
  tweets: []
}

export default useGlobalHook(React, initialState, actions);
