import React from 'react';
import TextInput from './TextInput';
import DropdownSelect from './DropdownSelect';
import Multiselect from './Multiselect';
import Checkbox from './Checkbox';
import Button from './Button';
import FormError from "./FormError";
import axios from 'axios';


const typeOptions = [
  {key: 'Multiselect', text: 'Multiselect', value: 'Multiselect'},
  {key: 'Single select', text: 'Single select', value: 'Single select'}
];

const choices = [
  {key: 'Asia', text: 'Asia', value: 'Asia'},
  {key: 'Australia', text: 'Australia', value: 'Australia'},
  {key: 'Europe', text: 'Europe', value: 'Europe'},
  {key: 'Americas', text: 'Americas', value: 'Americas'},
  {key: 'Africa', text: 'Africa', value: 'Africa'}
  // { key: 'Africa', text: 'Africa', value: 'Africa' }
];

const orderOptions = [
  {key: 'alphabetical', text: 'Alphabetical', value: 'alphabetical'},
  {key: 'random', text: 'Random', value: 'random'}
];

class FieldBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      type: '',
      defaultValue: '',
      choices: [],
      order: '',
      checked: false,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange = (name) => (e, {value}) => {
    this.setState({[name]: value});
    console.log(this.state);
  };

  handleCheck = () => {
    this.setState({checked: !this.state.checked});
    console.log('checked?', this.state.checked)
  };

  addDefaultValue = () => {
    let defaultValue = "";
    if (this.state.defaultValue !== "") {
      defaultValue = this.state.defaultValue.toLowerCase().split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
      let newItem = {key: defaultValue, text: defaultValue, value: defaultValue};
      const index = choices.findIndex(item => item.value === defaultValue);
      if (index === -1) {
        choices.push(newItem);
        this.setState({
          choices: [...this.state.choices, newItem]
        });
        console.log("this.state.choices", this.state.choices);
      } else {
        console.log("default value already exists in choices");
      }
    } else {
      console.log("default value is empty");
    }
  }

  resetForm = () => {
    this.setState({
      label: '',
      type: '',
      defaultValue: '',
      choices: [],
      order: '',
      checked: false,
      errors: {}
    })
  };

  checkForDuplicates() {
    let seen = new Set();
    let hasDuplicates = choices.some(function (currentObject) {
      return seen.size === seen.add(currentObject.value).size;
    });
    console.log("hasDuplicates", hasDuplicates);
    return hasDuplicates;
  };

  sendData = () => {
    axios.post('http://www.mocky.io/v2/566061f21200008e3aabd919', {
      'label': this.state.label,
      'type': this.state.type,
      'defaultValue': this.state.defaultValue,
      'choices': this.state.choices,
      'order': this.state.order,
      'checked': this.state.checked
    }).then(function (response) {
      console.log(response);
      console.log('json post data', response.config.data);
    }).catch((e) => {
      console.error('error', e);
    });
  };

  validate = () => {
    let errors = {};
    if (this.state.label === "") {
      errors.label = "This field is required";
    } else {
      delete errors.label;
    }
    if (this.state.choices.length >= 1) {
      errors.max = "The maximum number of choices is 50";
    } else {
      delete errors.max;
    }
    if (this.checkForDuplicates()) {
      errors.duplicates = "Duplicate choices are not allowed";
    } else {
      delete errors.duplicates;
    }
    return errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    this.addDefaultValue();
    let errors = this.validate();
    this.setState({
      errors: errors
    });
    if (Object.keys(errors).length !== 0) {
      console.log(this.state.errors);
      return;
    } else {
      this.sendData();
    }
  };

  render() {
    return (
      <div className="main">
        <div className="form-wrapper">
          <div className="title">
            <h1>Field Builder</h1>
          </div>
          <form onSubmit={this.handleSubmit}>
            <TextInput
              label="Label"
              value={this.state.label}
              onChange={this.handleChange('label')}
            />
            {this.state.errors.label ? <FormError label={this.state.errors.label}/> : null}
            <div className="checkbox-div">
              <DropdownSelect
                label="Type"
                onChange={this.handleChange('type')}
                options={typeOptions}
                placeholder='Choose an option'
                value={this.state.type}
              />
              <Checkbox onChange={this.handleCheck} label="A value is required"/>
            </div>
            <TextInput
              label="Default Value"
              value={this.state.defaultValue}
              onChange={this.handleChange('defaultValue')}
            />
            <Multiselect
              label="Choices"
              onChange={this.handleChange('choices')}
              options={choices}
              placeholder='Choose an option'
              value={this.state.choices}
            />
            {this.state.errors.duplicates ? <FormError label={this.state.errors.duplicates}/> : null}
            {this.state.errors.max ? <FormError label={this.state.errors.max}/> : null}
            <DropdownSelect
              label="Order"
              onChange={this.handleChange('order')}
              options={orderOptions}
              placeholder='Choose an option'
              value={this.state.order}
            />
            <div className="buttons">
              <Button label="Save changes" type="submit" className="save"/>
              <span>Or</span>
              <Button label="Cancel" type="button" className="cancel" onClick={this.resetForm}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FieldBuilder;