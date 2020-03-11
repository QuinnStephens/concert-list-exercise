import React from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {connect} from 'react-redux';

const PerformanceList = ({performances}) => {
  return (
    <FlatList
      style={styles.list}
      data={performances}
      keyExtractor={item => item.headliner}
      renderItem={({item}) => {
        return (
          <View style={styles.item}>
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
  return {
    performances,
    favorites,
  };
};

export default connect(mapStateToProps)(PerformanceList);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    height: 128,
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
