import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function HeaderCustom() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logi.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  logo: {
    width: 90,   
    height: 90,
    borderRadius: 12,
  },
});
