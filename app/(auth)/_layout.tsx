import { Slot, Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function AuthLayout() {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#007AFF', // Active color (blue)
          tabBarInactiveTintColor: 'gray', // Inactive color
        }}
      >
        <Tabs.Screen
          name="viewjob"
          options={{
            title: "Jobs",
            tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons
                name="view-list"
                size={size}
                color={color} // <--- use the dynamic color
              />
            ),
          }}
        />
        <Tabs.Screen
          name="postjob"
          options={{
            title: "Post Job",
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome
                name="send-o"
                size={size}
                color={color} // <--- use the dynamic color
              />
            ),
          }}
        />
      </Tabs>
    );
  }

const style = StyleSheet.create({
    container: {
        borderColor: "red",
        borderWidth: 5,
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 25
    },
    header: {
        borderColor: "green",
        borderWidth: 1
    },
    footer: {
        borderColor: "orange",
        borderWidth: 1
    }
})