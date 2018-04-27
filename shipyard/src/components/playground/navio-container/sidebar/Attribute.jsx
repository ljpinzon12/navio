import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon, Select, Tooltip, Switch } from 'antd';
import { toggleSettingsVisible, changeTypeStatus, changeCheckStatus, updateAttribute } from './../../../../actions';

const Option = Select.Option;
class Attribute extends Component {

  state = {
    checked: this.props.checked,
    settings: this.props.settings,
  }
  render () {
    const { index, attribute, toggleVisible, changeCheckStatus } = this.props;
    return (
      <Row type="flex" align="middle" justify="center">
        <Col span={4}>
          <Button onClick={() => {
              this.setState({settings: !attribute.settings});
              toggleVisible(index, !attribute["settings"]);
            }}
          >
            {
              !attribute.settings ? <Icon type="setting" /> : <Icon type="up" />
            }
          </Button>
        </Col>
        <Col span={6}>{attribute.name}</Col>
        <Col span={7}>
          <Select style={{ width: '100%' }} dropdownMatchSelectWidth={false}>
            <Option key="categorical" value="categorical" >categorical</Option>
            <Option key="sequential" value="sequential">ordinal</Option>
          </Select>
        </Col>
        <Col span={6} offset={1}>
          <Tooltip placement="right" title="Here you can change this dimension visibility">
            <Switch defaultChecked={true} checked={attribute.checked} style={{ marginLeft: '2em' }} onChange={checked => { console.log(checked);this.setState({checked}); changeCheckStatus(attribute, checked);}} />
          </Tooltip>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, param) => ({
  attribute: param.attribute,
  index: param.index,
});

const mapDispatchToProps = dispatch => ({
  toggleVisible: (index, visible) => { dispatch(toggleSettingsVisible(index, visible)); },
  changeTypeStatus: (att, value) => {
    dispatch(changeTypeStatus(att, value)); dispatch(updateAttribute());
  },
  changeCheckStatus: (att, status) => {
    dispatch(changeCheckStatus(att, status));
    dispatch(updateAttribute());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Attribute);
