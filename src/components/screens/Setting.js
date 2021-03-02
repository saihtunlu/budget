import React from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Block, Text} from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import {ToggleTheme} from '../common';
const {width} = Dimensions.get('window');
const paddingTop = 10 + StatusBar.currentHeight;

function Setting(props) {
  const {Theme, navigation} = props;

  return (
    <Block style={{...styles.container, backgroundColor: Theme.Bg3}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Block style={styles.header}>
        {/* animated header */}
        <LinearGradient colors={[`#36d1dc`, `#5b86e5`]} style={styles.banner}>
          {/* Header */}
          <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            activeOpacity={0.7}
            onPress={() => navigation.push('Home')}>
            <Feather name={'chevron-left'} size={22} style={{color: '#fff'}} />
            <Text h5 bold color="white">
              Settings
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </Block>
      <ScrollView
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 15, paddingTop: 15}}>
        {/* end of banner */}

        <Block style={{...styles.box, backgroundColor: Theme.Bg2}}>
          <Block flex flexDirection={'row'} alignItems={'center'}>
            <Block
              style={{
                backgroundColor: `rgba(${Theme.primary},0.15)`,
                ...styles.icon,
              }}>
              <Feather
                name={'moon'}
                size={22}
                style={{
                  color: `rgb(${Theme.primary})`,
                }}
              />
            </Block>

            <Text
              p
              style={{
                color: Theme.text1,
              }}>
              Dark mode
            </Text>
          </Block>
          <ToggleTheme />
        </Block>
      </ScrollView>
    </Block>
  );
}

//Map the redux state to your props.
const mapStateToProps = (state) => ({
  Theme: state.Theme.theme,
});
//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => ({});
//export your list as a default export
export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    paddingHorizontal: 15,
    width,
    paddingTop,
    paddingBottom: 10,
  },
  balanceBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 30,
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
});
