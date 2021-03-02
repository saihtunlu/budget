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
import {setExpense} from '../../core/redux/actions/expense';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
const paddingTop = 10 + StatusBar.currentHeight;

function EditExpense(props) {
  const {Theme, Expenses, navigation} = props;
  const [showDate, setShowDate] = useState(false);
  const {expense} = props.route.params;
  const [selectedExpense, setSelectedExpense] = useState(expense);

  // Methods
  const onChangeDate = (event, selectedDate) => {
    setShowDate(false);
    const currentDate = selectedDate || selectedExpense.date;
    setSelectedExpense({...selectedExpense, ...{date: currentDate}});
  };

  const onSave = () => {
    const index = Expenses.findIndex(
      (expenseData) => expenseData.id === selectedExpense.id,
    );
    Expenses[index] = selectedExpense;
    setExpense(Expenses);
    navigation.goBack();
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
            {moment(selectedExpense.date).format('MMMM Do YYYY')}
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Item"
          placeholderTextColor={`rgba(0,0,0,0.75)`}
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
          value={selectedExpense.item}
          onChangeText={(value) =>
            setSelectedExpense({
              ...selectedExpense,
              ...{item: value},
            })
          }
        />

        <TextInput
          placeholder="Price"
          placeholderTextColor={`rgba(0,0,0,0.75)`}
          style={{
            backgroundColor: Theme.input,
            color: Theme.text1,
            height: 45,
            borderRadius: 15,
            paddingHorizontal: 10,
            fontSize: 16,
            marginBottom: 15,
          }}
          value={selectedExpense.price}
          keyboardType="numeric"
          onChangeText={(value) =>
            setSelectedExpense({
              ...selectedExpense,
              ...{price: value},
            })
          }
        />

        <TextInput
          placeholder="Note"
          placeholderTextColor={`rgba(0,0,0,0.75)`}
          style={{
            backgroundColor: Theme.input,
            color: Theme.text1,
            height: 45,
            borderRadius: 15,
            paddingHorizontal: 10,
            fontSize: 16,
            marginBottom: 15,
          }}
          value={selectedExpense.note}
          onChangeText={(value) =>
            setSelectedExpense({
              ...selectedExpense,
              ...{note: value},
            })
          }
        />
      </Block>

      {showDate && (
        <DateTimePicker
          value={new Date(selectedExpense.date)}
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
  Expenses: state.expense,
});
//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => ({});
//export your list as a default export
export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);

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
