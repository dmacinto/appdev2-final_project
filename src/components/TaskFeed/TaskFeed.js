import React from "react";
import { View, Text, FlatList, StyleSheet, Button, TextInput } from "react-native";
import { axiosInstance } from "../../utils";
import SignOut from "../SignOut/SignOut";
import CreateTask from "../CreateTask/CreateTask";


function Task({ task }) {
    return (
        <View>
            <Text>{task.body}</Text>
        </View>
    )
}




function TaskFeed({ user }) {
    const [tasks, setTasks] = React.useState([]);

    function ListHeader() {
        return (
            <Text style={styles.title}>Feed</Text>
        )
    }

    async function getFeed() {
        try {
            const apiEndPoint = `/${user.username}/feed.json?user_email=${user.email}&user_token=${user.authentication_token}`
            const response = await axiosInstance.get(apiEndPoint)
            setTasks(response.data);
        } catch(error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getFeed()
    }, [])

    return (
        <View>
            <FlatList
                data={tasks}
                renderItem={({item}) => <Task task={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.contentContainer}
                ListHeaderComponent={ListHeader}
                
            />


            <Button
                title="Create Task"
                onPress={CreateTask}
            />

            <Button
                title="Delete Task"
            />

            <Button
                title="Edit Task"
            />

            <Button
                title="Sign Out"
                onPress={SignOut}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28, 
        fontWeight: '600',
        textAlign: 'center'
    },
    contentContainer: {
        paddingTop: 80,
        paddingHorizontal: 20
    },
    input: {
        height: 40,
        marginTop: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
      }
})


export default TaskFeed;