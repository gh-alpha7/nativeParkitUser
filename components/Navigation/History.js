import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, BackHandler, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import Ongoing from '../History/Ongoing'
import Complete from '../History/Complete'
import { StackActions, NavigationActions } from 'react-navigation';

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Ongoing' },
      { key: 'second', title: 'Completed' },
    ],
    bookings:[]
  };
  handleBackPress = () => {
   this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DrawerNavigator' })], 0)
   return true
 }
 componentWillUnmount() {
   this.backHandler.remove()
 }
 componentDidMount(){
   this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

 }

  FirstRoute = () => (
    <Ongoing navigation={this.props.navigation}/>
  );

  SecondRoute = () => (
    <Complete navigation={this.props.navigation}/>
  );

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  {
                    return inputIndex === i ? 180 : 0
                  }
                ),
              })
            ),
            0,
            0
          );

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      
      <TabView
        navigationState={this.state}
        backgroundColor="#B2BABB"
        tintColor="#148F77"
        statusBarStyle="light-content"
        renderScene={SceneMap({
          first: this.FirstRoute,
          second: this.SecondRoute,
        })}
        style={styles.tabBar}
        // renderTabBar={this._renderTabBar}
        renderTabBar={props =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#CACFD2' }}
            style={{ backgroundColor: '#2980B9' }}
            activeColor="#2980B9"
            inactiveColor="#17202A"
          />
        }
        onIndexChange={index => this.setState({ index })}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,

  }
});
