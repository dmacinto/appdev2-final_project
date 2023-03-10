import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { axiosInstance } from "../../utils";

function CreateTask({ }) {
    const [body, setBody] = React.useState("");
    
    async function createRequest() {
        try {
            const apiEndPoint = "/tasks/new.json"

            const descrip = {
                user: {
                    body: body
                }
            }

            const response = await axiosInstance.post(apiEndPoint, descrip);

            setBody(response.data);
        } catch (error) {
            console.error(error.toJSON());
        }
    }

    return (
        <View>
            <Text>Create Task</Text>
            <TextInput
                style={styles.input}
                value={body}
                onChangeText={(change) => setBody(change)}
                keyboardType={"task-body"}
                placeholder={"Task"}
            />
            <Button
                title="Create Task"
                onPress={createRequest}
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

export default CreateTask; 