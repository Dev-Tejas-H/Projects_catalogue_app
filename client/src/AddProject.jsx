import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Pressable, Platform, Button,TouchableWithoutFeedback, Alert } from 'react-native'
import React, {useState, Component, useRef} from 'react'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const AddProject = () => {

	const [projectTitle, setprojectTitle] = useState("");
	const [members, setMembers] = useState("");
	const [category, setCategory] = useState("");
	const [technology, setTechnology] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("");
	const [response, setResponse] = useState("");


	const handleSubmit = async () => {

		if (!projectTitle || !members || !category || !technology || !startDate || !endDate || !description || !status) {
			Alert.alert("Error", "please fill all fields");
			return;
		}
		try {
			const res = await axios.post("http://add_your_ip_address_followed_by_port:8080/api/project", { projectTitle, members, category, technology, startDate, endDate, description, status});
			setResponse(res.data.message);
			Alert.alert("Success", res.data.message);
		} catch(error) {
			Alert.alert("Error", error.response?.data?.message || "something went wrong");
		}
	};


	return (
		<SafeAreaView>
			<ScrollView style={{backgroundColor:"white",paddingHorizontal:20,paddingVertical:20}} showsVerticalScrollIndicator={false}>
				<View style={styles.sectionStyling}>
					<Text>Project title <Text style={{color:"red"}}>*</Text></Text>
					<TextInput
						// onChangeText={(projectTitle) => {this.setState({projecttitle:projectTitle})}}
						// ref={projectTitle}
						style={styles.inputText}
						placeholder='Type project title'
						value={projectTitle}
						onChangeText={setprojectTitle}
					/>
				</View>
				<View style={styles.sectionStyling}>
					<Text>Team members <Text style={{color:"red"}}>*</Text></Text>
					<TextInput 
						style={styles.inputText}
						placeholder='Type team members'
						value={members}
						onChangeText={setMembers}
					/>
				</View>

				<View style={styles.sectionStyling}>
					<Text>Category <Text style={{color:"red"}}>*</Text></Text>
					<TextInput
						style={styles.inputText}
						placeholder='Ex: Full-stack, AI/ML, cyber security'
						value={category}
						onChangeText={setCategory}
					/>
				</View>

				<View style={styles.sectionStyling}>
					<Text>Technologies used <Text style={{color:"red"}}>*</Text></Text>
					<TextInput
						placeholder="Ex : C/C++, Java, Python"
						style={styles.inputText}
						value={technology}
						onChangeText={setTechnology}

					/>
				</View>

				<View style={styles.sectionStyling}>
					<Text style={{marginBottom:5}}>Start date: <Text style={{color:"red"}}>*</Text></Text>
					<TextInput
						placeholder='Ex: 30/12/2020'
						style={styles.inputText}
						value={startDate}
						onChangeText={setStartDate}
					/>
				</View>

				<View style={styles.sectionStyling}>
					<Text style={{marginBottom:5}}>End date: <Text style={{color:"red"}}>*</Text></Text>
					<TextInput
						placeholder='Ex: 20/01/2021'
						style={styles.inputText}
						value={endDate}
						onChangeText={setEndDate}
					/>

				</View>

				<View style={styles.lastSection}>
					<Text>Project Description <Text style={{color:"red"}}>*</Text></Text>
					<TextInput 
						style={styles.projectDescription}
						value={description}
						onChangeText={setDescription}
						
					/>
				</View>
				<View style={styles.sectionStyling}>
					<Text>Project status <Text style={{color:"red"}}>*</Text></Text>
					<TextInput 
						style={styles.inputText}
						placeholder='Type project status'
						value={status}
						onChangeText={setStatus}
						
					/>
				</View>
				
				<View style={styles.submitButton}>
					<Pressable style={styles.submitBtn} onPress={handleSubmit}>
					{response ? <Text style={{ marginTop: 10 }}>{response}</Text> : null}
						<Text style={{color:"white", fontWeight: "bold"}}>Submit</Text>
					</Pressable>
					
					<Pressable style={styles.discardButton}>
						<Text style={{color:"black", fontWeight: "bold"}}>Discard</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default AddProject

const styles = StyleSheet.create({

	sectionStyling:{},
	inputText:{
		marginTop:5,
		borderWidth:1,
		paddingVertical:5,
		borderColor:"#CBCDCD",
		borderRadius:5,
		paddingLeft:15,
		marginBottom:15

	},
	projectDescription:{
		marginTop:5,
		borderWidth:1,
		paddingVertical:5,
		height:100,
		borderColor:"#CBCDCD",
		borderRadius:5,
		paddingLeft:15,
		marginBottom:15,

		
	},
	lastSection:{
		marginBottom:20
	},
	submitButton:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		marginBottom:40

	},
	submitBtn:{
		alignItems:"center",
		justifyContent:"center",
		paddingVertical:8,
		backgroundColor:"green",
		width:"47%",
		borderRadius:5,
	},
	discardButton:{
		alignItems:"center",
		justifyContent:"center",
		paddingVertical:8,
		width:"47%",
		borderColor:"#DDDDDD",
		borderWidth:1,
		borderRadius:5
	}

});

