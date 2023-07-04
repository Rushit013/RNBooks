import React, {Component} from 'react';
import {
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import {get} from 'lodash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationBar, Comment} from '../../components';
import FastImage from 'react-native-fast-image';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booksHolder: null,
      refreshing: false,
    };
  }

  render() {
    const {book} = this.props.route.params;
    return (
      <View style={styles.rootView}>
        <NavigationBar label={'자유톡'} />

        <ScrollView style={styles.bodyView}>
          <View style={styles.coverContainer}>
            <FastImage
              style={styles.coverImage}
              source={{
                uri: get(book, 'cover', null),
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.bookTitle}>{get(book, 'title', '')}</Text>
            <Text style={styles.bookDescription}>
              {get(book, 'description', '')}
            </Text>
            <View style={styles.pricingContainer}>
              <Text style={styles.discountLabel}>
                {get(book, 'discount', null)}%
              </Text>
              <Text style={styles.pricingLabel}>
                {get(book, 'price', null)}원
              </Text>
            </View>
          </View>

          <View style={styles.separatorLine}></View>

          <Comment />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  bodyView: {
    flex: 1,
    width: '100%',
  },
  coverContainer: {
    height: hp('45%'),
    width: '100%',
    backgroundColor: '#EDEEF3',
  },
  coverImage: {
    flex: 1,
    // aspectRatio: 16 / 9,
  },
  descriptionContainer: {
    flex: 1,
    padding: 12,
    // backgroundColor: '#f0f',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  bookDescription: {
    fontSize: 15,
    marginVertical: 8,
    lineHeight: 20,
  },
  pricingContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  discountLabel: {
    flex: 1,
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  pricingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  separatorLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#F7F8FA',
  },
});
