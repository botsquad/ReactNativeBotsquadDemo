import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar,} from 'react-native';

import useChatBubble from './useChatBubble'
import ChatView from './ChatView'
import ChatBubbleView from './ChatBubbleView'

const CONFIG = {
  botId: 'e222b5b3-9d36-4de6-bfc8-ebb93292521d',
  hostname: 'staging.bsqd.me'
}

const App: () => React$Node = () => {
  const [bubble, connectInfo] = useChatBubble(CONFIG)
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>

          {chatOpen
          ? <ChatView bubble={bubble} connectInfo={connectInfo} onClose={() => setChatOpen(false)} />
          : <ChatBubbleView bubble={bubble} connectInfo={connectInfo} onPress={() => setChatOpen(true)} />}

        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;
