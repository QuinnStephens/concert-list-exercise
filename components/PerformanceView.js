import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setFavorite, clearFavorite} from './App';

const PerformanceList = ({performances, setFavorite, clearFavorite}) => {
  return (
    <FlatList
      style={styles.list}
      data={performances}
      keyExtractor={item => item.headliner}
      renderItem={({item}) => {
        const starActive = require('../assets/star-active.png');
        const starInactive = require('../assets/star-inactive.png');
        return (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                if (item.favorited) {
                  clearFavorite(item.id);
                } else {
                  setFavorite(item.id);
                }
              }}>
              <Image
                style={styles.favorite}
                source={item.favorited ? starActive : starInactive}
              />
            </TouchableOpacity>
            <Text style={styles.date}>
              {item.time.toLocaleDateString('en-us', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text style={styles.time}>
              {item.time.toLocaleTimeString('en-us', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>
            <Text style={styles.headliner}>{item.headliner}</Text>
            <Text>
              With <Text style={styles.opener}>{item.opener}</Text>
            </Text>
            <Text style={styles.venue}>{item.venue}</Text>
          </View>
        );
      }}
    />
  );
};

const mapStateToProps = state => {
  const {performances, favorites} = state;
  const performancesWithFavorites = performances.map(performance => {
    return {
      ...performance,
      favorited: favorites.includes(performance.id),
    };
  });

  return {
    performances: performancesWithFavorites,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setFavorite,
      clearFavorite,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PerformanceList);

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  item: {
    height: 200,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#f2e2c6',
    margin: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 12,
  },
  favorite: {
    height: 32,
    width: 32,
    resizeMode: 'stretch',
  },
  date: {
    color: '#922',
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  time: {
    color: '#922',
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  headliner: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  opener: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  venue: {
    color: '#922',
    fontSize: 16,
  },
});
