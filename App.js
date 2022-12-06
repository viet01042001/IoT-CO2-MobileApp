import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { ref, onValue } from 'firebase/database';
import { db } from './src/firebaseConfig';


export default function App() {

  var data = ""
  var dataKeys = ""
  var dataArray = ""

  const starCountRef = ref(db, 'CO2_quality/');
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
  });
  dataKeys = Object.keys(data);
  dataArray = dataKeys.map(key => [data[key]]);
  
  return (
    
    <View style={styles.container}>
        
      <TouchableOpacity style={styles.box}>
          <Text> Nồng độ CO2 là:  </Text>
      </TouchableOpacity>

      <Text> {dataArray} </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
  },
  box: {
    margin: 2,
    borderWidth: 0.5,
    width: 200,
    padding: 2,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
