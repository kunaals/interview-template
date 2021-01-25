import React from 'react';
import { css } from 'aphrodite';
import { gql, useQuery } from '@apollo/client';

import Text from './lib/Text';
import customStyleSheet from './lib/customStyleSheet';
import evergreenIcon from './img/evergreen_icon.png';
import getImageUri from './utils/getImageUri';

const GET_USER_QUERY = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      firstName
      lastName
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
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function App() {
  const { data } = useQuery(GET_USER_QUERY, {
    variables: {
      id: 1,
    },
  });

  const user = data && data.user;
  const titleText = user
    ? `Welcome to Evergreen ${user.firstName} ${user.lastName}!`
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
