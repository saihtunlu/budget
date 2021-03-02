import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Block, Text} from 'galio-framework';
import {connect} from 'react-redux';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import MonthPicker from 'react-native-month-year-picker';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {
  getMonthExpense,
  getMonthIncome,
  isLoading,
  isNewUser,
} from '../../core/redux/getters';
import {setBalance} from '../../core/redux/actions/balance';

const paddingTop = 10 + StatusBar.currentHeight;
const {width, height} = Dimensions.get('window');
function Home(props) {
  const {
    Theme,
    navigation,
    Balance,
    IsNewUser,
    MonthExpense,
    MonthIncome,
  } = props;

  const [activeSlide, setActiveSlide] = useState(0);
  const [newBalance, setNewBalance] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [incomeDate, setIncomeDate] = useState(new Date());

  const [showIncomeDate, setShowIncomeDate] = useState(false);
  const [showExpenseDate, setShowExpenseDate] = useState(false);

  const data = [
    {
      title: (
        <Text p color={`#fff`}>
          Main balance
        </Text>
      ),
      price: Balance,
    },
    {
      title: (
        <Block flexDirection={'row'} alignItems={'center'}>
          <Text p color={`#fff`}>
            Total expenses on{' '}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowExpenseDate(!showExpenseDate)}>
            <Text p color={`#fff`} style={{textDecorationLine: 'underline'}}>
              {moment(expenseDate).format('MMMM, YYYY')}
            </Text>
          </TouchableOpacity>
        </Block>
      ),
      price: MonthExpense(expenseDate),
    },
    {
      title: (
        <Block flexDirection={'row'} alignItems={'center'}>
          <Text p color={`#fff`}>
            Total incomes on{' '}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowIncomeDate(!showIncomeDate)}>
            <Text p color={`#fff`} style={{textDecorationLine: 'underline'}}>
              {moment(incomeDate).format('MMMM, YYYY')}
            </Text>
          </TouchableOpacity>
        </Block>
      ),
      price: MonthIncome(incomeDate),
    },
  ];
  const menu = [
    {
      name: 'Expense',
      icon: 'arrow-up-circle',
      color: Theme.primary,
      route: 'Expense',
    },
    {
      name: 'Income',
      icon: 'arrow-down-circle',
      color: Theme.primary,
      route: 'Income',
    },
    {
      name: 'Setting',
      icon: 'settings',
      color: Theme.primary,
      route: 'Setting',
    },
  ];
  const carouselRef = useRef(null);

  const onChangeIncomeDate = (event, selectedDate) => {
    setShowIncomeDate(false);
    const currentDate = selectedDate || incomeDate;
    setIncomeDate(currentDate);
  };
  const onChangeExpenseDate = (event, selectedDate) => {
    setShowExpenseDate(false);
    const currentDate = selectedDate || expenseDate;
    setExpenseDate(currentDate);
  };

  const renderItem = ({item, index}) => {
    return (
      <Block flex justifyContent={'center'} alignItems={'center'}>
        {item.title}
        <Text h1 bold color={`#fff`} style={{marginTop: 20}}>
          {item.price} <Text p>MMK</Text>
        </Text>
      </Block>
    );
  };

  if (IsNewUser) {
    return (
      <Block
        bounces={false}
        alwaysBounceVertical={false}
        style={{...styles.container, backgroundColor: Theme.Bg3}}
        showsVerticalScrollIndicator={false}>
        <StatusBar translucent backgroundColor="transparent" />
        {/* banner */}
        <LinearGradient
          colors={[`#36d1dc`, `#5b86e5`]}
          style={{
            ...styles.banner,
            height: height / 1.4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* Header */}

          <Text h3 bold color="white">
            Welcome to BUDGET
          </Text>

          <Text
            p
            color="white"
            style={{marginTop: 15, textAlign: 'center', marginBottom: 30}}>
            Before start using app, please fill your current balance first.
          </Text>

          <TextInput
            placeholder="Enter your balance"
            placeholderTextColor={`rgba(0,0,0,0.2)`}
            style={{
              backgroundColor: '#fff',
              color: `rgba(0,0,0,0.7)`,
              height: 50,
              borderRadius: 15,
              width: width / 1.5,
              paddingHorizontal: 15,
              fontSize: 25,
              marginBottom: 15,
            }}
            value={newBalance}
            keyboardType="numeric"
            onChangeText={(value) => setNewBalance(value)}
          />
        </LinearGradient>
        <Block
          style={{
            backgroundColor: `rgb(${Theme.primary})`,
            ...styles.balanceHelper,
            marginBottom: -60,
          }}>
          <Block
            style={{
              backgroundColor: Theme.Bg3,
              ...styles.balanceHelper2,
            }}></Block>
        </Block>

        {/* end of banner */}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: `rgb(${Theme.primary})`,
            borderRadius: 30,
            width: width - 60,
            marginHorizontal: 30,
            padding: 15,
          }}
          onPress={() => {
            setBalance(newBalance);
          }}>
          <Text
            p
            bold
            style={{
              textAlign: 'center',
              color: '#fff',
            }}>
            Getting Start
          </Text>
        </TouchableOpacity>
      </Block>
    );
  }
  return (
    <ScrollView
      bounces={false}
      alwaysBounceVertical={false}
      style={{...styles.container, backgroundColor: Theme.Bg3}}
      showsVerticalScrollIndicator={false}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* banner */}
      <LinearGradient colors={[`#36d1dc`, `#5b86e5`]} style={styles.banner}>
        {/* Header */}
        <Block
          flex
          justifyContent={'space-between'}
          flexDirection={'row'}
          alignItems={'center'}>
          <Text h5 bold color="white">
            Budget
          </Text>

          {/* <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <Feather name={'more-vertical'} size={22} style={{color: '#fff'}} />
          </TouchableOpacity> */}
        </Block>

        {/* Balance */}
        <Carousel
          ref={carouselRef}
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          containerCustomStyle={{...styles.carousel}}
          inactiveSlideScale={0}
          inactiveSlideOpacity={0}
          layout={'default'}
          layoutCardOffset={0}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={{marginTop: -50}}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <Block
          flex
          justifyContent={'space-between'}
          flexDirection={'row'}
          style={styles.carouselBtnBox}
          alignItems={'center'}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.carouselBtnBorder}
            onPress={() => carouselRef.current.snapToPrev()}>
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
            onPress={() => carouselRef.current.snapToNext()}>
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
      <Block
        style={{
          backgroundColor: `rgb(${Theme.primary})`,
          ...styles.balanceHelper,
        }}>
        <Block
          style={{
            backgroundColor: Theme.Bg3,
            ...styles.balanceHelper2,
          }}></Block>
      </Block>

      {/* end of banner */}

      {menu.map((item, index) => (
        <TouchableOpacity
          key={`menu${index}`}
          activeOpacity={0.7}
          style={{...styles.box, backgroundColor: Theme.Bg2}}
          onPress={() => navigation.navigate(item.route)}>
          <Block flex flexDirection={'row'} alignItems={'center'}>
            <Block
              style={{
                backgroundColor: `rgba(${item.color},0.15)`,
                ...styles.icon,
              }}>
              <Feather
                name={item.icon}
                size={22}
                style={{
                  color: `rgb(${item.color})`,
                }}
              />
            </Block>

            <Text
              p
              style={{
                color: Theme.text1,
              }}>
              {item.name}
            </Text>
          </Block>
          <Feather
            name={'chevron-right'}
            size={22}
            style={{color: Theme.text2}}
          />
        </TouchableOpacity>
      ))}

      {/* renders */}
      {showIncomeDate && (
        <MonthPicker
          onChange={onChangeIncomeDate}
          value={new Date(incomeDate)}
        />
      )}
      {showExpenseDate && (
        <MonthPicker
          onChange={onChangeExpenseDate}
          value={new Date(expenseDate)}
        />
      )}
    </ScrollView>
  );
}

//Map the redux state to your props.
const mapStateToProps = (state) => ({
  Theme: state.Theme.theme,
  Income: state.income,
  Expense: state.expense,
  Balance: state.balance,
  MonthIncome: (month) => getMonthIncome(state.income, month),
  MonthExpense: (month) => getMonthExpense(state.expense, month),
  IsLoading: isLoading(state),
  IsNewUser: isNewUser(state),
});
//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => ({});
//export your list as a default export
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    paddingHorizontal: 15,
    paddingTop,
    borderBottomRightRadius: 35,
  },
  balanceHelper: {
    height: 100,
    marginBottom: -80,
    width,
  },
  balanceHelper2: {
    height: 100,
    borderTopLeftRadius: 35,
    width,
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
  balance: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    width: width - 30,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 15,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    width: width - 30,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  icon: {
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  carousel: {
    marginBottom: 20,
    width: width,
    marginLeft: -15,
    height: 200,
  },
});
