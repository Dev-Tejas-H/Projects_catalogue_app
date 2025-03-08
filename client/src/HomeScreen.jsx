import { StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, Pressable, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AddProject from './AddProject';
import axios from "axios";

const SearchIcon = require("../assets/searchicon.png");

const HomeScreen = ({navigator}) => {
    const navigation = useNavigation();
    // const ProjectDetails = [
	// 	{
	// 		id:"1",
	// 		title:"BEL",
	// 		startdate:"27/08/2024",
	// 		enddate:"03/09/2024",
	// 		projectstatus:"pending"
	// 	},
	// 	{
	// 		id:"2",
	// 		title:"BekueiEL",
	// 		startdate:"27/08/2024",
	// 		enddate:"03/09/2024",
	// 		projectstatus:"completed"
	// 	},
	// 	{
	// 		id:"3",
	// 		title:"ijijr",
	// 		startdate:"27/08/2024",
	// 		enddate:"03/09/2024",
	// 		projectstatus:"not started"
	// 	},
	// 	{
	// 		id:"4",
	// 		title:"Tejas",
	// 		startdate:"27/08/2024",
	// 		enddate:"03/09/2024",
	// 		projectstatus:"started"
	// 	},
	// ];
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchProjects();
	}, []);


	const fetchProjects = async () => {
		try {
			const res = await axios.get("http://192.168.31.133:8080/api/projects");
			setProjects(res.data);
		} catch(error) {
			console.error("Error fetching projects: ", error);
		} finally {
			setLoading(false);
		}
	};

	const renderProjectItem = ({ item }) => (
		<View style={styles.projectSection}>
			<Text>{item.projectTitle}</Text>
			<Text>{item.status}</Text>
		</View>
	)

  return (
    <SafeAreaView>
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

			{/**____________ header_____________ */}

			<View style={styles.headerSection}>
				<Text style={styles.headerText}>Projects catalog</Text>
				<Pressable style={styles.addProject} onPress={() => navigation.navigate("AddProject")}>
					<Text style={styles.addProjectText}>Add Project</Text>
				</Pressable>
			</View>


			{/** _____________search bar_______________ */}

			<View style={styles.SearchBarInput}>
				<Image source={SearchIcon} style={{width:20, height:20}}/>
				<TextInput
					placeholder="Search for projects"
					style={{flex:1, fontWeight:'500',fontSize:16}}
					placeholderTextColor={'#7C7E7E'}
				/>
			</View>
			<Text style={{fontWeight:"bold"}}>Recent Projects...</Text>
				
			{loading ? (
				<ActivityIndicator size="large" color="blue" />

			) : (
				<FlatList
					data={projects}
					keyExtractor={(item) => item._id}
					renderItem={renderProjectItem}
				/>
			)}	


		</ScrollView>	
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
		paddingHorizontal:20,
		paddingVertical:20
	},
	headerSection:{
		marginTop:20,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		marginBottom:20
	},
	headerText:{
		fontSize:20,
		fontStyle:"normal",
		fontWeight: "900",
	},
	addProject:{
		paddingVertical:6,
		paddingHorizontal:9,
		backgroundColor:"#399918",
		borderRadius:7,
		width: "30%",
		height:"100%",
		alignItems:"center"
	},
	addProjectText:{
		fontSize:12,
		color:"#FFFFFF",
		fontWeight:"600"
	},
	SearchBarInput:{
		borderColor: '#CBCDCD',
		flexDirection: 'row',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		padding: 10,
		height: 65,
		gap: 8,
		width: "100%",
		marginBottom:20
	},
	projectSection:{
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		paddingVertical:16,
		borderBottomColor:"#DDDDDD",
		borderBottomWidth:1
	}
})