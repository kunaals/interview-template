import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './index.css';
import App from './components/App';
import apolloClient from './gql/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
