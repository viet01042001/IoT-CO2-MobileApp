import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { useState, useEffect } from 'react';

import { ref, onValue } from 'firebase/database';
import { db } from './src/firebaseConfig';


export default function App() {

  const [data, setData] = useState({});
  const [dataKeys, setDataKeys] = useState([]);
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, 'CO2_quality/');
    onValue(starCountRef, (snapshot) => {
      setData(snapshot.val());
    });
  }, [])

  useEffect(() => {
    setDataKeys(Object.keys(data));
  }, [data])

  useEffect(() => {
    setDataArray(dataKeys.map(key => [data[key]]));
  }, [dataKeys])
  
  return (
    
    <View style={styles.container}>
        
      <TouchableOpacity style={styles.box}>
          <Text> Nồng độ CO2 là:  </Text>
      </TouchableOpacity>

      <Text>
        {dataArray.map((dataArrayI, index) => {        // -> đoạn này in ra cho dễ nhìn thôi
          return <Text key={index}>
            {`${dataArrayI}    `}
          </Text>
        })}
      </Text>

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
