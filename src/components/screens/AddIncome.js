import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Block, Text} from 'galio-framework';
import {Divider} from '../common';
import {setIncome} from '../../core/redux/actions/income';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import {setBalance} from '../../core/redux/actions/balance';
const {width, height} = Dimensions.get('window');
const paddingTop = 10 + StatusBar.currentHeight;

function AddIncome(props) {
  const {Theme, Incomes, Balance, navigation} = props;
  const [showDate, setShowDate] = useState(false);
  const [Income, setIncome_] = useState({
    id: uuidv4(),
    date: new Date(),
    item: '',
    price: '',
    note: '',
  });

  // Methods
  const onChangeDate = (event, selectedDate) => {
    setShowDate(false);
    const currentDate = selectedDate || Income.date;
    setIncome_({...Income, ...{date: currentDate}});
  };

  const onSave = () => {
    if (Income.price !== '' && Income.item !== '') {
      const data = [...Incomes, Income];
      const newBalance = parseInt(Balance) + parseInt(Income.price);
      setIncome(data);
      setBalance(newBalance);
      navigation.goBack();
    }
  };

  return (
    <Block style={{...styles.container, backgroundColor: Theme.Bg2}}>
      <StatusBar backgroundColor="rgba(0,0,0,0.3)" />
      <Block style={{...styles.modalView}}>
        <Block
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          style={{paddingTop: 10}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Text p bold color={Theme.text1}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => onSave()}>
            <Text p bold color={`rgb(${Theme.primary})`}>
              Save
            </Text>
          </TouchableOpacity>
        </Block>
        <Divider />
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: Theme.input,
            color: Theme.text1,
            height: 45,
            borderRadius: 15,
            paddingHorizontal: 10,
            fontSize: 16,
            marginBottom: 15,
            display: 'flex',
            justifyContent: 'center',
          }}
          onPress={() => setShowDate(!showDate)}>
          <Text color={Theme.text1}>
            {moment(Income.date).format('MMMM Do YYYY')}
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Item"
          placeholderTextColor={Theme.text1}
          style={{
            backgroundColor: Theme.input,
            color: Theme.text1,
            height: 45,
            borderRadius: 15,
            paddingHorizontal: 10,
            marginBottom: 15,
            fontSize: 16,
          }}
          autoFocus
          value={Income.item}
          onChangeText={(value) =>
            setIncome_({
              ...Income,
              ...{item: value},
            })
          }
        />

        <TextInput
          placeholder="Price"
          placeholderTextColor={Theme.text1}
          style={{
            backgroundColor: Theme.input,
            color: Theme.text1,
            height: 45,
            borderRadius: 15,
            paddingHorizontal: 10,
            fontSize: 16,
            marginBottom: 15,
          }}
          value={Income.price}
          keyboardType="numeric"
          onChangeText={(value) =>
            setIncome_({
              ...Income,
              ...{price: value},
            })
          }
        />

        <TextInput
          placeholder="Note"
          placeholderTextColor={Theme.text1}
          style={{
            backgroundColor: Theme.input,
            color: Theme.text1,
            height: 45,
            borderRadius: 15,
            paddingHorizontal: 10,
            fontSize: 16,
            marginBottom: 15,
          }}
          value={Income.note}
          onChangeText={(value) =>
            setIncome_({
              ...Income,
              ...{note: value},
            })
          }
        />
      </Block>

      {showDate && (
        <DateTimePicker
          value={new Date(Income.date)}
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
  Incomes: state.income,
  Balance: state.balance,
});
//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => ({});
//export your list as a default export
export default connect(mapStateToProps, mapDispatchToProps)(AddIncome);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop,
  },
  modalView: {
    width,
    paddingHorizontal: 15,
  },
});
