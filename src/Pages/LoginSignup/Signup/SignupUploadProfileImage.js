import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PickImage from './PickImage'

const SignupUploadProfileImage = () => {
  return (
    <View style={styles.container}>
      <PickImage/>
    </View>
  )
}

export default SignupUploadProfileImage

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
}
})