import React from "react";
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Modal } from "react-native";
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

                const body = {
                    user: {
                        body: inputText,
                        status: task.status
                    }
                }
                await axiosInstance.patch(`/tasks/${task.id}.json`, body);
                return task;
            }
            return task;
        })
        setTasks(changeData);
        setisRender(!isRender);
    }

    const onPressSaveEdit = () => {
        handleEditTask(editTask);
        setisModalVisible(false);
    }


    const handleDeleteTask = (editTask) => {
        const changeData = tasks.map(async task => {
            if (task.id == editTask) {

                const body = {
                    user: {
                        body: inputText,
                        status: task.status//,
                        //commit: "Update Task",
                        //id: task.id
                    }
                }
                await axiosInstance.delete(`/tasks/${task.id}.json`, body);
                return task;
            }
            return task;
        })
        setTasks(changeData);
        setisRender(!isRender);
    }

    const onPressDeleteEdit = () => {
        handleDeleteTask(editTask);
        setisModalVisible(false);
    }



   // const handleAddTask = (editTask) => {
    //    const changeData = tasks.map(async task => {
     //       if (task.id == editTask) {

       //         const body = {
         //           user: {
           //             body: inputText,
             //           status: task.status//,
               //         //commit: "Update Task",
                        //id: task.id
                 //   }
                //}
                //await axiosInstance.delete(`/tasks/${task.id}.json`, body);
                //return task;
           // }
            //return task;
       // })
       // setTasks(changeData);
        //setisRender(!isRender);
  //  }

    //const onPressAddEdit = () => {
     //   handleAddTask(editTask);
      //  setisModalVisible(false);
   // }







    React.useEffect(() => {
        getFeed()
    }, [])

    return (
        <View>
            <FlatList
                data={tasks}
                renderItem={renderItem }
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
            <Button
                title="Create Task"
     //           onPress={onPressAddEdit()}
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
    }

})


export default TaskFeed;