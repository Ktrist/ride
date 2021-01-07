console.disableYellowBox = true;
import React from 'react';
import FilterScreen from './Screens/FilterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import SellScreen from './Screens/SellScreen'
import BasketScreens from './Screens/BasketScreens'
import ProductScreens from './Screens/ProductScreens'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { FontAwesome } from '@expo/vector-icons'; 
import {createAppContainer }  from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreens from './Screens/HomeScreens'
import ResultScreens from './Screens/ResultScreens';
import AddPicScreen from './Screens/AddPicScreen';
import product from '../frontend/reducers/Article.reducer';
import typeOfAction from './reducers/typeOfAction.reducer'
import ProfileMenuScreen from './Screens/ProfileMenuScreen'
import SignUpScreen from './Screens/SignupScreens'
import photo from '../frontend/reducers/Pic.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
import ProfileBoughtArticleScreen from './Screens/ProfileBoughtArticleScreen'
import ProfileSellingArticleScreen from './Screens/ProfileSellingArticleScreen'
import SigninScreens from './Screens/SigninScreens';
import token from './reducers/Token.reducer'
import WalletScreens from './Screens/WalletScreens'
import ProfileUpdateScreen from './Screens/ProfileUpdateScreen'
import subcat from './reducers/Filtre.reducer';
import { WhishListScreens } from './Screens/WhishListScreen';
import LogScreen from './Screens/LogScreen';


const store = createStore(combineReducers({photo,product,token,typeOfAction,subcat}));


var StackNavigatorSearch = createStackNavigator({ 

  Filter:  FilterScreen,  
  Product:ProductScreens,
  Result: ResultScreens, 
  Basket: BasketScreens,

}, 
{headerMode: 'none'}
);  
  
var stackNavigatorSell =  createStackNavigator({  
  
  Sell: SellScreen,
  AddPic: AddPicScreen,
  AddArticle :ProfileSellingArticleScreen,

},
{headerMode: 'none'})

var StackNavigatorProfile = createStackNavigator({ 
  Menu: ProfileMenuScreen,
  ArticleBought: ProfileBoughtArticleScreen, 
  WhishList : WhishListScreens,
  Search: StackNavigatorSearch,
  SignUp: SignUpScreen, 
  SignIn:SigninScreens
}, 

{headerMode: 'none'}

);  




var BottomNavigatorMenu = createBottomTabNavigator({
  Home: HomeScreens,
  Sell: stackNavigatorSell,
  'My Profile': StackNavigatorProfile,
  
 },
  {
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ tintColor }) => {
      var iconName;
      if (navigation.state.routeName == 'Home') {
        iconName = 'home';
       }
         else if (navigation.state.routeName == 'Sell') {
        iconName = 'plus';
      //  } else if (navigation.state.routeName == 'Search') {
      //    iconName = 'search';
       } else if (navigation.state.routeName == 'My Profile') {
         iconName = 'user-o';
      }
       return <FontAwesome name={iconName} size={25} color={tintColor} />;
      },
    }),
     tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#C0C0C0',
      style: {
       backgroundColor: '#009788',
      }
    }
   

  });

  var StackNavigator = createStackNavigator({
    Log:  LogScreen,
    Menu: BottomNavigatorMenu, 
    Sell: stackNavigatorSell,
    'My Profile': StackNavigatorProfile,
  
  }, 
  {headerMode: 'none'}
  );  

const Navigation = createAppContainer(StackNavigator);

export default function App(){
    return (

      <Provider store={store}>
        <Navigation/>
      </Provider>

      )
}