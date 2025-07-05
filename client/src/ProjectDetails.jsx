import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import EditProject from './EditProject';
import axios from 'axios';

const ProjectDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { projectId } = route.params;   
    const [project, setProject] = useState(null); // single project object
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjectById();
    }, []);

    const fetchProjectById = async () => {
        try {
            const res = await axios.get(`http://192.168.31.133:8080/api/project/${projectId}`);
            setProject(res.data); // directly store object
        } catch (error) {
            console.error("Error fetching project: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            "confirm delete?",
            "are you sure you want to delete this project?",
            [
                {
                    text: "Cancel",
                    style: "cancle"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await axios.delete(`http://192.168.31.133:8080/api/project/delete/${projectId}`);
                            Alert.alert("Deleted", "Project deleted successfully");
                            navigation.goBack();
                        } catch (error) {
                            console.error("Error deleting project:", error);
                            Alert.alert("Error", "Failed to delete project");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <ScrollView style={{ backgroundColor: "white", paddingVertical: 16, paddingHorizontal: 20, paddingTop: 30 }}>
            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : project ? (
                <View style={styles.projectSection}>
                    <Text style={styles.label}>Title :</Text>
                    <Text>{project.projectTitle}</Text>

                    <Text style={styles.label}>Members :</Text>
                    <Text>{project.members}</Text>

                    <Text style={styles.label}>Category :</Text>
                    <Text>{project.category}</Text>

                    <Text style={styles.label}>Technology :</Text>
                    <Text>{project.technology}</Text>

                    <Text style={styles.label}>Start Date :</Text>
                    <Text>{project.startDate}</Text>

                    <Text style={styles.label}>End Date :</Text>
                    <Text>{project.endDate}</Text>

                    <Text style={styles.label}>Description :</Text>
                    <Text>{project.description}</Text>

                    <Text style={styles.label}>Status :</Text>
                    <Text>{project.status}</Text>
                </View>
            ) : (
                <Text>No project data available</Text>
            )}
            <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                <Button onPress={() => navigation.navigate('EditProject', { project })} title="Edit" color="green"/>
                <Button onPress={handleDelete}title="Delete" color="grey"/>
            </View>
        </ScrollView>
    );
};

export default ProjectDetails;

const styles = StyleSheet.create({
    projectSection: {
        backgroundColor: '#F9F9F9',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom:5
    }
});
