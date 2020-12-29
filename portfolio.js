import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';

LogBox.ignoreAllLogs();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, padding:15}}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
      <Text style={styles.textHeader}>Whre do you want to navigate?</Text>
      
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btnNavigation}>
        <Ionicons name="md-home" size={29} color='white'/>
        <Text style={{color:'white', marginTop:8, marginLeft:8}}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('Portfolio')} style={styles.btnNavigation}>
        <Ionicons name="ios-list" size={29} color='white'/>
        <Text style={{color:'white', marginTop:8, marginLeft:8}}>Portfolio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('About')} style={styles.btnNavigation}>
        <Ionicons name="ios-information-circle" size={29} color='white'/>
        <Text style={{color:'white', marginTop:8, marginLeft:8}}>About</Text>
      </TouchableOpacity>



      </ScrollView>

    </View>
  );
}


function AboutScreen({navigation}) {

  const openModalContact = () =>{
    
  }

  let widthWindow = Dimensions.get('window').width -30 -40;
  return (
    <View style={{flex: 1, padding:15}}>
      
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>About</Text>

        <Image style={{width:widthWindow, height:widthWindow, marginTop:20}} source={{uri:'https://media-exp1.licdn.com/dms/image/C4E03AQFJls9L1wofcg/profile-displayphoto-shrink_200_200/0/1577259305374?e=1614211200&v=beta&t=r1qIQ19CClUhcwr5c9Lc9Cuy6vlwKIWpGOwLVyOr7Ec'}}></Image>
        <View>
          <Text style={{fontSize:20, marginTop:10}}>Raphael Lacet | Computer Engineer</Text>
          <Text style={{fontSize:15, marginTop:10}}>EDUCATION:{"\n"}▶ Colegio Motivo, Recife, PE, Brazil{"\n"}     High School Diploma, December 2013{"\n"}
        ▶ MCC Mesa Community College, Mesa, AZ, {"\n"}     US{"\n"}     ESL English as Second Language, July 2015{"\n"}
        ▶ Valencia College, Orlando, FL, US{"\n"}     Computer Engineering A.A.{"\n"}
        ▶ University of Central Florida, Orlando, FL, US{"\n"}     Computer Engineering Bachelor 2022</Text>
        
        <TouchableOpacity onPress={()=>openModalContact()} style={{...styles.btnNavigation,justifyContent:'center'}}><Text style={{color:'white',fontSize:17}}>Contact Me!</Text></TouchableOpacity>

        </View>
     

      </ScrollView>

                
    </View>
  );
} /*parei em 3:39*/


function PortfolioScreen({navigation,route}) {

  const [images, setImages] = useState([
    {
      img: require('./resources/img3.jpg'),
      width:0,
      height:0,
      ratio:0,
      website:'https://github.com/raphaellacet?tab=repositories'
    },
    {
      img: require('./resources/img4.jpg'),
      width:0,
      height:0,
      ratio:0,
      website:'https://www.linkedin.com/in/raphael-lacet-7147a5131'
    }
  ])

  const [windowWidth,setWindowWidth] = useState(0); // fix screen size on any device

  useEffect(() => { // load functions once when app is opened

    let windowWidthN = Dimensions.get('window').width;

    setWindowWidth(windowWidthN - 30 - 40); // fit screen size after double padding from 15*2 and 20*2 contentContainerStyle

    let newImages = images.filter(function(val){ // search images and calculate their sizes
      let w = Image.resolveAssetSource(val.img).width;
      let h = Image.resolveAssetSource(val.img).height;

      val.width = w;
      val.height = h;

      val.ratio = h/w

      return val; // return array

    }) 

    setImages(newImages);

  }, [])

  const openNavigator = async (website) =>{
    let result = await WebBrowser.openBrowserAsync(website);
  }

  return (
    <View style={{flex: 1, padding:15}}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>My Previous Projects!</Text>

        {
          images.map(function(val){
              return(
                <View syle={styles.parentImage}>
                  <Image style={{width:windowWidth, height:windowWidth*val.ratio, resizeMode:'stretch'}} source={val.img}/>

                  <TouchableOpacity onPress={()=>openNavigator(val.website)} style={styles.btnOpenNavigator}><Text style={{textAlign:'center', color:'white', fontSize:18}}>Open on Navigator!</Text></TouchableOpacity>

                </View>
              )
          })
        }

      </ScrollView>

    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function portfolio() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name == 'Portfolio') {
              iconName = focused ? 'ios-list' : 'ios-list';
            } else if (route.name == 'About') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#151E3D',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default portfolio;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white'
  },
  textHeader:{
    color:'#151E3D',
    fontSize:24
  },
  btnNavigation:{
    backgroundColor:'#151E3D',
    padding:20,
    marginTop:15,
    flexDirection:'row'
  },
  parentImage:{
    marginTop:30
  },
  btnOpenNavigator:{
    padding:10,
    backgroundColor:'#151E3D',
  }
})