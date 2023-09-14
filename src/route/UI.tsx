// UI dump and tester

import * as React from 'react';
import { Button, Grid } from 'rsuite';

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class UI extends React.Component<HelloProps, Record<string, never>> {
  render() {
    return (
      <Grid>
        <h1>
          Hello from {this.props.compiler} and {this.props.framework}!
        </h1>
        <Button appearance="default" size="lg">
          React Suite
        </Button>
      </Grid>
    );
  }
}
