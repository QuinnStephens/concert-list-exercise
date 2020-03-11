/**
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import performanceData from '../assets/performances';
import PerformanceView from './PerformanceView';

const initialState = {
  performances: [],
  favorites: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PERFORMANCES':
      return {...state, performances: action.payload.performances};
    case 'SET_FAVORITE':
      state.favorites.push(action.payload.id);
      return {...state, favorites};
    case 'CLEAR_FAVORITE':
      const favorites = state.favorites.filter(
        fave => fave !== action.payload.id,
      );
      return {...state, favorites};
  }
  return state;
};

const store = createStore(reducer);

export const setPerformances = performances => ({
  type: 'SET_PERFORMANCES',
  payload: {
    performances: performanceData,
  },
});

export const setFavorite = id => ({
  type: 'SET_FAVORITE',
  payload: {
    id,
  },
});

export const clearFavorite = id => ({
  type: 'CLEAR_FAVORITE',
  payload: {
    id,
  },
});

store.dispatch(setPerformances(performanceData));

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.title}>Upcoming Concerts</Text>
        </View>
        <View style={styles.content}>
          <PerformanceView />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5dbb5',
  },
  header: {
    paddingTop: 24,
    backgroundColor: '#f2e2c6',
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  title: {
    color: '#000',
    fontSize: 32,
  },
  content: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
});

export default App;
