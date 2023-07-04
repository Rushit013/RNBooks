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
} from 'react-native';
import BookService from '../../services/BookService';
import {get} from 'lodash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationBar} from '../../components';
import FastImage from 'react-native-fast-image';

export default class ListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booksHolder: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getBookList(1);
  }

  getBookList = async page => {
    if (page <= get(this, 'state.booksHolder.pages', 1)) {
      const result = await BookService.fetchBookList(page || 1);

      if (get(result, 'data.success', false)) {
        const previousBook = get(this, 'state.booksHolder.book', []);
        const resultData = get(result, 'data.data', null);
        const bookData = get(resultData, 'book', []);
        const current = get(resultData, 'current', []);
        const pages = get(resultData, 'pages', []);
        const perPage = get(resultData, 'perPage', []);

        const isFromBeginning = (page || 1) === 1;

        this.setState({
          booksHolder: {
            book: isFromBeginning ? bookData : [...previousBook, ...bookData],
            current,
            pages,
            perPage,
          },
          refreshing: false,
          isFiniteLoading: false,
        });
      }
    }
  };

  loadMore = () => {
    const nextPage = parseInt(get(this, 'state.booksHolder.current')) + 1;
    if (nextPage <= get(this, 'state.booksHolder.pages')) {
      this.setState({isFiniteLoading: true});
      this.getBookList(nextPage);
    }
  };

  renderFooter = () => {
    const {isFiniteLoading} = this.state;
    if (
      parseInt(get(this, 'state.booksHolder.current')) ===
        get(this, 'state.booksHolder.pages') &&
      !isFiniteLoading
    )
      return null;
    // if (!this.props.loadingstat) return null;

    return (
      <ActivityIndicator
        animating
        size="large"
        style={{marginTop: 15, marginBottom: 15}}
      />
    );
  };

  dataRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getBookList(1);
      },
    );
  };

  renderBookList = (item, index) => {
    const onDetails = () => {
      this.props.navigation.navigate('DetailsScreen', {book: item});
    };

    return (
      <TouchableOpacity
        style={[
          styles.cellContainer,
          {marginRight: index % 2 === 0 ? wp('0.5%') : 0},
        ]}
        onPress={() => onDetails()}>
        {/* <Image
          source={{uri: get(item, 'cover', null)}}
          style={styles.coverImage}
        /> */}
        <FastImage
          style={styles.coverImage}
          source={{
            uri: get(item, 'cover', null),
            priority: FastImage.priority.high,
          }}
          // resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.cellDetailsContainer}>
          <Text style={styles.bookLabel} numberOfLines={1}>
            {get(item, 'title', null)}
          </Text>
          <View style={styles.pricingContainer}>
            <Text style={styles.discountLabel}>
              {get(item, 'discount', null)}%
            </Text>
            <Text style={styles.pricingLabel}>
              {get(item, 'price', null)}원
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {booksHolder, refreshing} = this.state;
    return (
      <View style={styles.rootView}>
        <NavigationBar label={'자유톡'} canGoBack={false} />

        <FlatList
          data={get(this, 'state.booksHolder.book', [])}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => this.renderBookList(item, index)}
          ListFooterComponent={() => this.renderFooter()}
          onRefresh={() => this.dataRefresh()}
          refreshing={refreshing}
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.2}
        />
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
  listContainer: {
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  cellContainer: {
    width: '49.8%',
    // height: hp('30%'),
    // marginHorizontal: wp('0.2%'),
  },
  coverImage: {
    height: hp('25%'),
    width: '100%',
  },
  cellDetailsContainer: {
    flex: 1,
    padding: 8,
  },
  bookLabel: {
    fontSize: 18,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 25,
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
});
