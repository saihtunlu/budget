import React from 'react';
import {Block} from 'galio-framework';
import {connect} from 'react-redux';

function Divider(props) {
  const {Theme} = props;
  return (
    <Block
      style={[
        props.style,
        {
          borderBottomWidth: 1,
          marginVertical: 10,
          borderBottomColor: Theme.divider,
          width: '100%',
        },
      ]}
    />
  );
}
//Map the redux state to your props.
const mapStateToProps = (state) => ({
  Theme: state.Theme.theme,
});
//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => ({});
//export your list as a default export
export default connect(mapStateToProps, mapDispatchToProps)(Divider);
