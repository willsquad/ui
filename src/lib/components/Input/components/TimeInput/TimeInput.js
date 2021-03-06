import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import './TimeInput.css';
import Modal from '../../../Modal/Modal';
import TimePicker from './components/TimePicker/TimePicker';

class TimeInput extends Component {
  constructor(props) {
    super(props);
    this.id = uuidv4();
    this.state = {
      value: props.value,
      status: {
        isFocused: false,
        isTimePickerVisible: false,
      },
    };

    props.__onInit(props.name, props.value);
  }

  handleFocus = () => {
    this.setState({
      status: {
        ...this.state.status,
        isFocused: true,
      },
    });
  }

  handleBlur = () => {
    this.setState({
      status: {
        ...this.state.status,
        isFocused: false,
      },
    });
  }

  handleInput = (input) => {
    const {
      hour,
      minute,
      second,
      ampm,
    } = input;

    const displayValue = `${hour}:${minute}:${second} ${ampm}`;

    this.setState({
      value: displayValue,
      status: {
        ...this.state.status,
        isTimePickerVisible: false,
      },
    });

    this.props.onChange(this.props.name, input);
    this.props.__onChange(this.props.name, input);
  }

  showTimePicker = () => {
    this.setState({
      status: {
        ...this.state.status,
        isTimePickerVisible: true,
      },
    });
  }

  hideTimePicker = () => {
    this.setState({
      status: {
        ...this.state.status,
        isTimePickerVisible: false,
      },
    });
  }

  render() {
    const {
      label,
      placeholder,
    } = this.props;

    const {
      value,
      status,
    } = this.state;

    return (
      <div
        className="TimeInput"
        data-isfocused={status.isFocused}
        data-isselected={value !== ''}
      >
        <div className="TimeInput__overlay">
          <div className="TimeInput__overlay__color TimeInput__overlay__color--dark" />
          <div className="TimeInput__overlay__color TimeInput__overlay__color--white" />
        </div>

        <label
          htmlFor={this.id}
          className="TimeInput__label"
          onMouseDown={this.showTimePicker}
        >
          { label }
        </label>

        <div
          className="TimeInput__input"
          data-isfocused={status.isFocused}
          onMouseDown={this.showTimePicker}
        >
          <div className="TimeInput__input__icon">
            <div className="icon" />
          </div>
          <div className="TimeInput__input__value">
            { value || placeholder }
          </div>
        </div>

        <div className="TimeInput__selector">
          <Modal
            isVisible={status.isTimePickerVisible}
            onHide={this.hideTimePicker}
          >
            <TimePicker
              value={!value ? new Date() : new Date(value)}
              onChange={this.handleInput}
              onCancel={this.hideTimePicker}
            />
          </Modal>
        </div>
      </div>
    );
  }

}

TimeInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  // value: PropTypes.any,
  onChange: PropTypes.func,
  __onChange: PropTypes.func,
  __onInit: PropTypes.func,
};

TimeInput.defaultProps = {
  name: '',
  label: '',
  placeholder: '',
  // value: '',
  onChange: () => {},
  __onChange: () => {},
  __onInit: () => {},
};

export default TimeInput;
