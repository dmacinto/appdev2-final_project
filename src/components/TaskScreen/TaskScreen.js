import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TaskScreen = ({ navigation, token }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleUpdateTask = (taskId, status) => {
    axios.put(`http://localhost:3000/tasks/${taskId}`, { task: { status } }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        const updatedTask = response.data;
        const newTasks = tasks.map(task => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          } else {
            return task;
          }
        });
        setTasks(newTasks);
      })
      .catch(error => console.log(error));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUpdateTask(item.id, 'completed')}>
      <View style={{ backgroundColor: item.status === 'completed' ? 'green' : 'white' }}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default TaskScreen;
