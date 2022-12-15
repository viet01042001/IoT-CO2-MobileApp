import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, Dimensions } from 'react-native';

import { useState, useEffect } from 'react';

import { ref, onValue } from 'firebase/database';
import { db } from './src/firebaseConfig';

import Chart from './src/Chart';

export default function App() {

  const [realtimeData, setRealtimeData] = useState({})
  useEffect(() => {
    const starCountRef2 = ref(db, 'CO2_RealtimeValue');
    onValue(starCountRef2, (snapshot) => {
      setRealtimeData(snapshot.val());
    });
  }, [])

  const [valueColor, setValueColor] = useState('#009EFF')
  useEffect(() => {
    const color = (realtimeData.realtimeValue >= 400) ? 'red' : '#009EFF';
    setValueColor(color);
  }, [realtimeData])

  const [data, setData] = useState([]);
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
    setDataArray(dataKeys.map(key => data[key]));
  }, [dataKeys])
  
  return (
    
    <View style={styles.container}>
        
      <TouchableOpacity style={[styles.box, {backgroundColor: valueColor}]}>
          <Text style={styles.realtimevalue}> Nồng độ CO2 hiện tại: </Text>
          <Text style={{color: 'yellow'}}> {valueColor === 'red' ? '!! Alert !!' : ''} </Text>
          <Text style={[styles.textsize, styles.realtimevalue]}>{Math.round(realtimeData.realtimeValue)}</Text>
      </TouchableOpacity>

      <Chart Data={dataArray} />

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
    width: Dimensions.get('window').width * 0.9,
    padding: 2,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textsize: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  realtimevalue: {
    color: 'white'
  }
});
