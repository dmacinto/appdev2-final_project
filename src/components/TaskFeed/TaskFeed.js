import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { axiosInstance } from "../../utils";
 

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
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28, 
        fontWeight: '600'
    },
    contentContainer: {
        paddingTop: 80,
        paddingHorizontal: 20
    }
})


export default TaskFeed;