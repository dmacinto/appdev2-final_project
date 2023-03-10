import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { axiosInstance } from "../../utils";

function SignOut({ setUser }) {
    async function signOutRequest() {
        try {
            const apiEndPoint = "/users/sign_out.json"

            const body = {
                user: {
                    email: email,
                    password: password
                }
            }

            const response = await axiosInstance.post(apiEndPoint, body);

            setUser(response.data);
        } catch (error) {
            console.error(error.toJSON());
        }
    }

    return (
        <View>
            <Text>Sign Out!</Text>
            <Button
                title="Sign Out"
                onPress={signOutRequest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
    flex: 1,
    padding: 12,
    justifyContent: 'center'
},
input: {
  height: 40,
  marginTop: 12,
  marginBottom: 12,
  borderWidth: 1,
  padding: 10,
}
});

export default SignOut; 