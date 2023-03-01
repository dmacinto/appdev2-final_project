import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

function SafeArea({ children}) {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            {children}
        </SafeAreaView>
    )
};

export default SafeArea;