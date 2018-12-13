import * as React from 'react';

/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const State = {
    posts: undefined,
    current: -1,
    background: {}
};

const listeners = new Set();

function updateComponents() {
    for (const cb of listeners.values()) {
        cb();
    }
}

const POLY_PATH = 'https://poly.googleapis.com/v1/assets/';

export function initialize(apiKey) {
    // Fetch the top 5 posts from Google Poly
    const options = {
        // curated: true,

        // format: 'GLTF2',
        key: apiKey,
        // pageSize: 5,
    };
    const rollerSkateAsset = "3SRO1k1Brxe";
    const chicagoSetting = "1u0oYxOIWRr";

    const queryString = Object.keys(options)
        .map(k => `${k}=${options[k]}`)
        .join('&');
    fetch(`${POLY_PATH}${rollerSkateAsset}?${queryString}`)
        .then(response => {
            return response.json()
        })
        .then(body => {
            console.warn(body);
            const objSource = body.formats.filter(
                format => format.formatType === 'GLTF2'
            )[0];
            const entries = [{
                id: body.name,
                name: body.displayName,
                author: body.authorName,
                description: body.description,
                source: objSource,
                preview: body.thumbnail.url,
            }];
            State.posts = entries;
            State.current = 0;
            updateComponents();
        });

    fetch(`${POLY_PATH}${chicagoSetting}?${queryString}`)
        .then(response => {
            return response.json()
        })
        .then(body => {
            console.warn(body);
            State.background = body;
            updateComponents();
        }).catch(error =>
        console.warn(error));
}

export function setCurrent(value) {
    console.warn(value);
    State.current = value;
    updateComponents();
}

export function connect(Component) {
    return class Wrapper extends React.Component {
        state = {
            posts: State.posts,
            current: State.current,
            background: State.background
        };

        _listener = () => {
            this.setState({
                posts: State.posts,
                current: State.current,
                background: State.background
            });
        };

        componentDidMount() {
            listeners.add(this._listener);
        }

        componentWillUnmount() {
            listeners.delete(this._listener);
        }

        render() {
            return (
                <Component
                    {...this.props}
                    posts={this.state.posts}
                    current={this.state.current}
                    background={this.state.background}
                />
            );
        }
    };
}