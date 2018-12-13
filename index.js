import React from 'react';
import {AppRegistry, setBackgroundImage, StyleSheet, Text, View} from 'react-360';
import {connect, initialize} from './Store';
import ModelView from "./ModelView";

initialize('AIzaSyC8q_ahzfINqdJC0jw5HzV4IfrMYpVtVkM');


class NoScope extends React.Component {
    render() {
        return (
            <View style={styles.greetingBox}>
                <Text style={styles.greeting}>
                    SCARY
                </Text>
                <Text style={styles.greeting}>
                    SCARY
                </Text>
            </View>
        );
    }
};
const ConnectedNoScope = connect(NoScope);
export default ConnectedNoScope

const styles = StyleSheet.create({
    greetingBox: {
        width: 25,
        height: 40,
        opacity: 0.8,
        padding: 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    greeting: {
        fontSize: 5,
        textAlign: 'center',
        color: 'black'
    },
});

AppRegistry.registerComponent('NoScope', () => ConnectedNoScope);
AppRegistry.registerComponent('ModelView', () => ModelView);