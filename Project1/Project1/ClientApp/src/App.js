import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {Customers} from './components/Customer/Customers';
import {Products} from './components/Product/Products';
import {Stores} from './components/Store/Stores';
import Sales from './components/Sale/Sales';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/Customer/Customers' component={Customers} />
        <Route path='/Product/Products' component={Products} />
        <Route path='/Store/Stores' component={Stores} />
        <Route path='/Sale/Sales' component={Sales} />
        
      </Layout>
    );
  }
}
