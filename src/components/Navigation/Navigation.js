import React from "react";
import { Text, View } from 'react-native';
import SignIn from "../SignIn/SignIn";
 
function HomeScreen() {
    return (
        <View>
            <Text>Home screen</Text>
        </View>
    )
};


export default function Navigation() {
    const [user, setUser] = React.useState(null);

    return (
        user ? <HomeScreen /> : <SignIn setUser={setUser} />
    );
}