import React from 'react';
//

import { Button, Col, Grid, Row, Table } from 'rsuite';
import Adsense from 'src/components/Adsense';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(3);

class TextAdsense extends React.Component {
  componentDidMount(): void {
    document.title = 'Adsense Test - WMI';
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
        <div className="mt-2 mb-2">
          <Adsense
            style={{ display: 'block' }}
            format="autorelaxed"
            client="ca-pub-2188063137129806"
            slot="5041245242"
          />
        </div>
        <Grid fluid className="mb-2">
          <Row className="show-grid">
            <Col xsHidden xs={12}>
              <Adsense
                style={{ display: 'block' }}
                format="fluid"
                layout-key="-gw-3+1f-3d+2z"
                client="ca-pub-2188063137129806"
                slot="6979059162"
              />
            </Col>
            <Col xs={12}>
              <Adsense
                style={{ display: 'block' }}
                format="fluid"
                layout-key="-fb+5w+4e-db+86"
                client="ca-pub-2188063137129806"
                slot="6133452172"
              />
            </Col>
          </Row>
        </Grid>
        <div className="empty">
          <Adsense client="ca-pub-2188063137129806" slot="2667720583" format="auto" widthResponsive="true" />
        </div>
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
