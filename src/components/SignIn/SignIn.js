import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { axiosInstance } from "../../utils";

function SignIn({ setUser }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function signInRequest() {
        try {
            const apiEndPoint = "/users/sign_in.json"

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
            <Text>Sign In!</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(change) => setEmail(change)}
                keyboardType={"email-address"}
                placeholder={"Email"}
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={(change) => setPassword(change)}
                secureTextEntry={true}
                placeholder={"Password"}
            />
            <Button
                title="Sign In"
                onPress={signInRequest}
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

export default SignIn; 