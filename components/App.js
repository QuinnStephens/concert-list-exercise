/**
 * @format
 */

import React from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import performanceData from '../assets/performances';

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

store.dispatch({
  type: 'SET_PERFORMANCES',
  payload: {
    performances: performanceData,
  },
});

const PerformanceList = ({performances}) => {
  return (
    <FlatList
      style={styles.list}
      data={performances}
      keyExtractor={item => item.headliner}
      renderItem={({item}) => {
        return (
          <View style={styles.item}>
            <Text style={styles.headliner}>{item.headliner}</Text>
          </View>
        );
      }}
    />
  );
};

const mapStateToProps = state => {
  const {performances, favorites} = state;
  return {
    performances,
    favorites,
  };
};

const PerformanceListConnected = connect(mapStateToProps)(PerformanceList);

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.title}>Upcoming Concerts</Text>
        </View>
        <View style={styles.content}>
          <PerformanceListConnected />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffe',
  },
  header: {
    paddingTop: 24,
    backgroundColor: '#1ca',
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderBottomColor: '#222',
    borderBottomWidth: 2,
  },
  title: {
    color: '#fff',
    fontSize: 32,
  },
  content: {
    flexGrow: 1,
  },
  list: {
    height: '100%',
  },
  item: {
    height: 64,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  headliner: {
    color: '#000',
  },
});

export default App;
