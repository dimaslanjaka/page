import React from 'react';
//

import { copyTextToClipboard, md5, querySelector } from '@/utils';
import moment from 'moment-timezone';
import { getTimeZoneOffset } from './layout1/moment-timezone';
import timezones from './shared/timezones.json';

const Snippet = React.lazy(() => import('./shared/Snippet'));
const Col = React.lazy(() => import('rsuite/esm/Col'));
const HighlightElement = React.lazy(() => import('@/components/Highlight.js'));
const ButtonToolbar = React.lazy(() => import('rsuite/esm/ButtonToolbar'));
const Form = React.lazy(() => import('rsuite/esm/Form'));
const FormGroup = React.lazy(() =>
  import('rsuite/esm/Form').then(module => ({
    default: module.default.Group,
  })),
);
const Divider = React.lazy(() => import('rsuite/esm/Divider'));
const FlexboxGrid = React.lazy(() => import('rsuite/esm/FlexboxGrid'));
const FlexboxGridItem = React.lazy(() =>
  import('rsuite/esm/FlexboxGrid').then(module => ({
    default: module.default.Item,
  })),
);
const DatePicker = React.lazy(() => import('rsuite/esm/DatePicker'));
const FormControl = React.lazy(() => import('rsuite/esm/FormControl'));
const FormHelpText = React.lazy(() =>
  import('rsuite/esm/Form').then(module => ({
    default: module.default.HelpText,
  })),
);
const FormControlLabel = React.lazy(() =>
  import('rsuite/esm/Form').then(module => ({
    default: module.default.ControlLabel,
  })),
);
const Button = React.lazy(() => import('rsuite/esm/Button'));
const Container = React.lazy(() => import('rsuite/esm/Container'));
const Panel = React.lazy(() => import('rsuite/esm/Panel'));
const PanelGroup = React.lazy(() => import('rsuite/esm/PanelGroup'));
const Link = React.lazy(() => import('@components/Link'));
const Nav = React.lazy(() => import('rsuite/esm/Nav'));
const NavItem = React.lazy(() =>
  import('rsuite/esm/Nav').then(module => ({
    default: module.default.Item,
  })),
);
// const NavMenu = React.lazy(() =>
//   import('rsuite/esm/Nav').then(module => ({
//     default: module.default.Menu,
//   })),
// );

interface State {
  active: string;
  input: string;
  timezone: string;
  pattern: string;
  result: string;
  timezoneData: typeof timezones & Record<string, any>;
}

class MTLayout2 extends React.Component<Record<string, any>, State> {
  constructor(props: Record<string, any>) {
    super(props);
    this.state = {
      // default opened tab name
      active: 'textInput',
      timezone: 'Asia/Jakarta',
      input: new Date().toString(),
      pattern: '',
      timezoneData: timezones.map(item => ({
        ...item,
        key: md5(item.value + item.text),
        id: 'zone' + md5(item.value + item.text),
        dst: String(item.isdst),
      })),
      result: 'unformatted yet',
    };
    // require('./layout2/layout2.scss');
  }

  componentDidMount() {
    window.addEventListener('load', this.handleChanges.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleChanges.bind(this));
  }

  // componentDidUpdate(prevProps: Record<string, any>, prevState: State, snapshot: Record<string, any>) {
  //   // window.addEventListener('load', this.updateAllTimezones.bind(this));
  //   console.log({ prevProps, prevState, snapshot });
  // }

  render() {
    // const [active, setActive] = React.useState('textInput');
    let Render: (...args: any[]) => React.JSX.Element;
    const { active } = this.state;

    switch (active) {
      case 'dateInput':
        Render = this.DateInputLayout.bind(this);
        break;
      case 'textInput':
        Render = this.TextInputLayout.bind(this);
        break;
      case 'timezoneList':
        Render = this.TimezoneList.bind(this);
        break;
      case 'formatList':
        Render = Snippet;
        break;
      default:
        Render = this.TextInputLayout.bind(this);
        break;
    }

    return (
      <React.Suspense fallback={<div>Moment timezone playground loading</div>}>
        <h1>Moment Timezone Playground Online</h1>
        <p>
          Online test for library <Link href="https://npmjs.com/moment-timezone">moment-timezone</Link>
        </p>
        <Nav
          justified
          appearance="tabs"
          active={active}
          onSelect={(active: string) => {
            this.setState({ active });
          }}
          className="mb-2 mt-2"
        >
          <NavItem eventKey="textInput">Text Input</NavItem>
          <NavItem eventKey="dateInput">Date Input</NavItem>
          <NavItem eventKey="formatList">Format Cheatsheet</NavItem>
          <NavItem eventKey="timezoneList">Timezone List</NavItem>
        </Nav>
        <React.Suspense fallback={<div>Panel form loading</div>}>
          <Panel /*header=""*/ shaded className="mb-2">
            <React.Suspense fallback={<div>Date form loading</div>}>
              <Render />
            </React.Suspense>
          </Panel>
        </React.Suspense>
      </React.Suspense>
    );
  }

