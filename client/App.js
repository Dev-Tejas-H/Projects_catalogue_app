import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from './src/HomeScreen';
import AddProject from './src/AddProject';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="HomeScreen">
				<Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
				<Stack.Screen name="AddProject" component={AddProject}/>
                {/* <Stack.Screen name="ProjectDetails" component={ProjectDetails}/> */}

			</Stack.Navigator>
		</NavigationContainer>
	);
}


