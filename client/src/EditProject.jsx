import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, Alert, TextInput } from 'react-native'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditProject = () => {

	const navigation = useNavigation();
	const route = useRoute();
	const { project } = route.params;

	const [projectTitle, setprojectTitle] = useState(project.projectTitle);
	const [status, setStatus] = useState(project.status);
	const [description, setDescription] = useState(project.description);
	const [category, setCategory] = useState(project.category);
	const [technology, setTechnology] = useState(project.technology);
	const [startDate, setStartDate] = useState(project.startDate);
	const [endDate, setEndDate] = useState(project.endDate);
	const [members, setMembers] = useState(project.members);

	const handleUpdate = async () => {
		try {
			const updatedData = {
				projectTitle,
				category,
				members,
				technology,
				startDate,
				endDate,
				description,
				status,
			 
			};

			await axios.put(`http://192.168.31.133:8080/api/update/project/${project._id}`, updatedData);
			Alert.alert('Success', 'Project updated successfully.!');
			navigation.goBack();

		} catch (error) {
			console.error(error);
			Alert.alert('Error', 'Could not update project..');
		}
	}




	return (
		<SafeAreaView>
			<ScrollView>
				<Text>Edit Project</Text>

				<TextInput
					style={styles.input}
					value={projectTitle}
					onChangeText={setprojectTitle}
					placeholder="Project Title"
				/>

				<TextInput
					style={styles.input}
					value={members}
					onChangeText={setMembers}
					placeholder="Members"
				/>

				<TextInput
					style={styles.input}
					value={category}
					onChangeText={setCategory}
					placeholder="Category"
				/>

				<TextInput
					style={styles.input}
					value={technology}
					onChangeText={setTechnology}
					placeholder="Technology"
				/>

				<TextInput
					style={styles.input}
					value={startDate}
					onChangeText={setStartDate}
					placeholder="Start date"
				/>

				<TextInput
					style={styles.input}
					value={endDate}
					onChangeText={setEndDate}
					placeholder="End date"
				/>

				<TextInput
					style={styles.input}
					value={members}
					onChangeText={setMembers}
					placeholder="Members"
				/>

				<TextInput
					style={styles.input}
					value={status}
					onChangeText={setStatus}
					placeholder="Members"
				/>

				<Pressable style={styles.updateButton} onPress={handleUpdate}>
					<Text style={styles.updateButtonText}>Update Project</Text>
				</Pressable>

				

			</ScrollView>
		</SafeAreaView>
	)
}

export default EditProject

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff'
	},
	header: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 20
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 12,
		borderRadius: 8,
		marginBottom: 12
	},
	updateButton: {
		backgroundColor: '#007bff',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center'
	},
	updateButtonText: {
		color: 'white',
		fontWeight: 'bold'
	}
})