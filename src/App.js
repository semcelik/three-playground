import './App.scss';
import 'react-input-range/lib/css/index.css';

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ROUTES from './routes';
import AppNavigator from './components/AppNavigator';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppNavigator />
        <Switch>
          {ROUTES.map(({ key, path, component: Component }) => (
            <Route exact key={key} path={path}>
              <Component />
            </Route>
          ))}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
