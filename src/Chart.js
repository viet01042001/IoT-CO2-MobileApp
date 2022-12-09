import {LineChart} from 'react-native-chart-kit'
import { View, Text, Dimensions } from 'react-native';


export default function Chart({Data}) {

  return(

    Data.length !== 0 ? <View>

    <LineChart
      data={{
        datasets: [
          {
            data: Data
          }
        ]
      }}
      width={Dimensions.get("window").width * 0.9} // from react-native
      height={300}
      yAxisLabel=""
      yAxisSuffix=""
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 1, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "2",
          strokeWidth: "1",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 15
      }}
    />
    
  </View> : <></>
  )
}