import React, { useEffect, useState } from 'react'
import { Platform, AsyncStorage } from 'react-native'
import { ChatBubble } from '@botsquad/sdk'

// Build user agent string, and ensures that we use the same user information each time we load the bubble.
async function buildConfig(config) {
  const userToken = await AsyncStorage.getItem('userToken')
  const { name, version } = require('./package')
  const { OS, Version } = Platform
  const userAgent = `${name}/${version} (${OS}; ${Version})`
  return { userAgent, userToken, ...config }
}

//
export default function useChatBubble(config) {
  const [bubble, setBubble] = useState(null)
  const [connectInfo, setConnectInfo] = useState(null)

  useEffect(() => {
    let bubble = null

    const loader = async () => {
      bubble = new ChatBubble(await buildConfig(config))
      const result = await bubble.connect()
      await AsyncStorage.setItem('userToken', result.userToken)

      console.log(`[Chat bubble] Connected to: ${result.bot.title}`)

      setConnectInfo(result)
      setBubble(bubble)
    }
    loader()

    // disconnect the websocket in the effect destructor
    return () => (bubble && bubble.disconnect())
  }, [])

  return [bubble, connectInfo]
}
