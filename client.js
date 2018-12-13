// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Location, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
    const r360 = new ReactInstance(bundle, parent, {
        // Add custom options here
        fullScreen: true,
        ...options,
    });
    // Create three roots: two flat panels on the left and the right, and a Location
    // to mount rendered models in 3D space
    const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
    leftPanel.setAngle(-0.6, 0);
    const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
    rightPanel.setAngle(0.6, 0);
    // r360.renderToSurface(
    //     r360.createRoot('TopPosts'),
    //     leftPanel,
    // );
    // const surface = r360.getDefaultSurface();
    r360.renderToLocation(
        r360.createRoot('NoScope', {/* initial props */}),
        new Location([-12.5, 15, -80])
    );
    r360.renderToLocation(
        r360.createRoot('ModelView'),
        new Location([-3, -3, -5]),
    );
    r360.renderToLocation(
        r360.createRoot('ModelView', {isFlipped: true}),
        new Location([3, -3, -20]),
    );


    // Load the initial environment
    r360.compositor.setBackground(r360.getAssetURL('DismemberStairwell.png'));
}

window.React360 = {init};