  TextInputLayout() {
    const DisplayResult = this.DisplayResult.bind(this);
    const TimezonePicker = this.AdditionalForms.bind(this);

    return (
      <Form fluid /*layout="inline"*/ className="mb-2">
        <FormGroup controlId="dateTextInput">
          <FormControlLabel>Text Input</FormControlLabel>
          <FormControl
            name="dateTextInput"
            defaultValue={moment(new Date()).format()}
            onChange={this.handleChanges.bind(this)}
          />
          <FormHelpText>insert date text</FormHelpText>
        </FormGroup>
        <React.Suspense fallback={<div>Timezone picker loading</div>}>
          <TimezonePicker />
        </React.Suspense>
        <React.Suspense fallback={<div>Result loading</div>}>
          <DisplayResult />
        </React.Suspense>
      </Form>
    );
  }

  DateInputLayout() {
    const DisplayResult = this.DisplayResult.bind(this);
    const TimezonePicker = this.AdditionalForms.bind(this);

    return (
      <Form fluid /*layout="inline"*/ className="mb-2">
        <FormGroup controlId="dateInput">
          <FormControlLabel>Date Input</FormControlLabel>
          <DatePicker format="yyyy-MM-dd HH:mm:ss" />
          <FormHelpText>pick the date</FormHelpText>
        </FormGroup>
        <React.Suspense fallback={<div>Timezone picker loading</div>}>
          <TimezonePicker />
        </React.Suspense>
        <React.Suspense fallback={<div>Result loading</div>}>
          <DisplayResult />
        </React.Suspense>
      </Form>
    );
  }

  TimezoneList() {
    const { timezoneData, input } = this.state;
    let { pattern } = this.state;
    if (pattern === '') {
      pattern = 'MMMM Do YYYY, h:mm:ss a';
    }

    return (
      <React.Suspense fallback={<div>Timezones loading</div>}>
        <PanelGroup accordion defaultActiveKey={1} bordered>
          {timezoneData.map((tz, i) => {
            return (
              <Panel
                header={tz.text}
                eventKey={i + 1}
                id={'panel' + i}
                shaded
                className="mb-2"
                key={'panelTimezone' + i + tz.value}
              >
                {tz.utc.map((item, ii) => {
                  return (
                    <React.Fragment key={'itemWrapper' + item + ii + i}>
                      <FlexboxGrid key={item + ii + i} className="mb2">
                        <FlexboxGridItem as={Col} colspan={24} xs={12}>
                          <p>{item}</p>
                          <p>Is DST? {String(tz.isdst)}</p>
                          <p>
                            <i className="fa-thin fa-clock"></i> <span>{moment(input).tz(item).format(pattern)}</span>
                          </p>
                        </FlexboxGridItem>
                        <FlexboxGridItem as={Col} colspan={24} xs={12}>
                          <HighlightElement>
                            {`
import momentTimezone from 'moment-timezone';
const moment = momentTimezone.tz('${item}');
`.trim()}
                          </HighlightElement>
                        </FlexboxGridItem>
                      </FlexboxGrid>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </Panel>
            );
          })}
        </PanelGroup>
      </React.Suspense>
    );
  }

  DisplayResult(props: Record<string, any>) {
    const { result } = this.state;
    const timezoneInfo = getTimeZoneOffset();

    // live clock
    // setInterval(updateNow, 1000);

    return (
      <Container {...props}>
        <FormGroup className="mb-2">
          <ButtonToolbar>
            <Button appearance="primary">Start Interval</Button>
            <Button appearance="primary" color="red">
              Stop Interval
            </Button>
            <Button
              appearance="primary"
              onClick={() => {
                copyTextToClipboard(result);
              }}
            >
              Copy Result
            </Button>
          </ButtonToolbar>
        </FormGroup>
        <p>format result</p>
        <HighlightElement id="moment-result" lang="text">
          {result}
        </HighlightElement>
        <p>
          Your browser timezone <b>{timezoneInfo.timeZone}</b> offset <b>{timezoneInfo.offset}</b>
        </p>
      </Container>
    );
  }

  AdditionalForms() {
    const clientTimezone = getTimeZoneOffset();
    return (
      <React.Fragment>
        <FormGroup controlId="timezone" className="mb-2">
          <FormControlLabel>Timezone String</FormControlLabel>
          <FormControl
            name="timezoneString"
            defaultValue={clientTimezone.timeZone}
            onChange={this.handleChanges.bind(this)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="pattern" className="mb-2">
          <FormControlLabel>Pattern String</FormControlLabel>
          <FormControl name="patternString" defaultValue="" onChange={this.handleChanges.bind(this)}></FormControl>
        </FormGroup>
      </React.Fragment>
    );
  }

  /**
   * update date all timezones
   */
  handleChanges() {
    const timezone = querySelector('input#timezone').value;
    const inputVal = querySelector('input#dateTextInput').value;
    // input reset to UTC
    const input = inputVal && moment(inputVal).tz(timezone).utc().format();
    const pattern = querySelector('input#pattern').value || '';
    if (input && timezone) {
      const result = moment(input).tz(timezone).format(pattern);
      // console.log({ input, timezone, pattern, result });
      this.setState({ input, timezone, pattern, result });
    }
  }
}

export default MTLayout2;
