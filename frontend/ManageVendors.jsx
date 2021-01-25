import React from 'react';
import { css } from 'aphrodite';
import { gql, useQuery } from '@apollo/client';

import Text from './lib/Text';
import customStyleSheet from './lib/customStyleSheet';
import evergreenIcon from './img/evergreen_icon.png';
import getImageUri from './utils/getImageUri';

const GET_VENDOR_QUERY = gql`
  query GetVendor($id: Int!) {
    vendor(id: $id) {
      name
      description
      externalLink
    }
  }
`;

const styles = customStyleSheet(({ color, bp }) => ({
  logo: {
    height: 40,
    width: 40,
    marginRight: 2 * bp,
  },
  container: {
    backgroundColor: color.background,
    height: '100vh',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'top',
    padding: '20px 20px',
  },
}));

function App() {
  const { data } = useQuery(GET_VENDOR_QUERY, {
    variables: {
      id: 1,
    },
  });

  const vendor = data && data.vendor;
  const titleText = vendor
    ? `Welcome to Evergreen ${vendor.name}!`
    : 'Welcome to Evergreen!';

  return (
    <div className={css(styles.container)}>
      <img
        className={css(styles.logo)}
        src={getImageUri(evergreenIcon)}
        alt="logo"
      />
      <Text title1>
        {titleText}
      </Text>
    </div>
  );
}

export default App;
