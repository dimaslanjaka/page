import React from 'react';
import { Adsense, AdsenseFill } from '../../components/Adsense';
import { SafelinkContents } from '../../components/SafelinkContents';
import { array_shuffle, md5 } from '../../utils';

interface FeedState {
  feedItems: {
    [key: string]: any;
    title: string;
    author?: string;
    date: string;
    description: string;
    id: string;
    link: string;
  }[];
}

export class SafelinkLayout2 extends React.Component<Record<string, never>, FeedState> {
  constructor(props: Record<string, never> | Readonly<Record<string, never>>) {
    super(props);
    this.state = {
      feedItems: [],
    };
  }

  componentDidMount(): void {
    const url = 'https://api.allorigins.win/raw?url=https://www.webmanajemen.com/rss.xml';
    fetch(url, {
      mode: 'cors',
      credentials: 'include',
    })
      .then(res => res.text())
      .then(contents => {
        const feed = new window.DOMParser().parseFromString(contents, 'text/xml');
        const items = Array.from(feed.querySelectorAll('item'));
        const feedItems = items.map(el => {
          const build = {} as FeedState['feedItems'][number];
          build.link = el.querySelector('link')?.innerHTML;
          build.id = 'feed-' + md5(build.link);
          build.author = el.querySelector('author')?.innerHTML;
          build.title = el.querySelector('title')?.innerHTML;
          build.date = el.querySelector('pubDate')?.innerHTML;
          build.description = el.querySelector('description')?.innerHTML;
          build.category = Array.from(el.querySelectorAll('category')).map(cat => {
            return { name: cat.innerHTML, link: cat.getAttribute('domain') };
          });
          return build;
        });
        this.setState({ feedItems });
      })
      .catch(console.error);
  }

  render() {
    return (
      <main className="container-fluid">
        <div className="row">
          <div className="col-md-4 d-none d-lg-block">
            {/*get random 10 feeds*/}
            {array_shuffle(this.state.feedItems)
              .slice(0, 10)
              .map((item, i) => {
                return (
                  <div className="card mb-3" key={'feed' + i + item.id} id={item.id}>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img src="//webmanajemen.com/favicon.ico" className="card-img" alt={item.title} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            <a href={item.link} className="text-decoration-none" target="_blank">
                              {item.title}
                            </a>
                          </h5>
                          <p className="card-text">{item.description.substring(0, 70)}</p>
                          <p className="card-text">
                            <small className="text-muted">{item.date}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-md-8">
            <AdsenseFill />
            <SafelinkContents />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Adsense
              className="adsbygoogle"
              style={{ display: 'block' }}
              format="autorelaxed"
              client="ca-pub-2188063137129806"
              slot="5041245242"
            ></Adsense>
          </div>
        </div>
      </main>
    );
  }
}
