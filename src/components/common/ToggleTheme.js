import React, {useState} from 'react';
import {connect} from 'react-redux';
import {toggleTheme} from '../../core/redux/actions/toggleTheme';
import {Switch, StyleSheet} from 'react-native';
function ToggleTheme(props) {
  const {Theme} = props;
  const [dark, setDark] = useState(Theme.mode === 'Dark' ? true : false);
  return (
    <Switch
      thumbColor={'white'}
      style={{marginRight: -10}}
      ios_backgroundColor={`rgb(${Theme.primary})`}
      trackColor={{
        true: `rgb(${Theme.primary})`,
      }}
      value={dark}
      onValueChange={() => {
        setDark(!dark);
        toggleTheme(dark ? 'Light' : 'Dark');
      }}
    />
  );
}
const stateToProps = (state) => ({
  Theme: state.Theme.theme,
});

const dispatchToProps = () => ({});

export default connect(stateToProps, dispatchToProps)(ToggleTheme);

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});
