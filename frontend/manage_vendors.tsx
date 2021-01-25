import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import './index.css';
import ManageVendors from './ManageVendors';
import apolloClient from './gql/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ManageVendors />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
