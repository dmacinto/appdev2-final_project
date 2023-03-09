import React from "react";
import { ScrollView, View, Text } from "react-native";

function Task({ task }) {
    return (
        <View>
            <Text>{task.body}</Text>
        </View>
    )
}

function TaskFeed({ user }) {
    const [tasks, setTasks] = React.useState([]);

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
            <Text>Feed</Text>
			<ScrollView>
            {
                tasks?.map((task) => {
                    return (
                        <Task task={task} key={task.id} />
                    )
                })
            }
		    </ScrollView>
        </View>
    )
}

export default TaskFeed;