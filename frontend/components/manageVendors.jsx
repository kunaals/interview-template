import React, { Component } from 'react';
import { css } from 'aphrodite';
import customStyleSheet from '../lib/customStyleSheet';
import { gql, useQuery } from '@apollo/client';

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
  table: {
    border: '1px solid black',
  },
}));

class VendorRow extends Component {
  render() {
    const vendor = this.props.vendor;

    return (
      <tr>
        <td>{vendor.name}</td>
        <td>{vendor.description}</td>
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
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

const GET_VENDOR_QUERY = gql`
  query GetVendor {
    vendors {
      id
      name
      description
    }
  }
`;

const { data: vendors } = useQuery(GET_VENDOR_QUERY);
export const VENDORS = vendors && vendors.vendors;

export const PRODUCTS = [
  {description: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {description: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {description: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {description: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {description: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {description: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
export default VendorTable;