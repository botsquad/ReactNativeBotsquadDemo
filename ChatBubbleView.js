import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native'

export default ({ bubble, connectInfo, onPress }) => {
  if (bubble === null) return null

  const [badgeCount, setBadgeCount] = useState(0)

  useEffect(() => {
    // the return statement here ensures that we unsubscribe the badge count when the component is unmounted.
    return bubble.onBadgeCountUpdate.subscribe(count => {
      setBadgeCount(count)
    })
  })

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: connectInfo.bot.profilePicture }} style={styles.profilePicture} />
      {badgeCount > 0 ? <Text style={styles.badgeCount}>{badgeCount}</Text> : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  badgeCount: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 4, paddingBottom: 4,
    paddingLeft: 8, paddingRight: 8,
    position: 'absolute',
    right: -5,
    top: -5,
    borderRadius: 10
  }
})
