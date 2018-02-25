import React from 'react';
import TextInput from './TextInput';
import DropdownSelect from './DropdownSelect';
import Multiselect from './Multiselect';
import Checkbox from './Checkbox';
import Button from './Button';
import FormError from "./FormError";
import axios from 'axios';

//dropdown options for "type" dropdown
const typeOptions = [
  {key: 'Multiselect', text: 'Multiselect', value: 'Multiselect'},
  {key: 'Single select', text: 'Single select', value: 'Single select'}
];

//dropdown selections for "choices" multiselect
const choices = [
  {key: 'Asia', text: 'Asia', value: 'Asia'},
  {key: 'Australia', text: 'Australia', value: 'Australia'},
  {key: 'Europe', text: 'Europe', value: 'Europe'},
  {key: 'Americas', text: 'Americas', value: 'Americas'},
  {key: 'Africa', text: 'Africa', value: 'Africa'}
  // { key: 'Africa', text: 'Africa', value: 'Africa' }
];

//dropdown options for "order" dropdown
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

  //onChange handler for all inputs
  handleChange = (name) => (e, {value}) => {
    this.setState({[name]: value});
    console.log(this.state);
  };

  //onChange handler for checkbox
  handleCheck = () => {
    this.setState({checked: !this.state.checked});
    console.log('checked?', this.state.checked)
  };

  //method to add the "default value" input to the choices array if it is not a duplicate
  addDefaultValue = () => {
    let defaultValue = "";
    //check to make sure the input field isn't blank so that a blank item isn't added to the array
    if (this.state.defaultValue !== "") {
      //changes input to first letter uppercase so that all choices have uniform capitalization for comparison
      defaultValue = this.state.defaultValue.toLowerCase().split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
      //create new object from default value
      let newItem = {key: defaultValue, text: defaultValue, value: defaultValue};
      //check the "value" keys of all objects in the choices array for a match with the default value
      const index = choices.findIndex(item => item.value === defaultValue);
      //if no match is found, add the new object to the choices array
      if (index === -1) {
        choices.push(newItem);
        this.setState({
          choices: [...this.state.choices, newItem]
        });
        console.log("this.state.choices", this.state.choices);
      } else {
        //if there is a duplicate, log it
        console.log("default value already exists in choices");
      }
    } else {
      //if the input field is blank, log it
      console.log("default value is empty");
    }
  }

  //clicking the "cancel" button resets all the input fields and errors in the form by resetting their states
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

  //check the choices array for duplicates
  checkForDuplicates() {
    let hasDuplicates = false;
    //a Set object will only accept new items that are unique, so add all items from the choices array and if the
    // Set array is shorter than the choices array, that means there were duplicates, so return true
    let unique = [...new Set(choices.map(item => item.value))];
    if (unique.length < choices.length) {
      // console.log("has duplicates")
      hasDuplicates = true;
    }
    console.log("hasDuplicates", hasDuplicates);
    return hasDuplicates;
  };

  //post an object of the states of the inputs
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

  //validation function
  validate = () => {
    let errors = {};
    //check of the label input field is blank
    if (this.state.label === "") {
      errors.label = "This field is required";
    } else {
      delete errors.label;
    }
    //check if the choices array is longer than 50
    if (this.state.choices.length >= 1) {
      errors.max = "The maximum number of choices is 50";
    } else {
      delete errors.max;
    }
    //check if there are duplicates in the choices array
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
    //add any default values to the choices array
    this.addDefaultValue();
    // this.checkForDuplicates();
    //get the value of errors from the validation function, which returns an array of errors
    let errors = this.validate();
    this.setState({
      errors: errors
    });
    //don't submit if errors has any errors in it
    if (Object.keys(errors).length !== 0) {
      console.log(this.state.errors);
      return;
    } else {
      //if no errors, make the axios call and post the data
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