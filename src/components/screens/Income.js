import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Block, Text} from 'galio-framework';
import Animated from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {getIncome, getTotalIncomeByDate} from '../../core/redux/getters';
const {width, height} = Dimensions.get('window');
const paddingTop = 10 + StatusBar.currentHeight;
var scrollY = new Animated.Value(0);
const bannerHeight = 230;

function Income(props) {
  const {Incomes, TotalIncome, Theme, navigation} = props;
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const bannerAnimated = Animated.interpolate(scrollY, {
    inputRange: [0, bannerHeight + bannerHeight / 2],
    outputRange: [bannerHeight, 15],
    extrapolate: 'clamp',
  });

  const borderRadius = Animated.interpolate(scrollY, {
    inputRange: [0, 35],
    outputRange: [35, 0],
  });

  const fade = Animated.interpolate(scrollY, {
    inputRange: [0, bannerHeight + bannerHeight / 2],
    outputRange: [1, 0],
  });
  const _scrollView = useRef(null);
  useEffect(() => {
    getData();
    navigation.addListener('focus', () => {
      if (_scrollView) {
        _scrollView.current.scrollTo({x: 0, y: 0, animated: false});
      }
      getData();
    });
  }, []);

  // Methods
  const onChangeDate = (event, selectedDate) => {
    setShowDate(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    getData(currentDate);
  };

  const getData = (date_) => {
    if (!date_) {
      date_ = date;
    }
    setIncomes(Incomes(date_));
    setTotalIncome(TotalIncome(date_));
  };
  const editItem = (item, index) => {
    item.price = item.price.toString();
    navigation.push('EditIncome', {
      Income: item,
      index: index,
    });
  };

  const prevDateIncome = () => {
    const lastDay = moment(date).subtract(1, 'days');
    setDate(lastDay);
    getData(lastDay);
  };

  const nextDateIncome = () => {
    const nextDay = moment(date).add(1, 'days');
    setDate(nextDay);
    getData(nextDay);
  };
  // renders

  return (
    <Block style={{...styles.container, backgroundColor: Theme.Bg3}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Block style={styles.header}>
        {/* animated header */}
        <Animated.View
          style={{
            ...styles.animatedHeader,
            borderBottomRightRadius: borderRadius,
          }}>
          {/* banner */}
          <LinearGradient colors={[`#36d1dc`, `#5b86e5`]} style={styles.banner}>
            {/* Header */}
            <Block
              justifyContent={'space-between'}
              flexDirection={'row'}
              alignItems={'center'}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                activeOpacity={0.7}
                onPress={() => navigation.push('Home')}>
                <Feather
                  name={'chevron-left'}
                  size={22}
                  style={{color: '#fff'}}
                />
                <Text h5 bold color="white">
                  Incomes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{marginRight: 10}}
                onPress={() => navigation.push('AddIncome')}>
                <Feather
                  name={'plus-circle'}
                  size={22}
                  style={{color: '#fff'}}
                />
              </TouchableOpacity>
            </Block>

            {/* Balance */}
            <Animated.View
              style={{
                ...styles.balanceBox,
                height: bannerAnimated,
                opacity: fade,
              }}>
              <Block flexDirection={'row'} alignItems={'center'}>
                <Text p color={`#fff`}>
                  Incomes on{' '}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowDate(!showDate)}>
                  <Text
                    p
                    color={`#fff`}
                    style={{textDecorationLine: 'underline'}}>
                    {moment(date).format('MMMM Do YYYY')}
                  </Text>
                </TouchableOpacity>
              </Block>

              <Text h1 bold color={`#fff`} style={{marginTop: 20}}>
                {totalIncome} <Text p>MMK</Text>
              </Text>
            </Animated.View>

            <Block
              flex
              justifyContent={'space-between'}
              flexDirection={'row'}
              style={styles.carouselBtnBox}
              alignItems={'center'}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.carouselBtnBorder}
                onPress={() => prevDateIncome()}>
                <Block style={styles.carouselBtn}>
                  <Feather
                    name={'chevron-left'}
                    size={25}
                    style={{color: '#fff'}}
                  />
                </Block>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.carouselBtnBorder}
                onPress={() => nextDateIncome()}>
                <Block style={styles.carouselBtn}>
                  <Feather
                    name={'chevron-right'}
                    size={25}
                    style={{color: '#fff'}}
                  />
                </Block>
              </TouchableOpacity>
            </Block>
          </LinearGradient>
        </Animated.View>

        <Block
          style={{
            backgroundColor: `rgb(${Theme.primary})`,
            ...styles.balanceHelper,
          }}>
          <Animated.View
            style={{
              ...styles.balanceHelper2,
              backgroundColor: Theme.Bg3,
              borderTopLeftRadius: borderRadius,
            }}></Animated.View>
        </Block>
      </Block>
      <ScrollView
        bounces={false}
        ref={_scrollView}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 15}}
        onScroll={({nativeEvent}) => {
          scrollY.setValue(nativeEvent.contentOffset.y);
        }}>
        {/* end of banner */}

        <Text
          h5
          bold
          color={Theme.text1}
          style={{
            marginLeft: 10,
            marginTop: 280 + paddingTop,
            marginBottom: 15,
          }}>
          Items
        </Text>
        {incomes.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => editItem(item, index)}
            key={`item` + index}
            style={{...styles.box, backgroundColor: Theme.Bg2}}>
            <Block flex flexDirection={'row'} alignItems={'center'}>
              <Block
                style={{
                  backgroundColor: `rgba(${Theme.primary},0.15)`,
                  ...styles.icon,
                }}>
                <Feather
                  name={'dollar-sign'}
                  size={25}
                  style={{
                    color: `rgb(${Theme.primary})`,
                  }}
                />
              </Block>

              <Block>
                <Text
                  p
                  style={{
                    color: Theme.text1,
                  }}>
                  {item.item}
                </Text>
                <Text
                  style={{
                    color: Theme.text2,
                  }}>
                  {item.price} MMK
                </Text>
              </Block>
            </Block>
          </TouchableOpacity>
        ))}
        <Block style={{height: 15}}></Block>
      </ScrollView>
      {/* renders */}
      {showDate && (
        <DateTimePicker
          value={new Date(date)}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </Block>
  );
}

//Map the redux state to your props.
const mapStateToProps = (state) => ({
  Theme: state.Theme.theme,
  Incomes: (date) => getIncome(state.income, date),
  TotalIncome: (date) => getTotalIncomeByDate(state.income, date),
});
//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => ({});
//export your list as a default export
export default connect(mapStateToProps, mapDispatchToProps)(Income);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  carouselBtnBox: {
    position: 'absolute',
    width: width - 30,
    left: 15,
    right: 15,
    top: paddingTop + 120,
  },
  carouselBtnBorder: {
    padding: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderRadius: 100,
  },
  carouselBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 5,
    borderRadius: 100,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  banner: {
    paddingHorizontal: 15,
    width,
    paddingTop,
  },
  balanceBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceHelper: {
    height: 100,
    marginBottom: -100,
    width,
  },
  balanceHelper2: {
    backgroundColor: '#F7F7F7',
    height: 100,
    width,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 30,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  icon: {
    padding: 15,
    borderRadius: 8,
    marginRight: 5,
  },
  animatedHeader: {
    borderBottomRightRadius: 35,
    overflow: 'hidden',
    width: width,
    zIndex: 10,
  },
});
