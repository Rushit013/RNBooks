import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const NavigationBar = ({label, canGoBack = true}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {canGoBack && (
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={30} />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{label}</Text>
      </View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    width: '100%',
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -99,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    top: 0,
    left: 0,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
