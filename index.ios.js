/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/**
 * If you build the project once using Xcode, then you can close it, 
 * run npm start in your project root (to start the packager), 
 * fire up the Simulator (maybe using ios-sim). 
 * Since you built it once in Xcode, the app will be installed 
 * in the simulator so you can just run it and the whole CMD+R 
 * refresh process will work.
 * 
 */

'use strict';
import React, {
  AppRegistry,
  Image,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';



class AwesomeProject extends Component {

  constructor() {
    super();

    // replaces getDefaultState when using ES6 classes
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
          return row1 !== row2;
        }
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  endReached(e) {
    alert('reached end of list');
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
        onEndReachedThreshold={0}
        onEndReached={this.endReached}
      />
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    )
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.welcome}>
            {movie.title}
          </Text>
          <Text style={styles.instructions}>
            {movie.year}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
