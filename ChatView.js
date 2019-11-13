import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import { Dimensions } from "react-native";

export default ({ bubble, connectInfo, onClose }) => {

  const [uri, setUri] = useState(null)
  useEffect(() => {
    console.log(bubble.getWebviewUrl())

    setUri(bubble.getWebviewUrl())
  }, [])

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>

      <WebView style={styles.webview} source={{ uri }} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#999999',
    padding: 10,
    margin: 10
  },
  buttonText: {
    color: 'white'
  },
  webview: {
    flex: 1,
  },
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    alignSelf:'center',
    flex: 1,
  }
})
