import * as React from 'react';
import {Animated, StyleSheet, View} from 'react-360';
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';
import {connect} from './Store';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

/**
 * Renders the actual model in 3D space, rotating it a full 360 degrees to show
 * it from all angles.
 */
class ModelView extends React.Component {
    constructor(props) {
        super();
        console.warn(props);
        // Environment.setBackground();
    }

    rotation = new Animated.Value(0);
    rotationY = new Animated.Value(0);
    positionX = new Animated.Value(0);
    positionY = new Animated.Value(0);
    positionZ = new Animated.Value(-1);

    componentWillReceiveProps(nextProps) {
        if (nextProps.current !== this.props.current) {

            const direction = nextProps.isFlipped ? -1 : 1;
            this.rotationY.setValue(nextProps.isFlipped ? 180 : 0);

            Animated.timing(this.positionX, {toValue: direction * 5, duration: 5000}).start(() => {
                Animated.timing(this.rotation, {toValue: -55, duration: 2000}).start(() => {

                    Animated.delay(1000).start(() => {
                        Animated.timing(this.rotation, {toValue: 0, duration: 2000}).start();
                    });
                });

                Animated.delay(500).start(() => Animated.timing(this.rotationY, {
                    toValue: 90,
                    duration: 4000
                }).start());

                Animated.timing(this.positionZ, {toValue: -82, duration: 8000}).start();
                Animated.timing(this.positionX, {toValue: direction * 20, duration: 6500}).start(() => {
                    Animated.timing(this.rotationY, {
                        toValue: nextProps.isFlipped ? 0 : 180,
                        duration: 500
                    }).start();
                    Animated.delay(1500).start(() => Animated.timing(this.positionX, {
                        toValue: 0,
                        duration: 1000
                    }).start());
                })
            });
        }
    }

    render() {
        console.warn(this.props);
        if (!this.props.posts || this.props.current < 0) {
            return null;
        }
        const post = this.props.posts[this.props.current];
        const source = post.source;
        return (
            <View style={styles.skull}>
                <AmbientLight intensity={0.3} color={'#ffffff'}/>
                <PointLight
                    intensity={0.4}
                    style={{transform: [{translate: [0, 4, -1]}]}}
                />
                <AnimatedEntity
                    style={{transform: [{translateX: this.positionX}, {translateY: this.positionY}, {translateZ: this.positionZ}, {rotateX: this.rotation}, {rotateY: this.rotationY}]}}
                    source={{gltf2: source.root.url}}
                />

            </View>
        );
    }
}


const styles = StyleSheet.create({
    skull: {
        width: 20,
        height: 20,
    }
});

const ConnectedModelView = connect(ModelView);

export default ConnectedModelView;