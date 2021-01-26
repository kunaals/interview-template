import React, { Component } from 'react';
import { css } from 'aphrodite';
import customStyleSheet from '../lib/customStyleSheet';
import { gql, useQuery } from '@apollo/client';

import Text from '../lib/Text';
import evergreenIcon from '../img/evergreen_icon.png';
import getImageUri from '../utils/getImageUri';
import ReactTextCollapse from 'react-text-collapse'
import color from '../lib/color';


const styles = customStyleSheet(({ color, bp }) => ({
  logo: {
    height: 40,
    width: 40,
    marginRight: 2 * bp,
  },
  container: {
    backgroundColor: color.background,
    height: '3.5vh',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'top',
    padding: '20px 20px',
  },
  table: {
    backgroundColor: color.background,
  },
}));

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false, // default state when component rendered
  collapseText: '... show more', // text to show when collapsed
  expandText: 'show less', // text to show when expanded
  minHeight: 100, // component height when closed
  maxHeight: 250, // expanded to
  textStyle: { // pass the css for the collapseText and expandText here
    color: color.grayGradient,
    fontSize: "16"
  }
};


class VendorRow extends Component {
  render() {
    const vendor = this.props.vendor;

    return (
      <tr>
        <td>{vendor.name}</td>
        <td><ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
          <p>{vendor.description}</p>
        </ReactTextCollapse></td>
        <td><a href={vendor.externalLink}>{vendor.externalLink}</a></td>
        <td>{vendor.category}</td>
        <td>{vendor.status}</td>
        <td>{vendor.risk}</td>
      </tr>
    );
  }
}

class VendorTable extends Component {

  render() {
    const rows = [];

    this.props.vendors.forEach((vendor) => {
      rows.push(
        <VendorRow
          vendor={vendor}
          key={vendor.name} />
      );
    });

    return (
      <div className={css(styles.container)}>
        <table className={css(styles.table)}>
          <thead className={css(styles.table)}>
            <tr className={css(styles.table)}>
              <th>Name</th>
              <th>Description</th>
              <th>Link</th>
              <th>Category</th>
              <th>Status</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

const GET_VENDOR_QUERY = gql`
  query GetVendors {
    vendors {
      name
      description
      externalLink
      category
      status
      risk
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_VENDOR_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const vendors = data && data.vendors;

  return (
    <div>
      <div className={css(styles.container)}>
        <a href="/"><img
          className={css(styles.logo)}
          src={getImageUri(evergreenIcon)}
          alt="logo"
        /></a>
        <Text title1>
          Vendor Management Portal
        </Text>
      </div>
      <VendorTable vendors={vendors} />
    </div>
  );
}

export default App;