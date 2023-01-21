import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../CommonStyles/Theme';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
const BottomNavbar = ({ navigation, pagename }) => {
    return (
        <View style={styles.s1}>
            {
                pagename == "Home" ?
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} >
                        <View style={styles.s2}>
                            <FontAwesome5 name="home" size={24} color="white" style={styles.active} />
                            <Text style={styles.t1active} >Home</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} >
                        <View style={styles.s2}>
                            <FontAwesome5 name="home" size={24} color="white" />
                            <Text style={styles.t1} >Home</Text>
                        </View>
                    </TouchableOpacity>
            }
            {
                pagename == "SavedDocs" ?
                    <TouchableOpacity onPress={() => navigation.navigate("SavedDocs", { doctype: "All" })} >
                        <View style={styles.s2}>
                            <FontAwesome name="bookmark" size={24} color="white" style={styles.active} />
                            <Text style={styles.t1} onPress={() => navigation.navigate("SavedDocs", { doctype: "All" })}>Docs</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => navigation.navigate("SavedDocs", { doctype: "All" })} >
                        <View style={styles.s2}>
                            <FontAwesome name="bookmark" size={24} color="white" />
                            <Text style={styles.t1} onPress={() => navigation.navigate("SavedDocs", { doctype: "All" })}>Docs</Text>
                        </View>
                    </TouchableOpacity>
            }
            {
                pagename == "Settings" ?
                    <TouchableOpacity onPress={() => navigation.navigate("Settings")} >
                        <View style={styles.s2}>
                            <Ionicons name="settings-sharp" size={24} color="white" style={styles.active} />
                            <Text style={styles.t1} onPress={() => navigation.navigate("Settings")}>Settings</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => navigation.navigate("Settings")} >
                        <View style={styles.s2}>
                            <Ionicons name="settings-sharp" size={24} color="white" />
                            <Text style={styles.t1} onPress={() => navigation.navigate("Settings")}>Settings</Text>
                        </View>
                    </TouchableOpacity>
            }
            <View style={styles.s2}>
                <Ionicons name="notifications" size={24} color="white" />
                <Text style={styles.t1}>Inbox</Text>
            </View>
        </View>
    )
}

export default BottomNavbar

const styles = StyleSheet.create({
    s1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#602CB6',
        width: '100%',
        padding: 5,
        alignItems: 'center',
        height: 60,
    },
    s2: {
        alignItems: 'center',
    },
    t1: {
        color: '#A16CE6',
    },
    active: {
        color: 'white',
        backgroundColor: colors.primary,
        borderRadius: 50,
        padding: 10,
        position: 'relative',
        top: -10,
    },
    t1active: {
        color: 'white',
        position: 'relative',
        top: -10,
    }
})