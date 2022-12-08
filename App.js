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

  const [isLoading, setLoading] = useState(true)

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

  useEffect(() => {
    if (dataArray != null)
      setLoading(false);
  }, [dataArray])
  
  return (
    
    <View style={styles.container}>
        
      <TouchableOpacity style={styles.box}>
          <Text style={styles.realtimevalue}> Nồng độ CO2 hiện tại:  </Text>
          <Text> </Text>
          <Text style={[styles.textsize, styles.realtimevalue]}> {realtimeData.realtimeValue} </Text>
      </TouchableOpacity>

      {/* <Text>
        {dataArray.map((dataArrayI, index) => {        // -> đoạn này in ra cho dễ nhìn thôi
          return <Text key={index}>
            {`${dataArrayI}    `}
          </Text>
        })}
      </Text> */}


      {isLoading === true ? <View><Text>Loading...</Text></View> : <Chart Data={dataArray} />}

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
    backgroundColor: '#009EFF'
  },
  textsize: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  realtimevalue: {
    color: 'white'
  }
});
