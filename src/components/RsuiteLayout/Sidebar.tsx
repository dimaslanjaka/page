import React from 'react';
//

import { fetchWithCache } from '@utils/ajax';
import * as utils from '@utils/index';
import { Panel, Stack } from 'rsuite';
import * as project from 'src/project';

// const Stack = React.lazy(() => import('rsuite/esm/Stack'));
// const Panel = React.lazy(() => import('rsuite/esm/Panel'));
// const Divider = React.lazy(() => import('rsuite/esm/Divider'));

interface FeedState {
  feedItems: {
    [key: string]: any;
    title: string;
    author?: string;
    date: string;
    description: string;
    id: string;
    link: string;
    image?: string;
    category: { name: string; link?: string }[];
  }[];
}

class MySidebar extends React.Component<Record<string, any>, FeedState> {
  _controller: AbortController;
  _signal: AbortSignal;
  _mounted: boolean;
  _runner: (...args: any[]) => any;

  constructor(props: any) {
    super(props);
    this.state = { feedItems: [] };
    this._runner = this.fetchRss.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    window.addEventListener('load', this._runner);
  }

  componentWillUnmount() {
    if (this._controller) this._controller.abort();
    window.removeEventListener('load', this._runner);
  }

  fetchRss() {
    this._controller = new AbortController();

    if (this._mounted) {
      this._signal = this._controller.signal;
      const url = 'https://api.allorigins.win/raw?url=https://www.webmanajemen.com/rss.xml';
      fetchWithCache(url, {
        mode: 'cors',
        credentials: 'include'
      })
        .then(response => response.text())
        .then(response => {
          // const contents = response.data;
          const contents = response;
          const feed = new window.DOMParser().parseFromString(contents, 'text/xml');
          const items = Array.from(feed.querySelectorAll('item'));
          const feedItems = items.map(el => {
            const build = {} as FeedState['feedItems'][number];
            build.link = el.querySelector('link')?.innerHTML || '#no-link';
            build.id = 'feed-' + utils.md5(build.link);
            build.author = el.querySelector('author')?.innerHTML || project.pkgjson.author;
            build.title = el.querySelector('title')?.innerHTML || 'No Title';
            build.date = el.querySelector('pubDate')?.innerHTML || 'No Date';
            build.description = el.querySelector('description')?.innerHTML || 'No Description';
            build.category = Array.from(el.querySelectorAll('category')).map(cat => {
              return { name: cat.innerHTML, link: cat.getAttribute('domain') };
            });
            const imgrg = /<img[^>]+src="?([^"\s]+)"?\s*/gm;
            const content = String(el.getElementsByTagNameNS('*', 'encoded').item(0).innerHTML).replace(/\s+/gm, ' ');
            let m: ReturnType<typeof imgrg.exec>;
            const images = [] as string[];
            while ((m = imgrg.exec(content))) {
              images.push(m[1]);
            }
            let image = images.filter(str => !/undefined$/.test(str))[0];
            if (image) {
              if (!utils.isValidHttpUrl(image)) {
                image = '//www.webmanajemen.com' + image;
              }
              build.image = image;
            }

            return build;
          });
          if (this._mounted) this.setState({ feedItems });
        })
        .catch(console.error)
        .finally(() => {
          this._controller = null;
        });
    }
  }

  render() {
    return (
      <div>
        <div className="text-center mb-2">
          <h4>Latest Posts</h4>
        </div>
        {this.state.feedItems.slice(0, 10).map((item, i) => {
          return (
            <Panel
              key={'sidebar-feed-' + i + item.title}
              bordered
              header={
                <Stack justifyContent="space-between">
                  <span>{item.title}</span>
                </Stack>
              }
              className="mb-2"
              onClick={() => console.log('clicked', item.title)}
            >
              <div>
                {item.image && (
                  <div
                    style={{
                      marginRight: '4px',
                      backgroundImage: `url('${item.image}')`,
                      height: '100px',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover'
                    }}
                  />
                )}
                <b>
                  <a href={item.link} target="_blank">
                    {item.title}
                  </a>
                </b>
                <p>{item.description.substring(0, 120) + '...'}</p>
              </div>
            </Panel>
          );
        })}
      </div>
    );
  }
}

export default MySidebar;
