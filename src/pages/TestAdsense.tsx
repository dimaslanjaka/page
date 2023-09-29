import React from 'react';
//

import { Button, Table } from 'rsuite';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(3);

class TextAdsense extends React.Component {
  componentDidMount(): void {
    require('./TestAdsense.scss');
    if (!window.adsense_option) window.adsense_option = { places: [] };
    window.adsense_option.places = ['article', '.rs-table', 'h1'];
    window.adsense_option.root = '#adsense-root';
    window.adsense_option.localhost = ['adsense.webmanajemen.com', 'agc.io', 'dev.webmanajemen.com'];

    // scroll to top by default
    setTimeout(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 800);
      }, 800);
    }, 800);
  }

  render() {
    return (
      <div id="adsense-root">
        <h1 className="text-center">H1</h1>
        <b className="text-center">{'<article/>'}</b>
        {new Array(5).fill(0).map((_, i) => (
          <article key={i}>article {i}</article>
        ))}
        <b className="text-center">table</b>
        <TableContent />
      </div>
    );
  }
}

const TableContent = () => {
  return (
    <Table
      height={400}
      data={data}
      onRowClick={rowData => {
        console.log(rowData);
      }}
    >
      <Column width={60} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={150}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={150}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={100}>
        <HeaderCell>Gender</HeaderCell>
        <Cell dataKey="gender" />
      </Column>

      <Column width={100}>
        <HeaderCell>Age</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={150}>
        <HeaderCell>Postcode</HeaderCell>
        <Cell dataKey="postcode" />
      </Column>

      <Column width={300}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
      <Column width={80} fixed="right">
        <HeaderCell>...</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
              Edit
            </Button>
          )}
        </Cell>
      </Column>
    </Table>
  );
};

export default TextAdsense;
