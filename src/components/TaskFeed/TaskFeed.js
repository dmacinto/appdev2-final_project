import React from "react";
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Modal, Dropdown } from "react-native";
import { axiosInstance } from "../../utils";
import { TextInput } from "react-native-gesture-handler";



function Task({ task }) {
    return (
        <View>
            <Text>{task.body}</Text>
            <Text>{task.status}</Text>
        </View>
    )
}

function TaskFeed({ user }) {
    const [tasks, setTasks] = React.useState([]);
    const [isRender, setisRender] = React.useState(false);
    const [isModalVisible, setisModalVisible] = React.useState(false);
    const [inputText, setinputText] = React.useState();
    const [editTask, seteditTask] = React.useState();
    
    const statusData = [
        { label: 'Uncompleted', value: 'uncompleted' },
        { label: 'In-Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' }
    ];

    
    const onPressTask = (task) => {
        setisModalVisible(true);
        setinputText(task.body);
        seteditTask(task.id);
    }


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

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity
                style={styles.item}
                onPress={()=> onPressTask(item)}
            >
                <Task task={item}/>
            </TouchableOpacity>
        )
    }


    const handleEditTask = (editTask) => {
        const changeData = tasks.map(async task => {
            if (task.id == editTask) {

                const apiSend = {
                    task: {
                        body: inputText,
                        status: task.status
                    }
                }
                await axiosInstance.patch(`/tasks/${task.id}.json?user_email=${user.email}&user_token=${user.authentication_token}`, apiSend);
                return task;
            }
            return task;
        })
        setTasks(changeData);
        setisRender(!isRender);
    }




    async function updateTask(task) {
        try{
            const apiEndPoint =`/tasks/${editTask}.json?user_email=${user.email}&user_token=${user.authentication_token}`;
            const apiSend = {
                task: {
                    body: inputText
                }
            }
            const response = await axiosInstance.patch(apiEndPoint, apiSend);
            console.log(response.data)
            const newTasks = tasks.map(
                task => task.id === response.data.id ? 
                //if the id matches then replace the task 
                response.data
                :
                //if id doesnt match then return the task
                task
            )
            setTasks(newTasks)
        }
        catch (error) {
            console.error(error.toJSON());
        }
    
    } 
    const onPressSaveEdit = () => {
        updateTask(editTask);
        setisModalVisible(false);
    }


    const handleDeleteTask = async (editTask) => {
        await deleteTask(editTask);
        setisRender(!isRender);
    }

    async function deleteTask(taskId) {
        try {
            const apiEndPoint = `/tasks/${taskId}.json`;
            const body = {
                user: {
                    email: user.email,
                    authentication_token: user.authentication_token,
                },
            };
            await axiosInstance.delete(apiEndPoint, { data: body });
    
            const newTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(newTasks);
        } catch (error) {
            console.error(error.toJSON());
        }
    }





    const onPressDeleteEdit = () => {
        handleDeleteTask(editTask);
        setisModalVisible(false);
    }


    async function addTask(task) {
        try{
            const apiEndPoint =`/tasks.json?user_email=${user.email}&user_token=${user.authentication_token}`;
            const apiSend = {
                task: {
                    body: inputText
                }
            }
            const response = await axiosInstance.post(apiEndPoint, apiSend);
            console.log(response.data)
            const newTasks = tasks.map(
                task => task.id === response.data.id ? 
                //if the id matches then replace the task 
                response.data
                :
                //if id doesnt match then return the task
                task
            )
            setTasks(newTasks)
        }
        catch (error) {
            console.error(error.toJSON());
        }
    
    } 


    const onPressAddEdit = () => {
        addTask(editTask);
        setisModalVisible(false);
    }

    React.useEffect(() => {
        getFeed()
    }, [])

    return (
        <View>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.contentContainer}
                ListHeaderComponent={ListHeader}
                extraData={isRender}
            />
            <Modal
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={() => setisModalVisible(false)} >

             <View style={styles.modalView}>
                <Text style={styles.text}>
                    Change Task
                </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text)=> setinputText(text)}
                    defaultValue={inputText}
                    editable={true}
                    multiline={false}

                />

                
                <TouchableOpacity
                 onPress={() =>onPressSaveEdit()}
                 style={styles.touchableSave}
                >
                    <Text style={styles.text}>Save</Text>

                </TouchableOpacity>


                <TouchableOpacity
                 onPress={() =>onPressDeleteEdit()}
                 style={styles.touchableSave}
                >
                    <Text style={styles.text}>Delete</Text>

                </TouchableOpacity>

                <TouchableOpacity
                 onPress={() =>setisModalVisible(false)}
                 style={styles.touchableSave}
                >
                    <Text style={styles.text}>Cancel</Text>

                </TouchableOpacity>

             </View>
            </Modal>

            <View>

             <TextInput
                    style={styles.newInput}
                    onChangeText={(text)=> setinputText(text)}
                    defaultValue={null}
                    editable={true}
                    multiline={false}
                />
                <Button
                title="Create Task"
                onPress={onPressAddEdit}
              />

            </View>

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
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
        borderTopWidth:1
    },
    input: {
        height: 40,
        marginTop: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
      },
    item: {
        borderBottomWidth: 1,
        borderBottomColor:'grey',
        alignItems: 'center',
        fontSize: 24
      },
    textInput:{
        width: '90%',
        height: 70,
        borderColor: 'grey',
        borderWidth: 1,
        fontSize: 25
      },
    modalView:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableSave: {
        backgroundColor: 'orange',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: 20
    },
    text:{
        fontSize: 25
    },
    newInput:{
        width: '90%',
        height: 30,
        borderColor: 'grey',
        borderWidth: 1,
        fontSize: 25,
        marginTop: 12,
        textAlign: 'center'
    }

})


export default TaskFeed;