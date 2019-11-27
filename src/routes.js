import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './components/HomeScreen'
import ProductsList from './components/ProductsListScreen'
import Product from './components/ProductScreen'
import Demanda from './components/DemandaScreen'

const mainStack = createStackNavigator(
    {
        Home,
        ProductsList,
        Product,
        Demanda
    },{
        initialRouteName:"Home"
    }
)
const Routes = createAppContainer(mainStack);
export default (Routes);