import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
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
            const apiEndPoint = `/alice/feed.json?user_email=alice@example.com&user_token=wjrggLdTnBDsw1hJw3EU`
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
        padding: 12
    }
})


export default TaskFeed;