import React from 'react';
import TextInput from './TextInput';
import DropdownSelect from './DropdownSelect';
import Checkbox from './Checkbox';
import Button from './Button';
import FormError from './FormError';
import Choices from './Choices';
import ListItem from './ListItem';
import Cases from './Cases';
import axios from 'axios';

//dropdown options for "type" dropdown
const typeOptions = [
  {key: 'Multiselect', text: 'Multiselect', value: 'Multiselect'},
  {key: 'Single select', text: 'Single select', value: 'Single select'}
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
      item: '',
      choices: [],
      order: '',
      checked: false,
      errors: {},
      disabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };


  // onChange handler for all inputs
  handleChange = (name) => (e, {value}) => {
    this.setState({[name]: value});
  };

  //onChange handler for checkbox
  handleCheck = () => {
    this.setState({checked: !this.state.checked});
    console.log('checked?', this.state.checked)
  };

  //add a choice to the choices list
  addItem = () => {
    //check if input is empty so we don't add blanks to the list
    if (this.state.item !== "") {
      //change the item and the choices array to lower case so they can be compared accurately
      let newItem = this.state.item;
      let lowercaseItem = newItem.toLowerCase();
      let lowercaseChoices = this.state.choices.map(choice => choice.toLowerCase());
      console.log("lowercase choices", lowercaseChoices);
      //if this is the first item, add it to the list, clear the input field, and clear the duplicates error message
      if (this.state.choices.length === 0) {
        this.setState({
          choices: [newItem, ...this.state.choices],
          item: "",
          errors: {
            ...this.state.errors,
            duplicates: ""
          }
        });
      } else if (this.state.choices.length !== 0 && lowercaseChoices.indexOf(lowercaseItem) === -1) {
        //if the list is longer than 0 and no duplicates are found, add new input to the list, clear the input
        // field, and clear the duplicates error message
        this.setState({
          choices: [newItem, ...this.state.choices],
          item: "",
          errors: {
            ...this.state.errors,
            duplicates: ""
          }
        });
        //validate for length of list, set error message to state, and disable choices input field
        if (this.state.choices.length >= 5) {
          this.setState({
            errors: {
              ...this.state.errors,
              max: "The maximum number of choices is 5\nPlease delete one to continue"
            },
            disabled: true
          })
        }
      } else if (lowercaseChoices.indexOf(lowercaseItem) !== -1) {
        //if a duplicate is found, don't add it to the list, clear the input field, and set error message to state
        this.setState({
          item: "",
          errors: {
            ...this.state.errors,
            duplicates: "Duplicate choices are not allowed"
          }
        });
      }
    }
  }

  deleteItem = (item) => {
    let newChoices = this.state.choices;
    //get index of the item being deleted
    let itemIndex = this.state.choices.indexOf(item);
    //remove that item from the choices array
    this.state.choices.splice(itemIndex, 1);
    //set the new choices array to state
    this.setState({choices: newChoices});
    //if when you delete this item, it returns the array length to below the max, remove the error message and
    // enable the choices input field
    if (this.state.choices.length <= 5) {
      this.setState({
        errors: {
          ...this.state.errors,
          max: ""
        },
        disabled: false
      })
    }
  }

  // method to add the "default value" input to the choices array if it is not a duplicate upon submit
  addDefaultValue = () => {
    console.log("adddefaultvalue")
    let newItem = this.state.defaultValue;
    //change the item and the choices array to lower case so they can be compared accurately
    let lowercaseItem = newItem.toLowerCase();
    let lowercaseChoices = this.state.choices.map(choice => choice.toLowerCase());
    //check to make sure the input field isn't blank so that a blank item isn't added to the array
    if (this.state.defaultValue !== "") {
      //changes input to first letter uppercase so that all choices have uniform capitalization for comparison
      if (lowercaseChoices.indexOf(lowercaseItem) === -1) {
        this.setState({
          choices: [newItem, ...this.state.choices]
        });
      }
      console.log("this.state.choices", this.state.choices);
    } else {
      //if there is a duplicate, log it
      console.log("default value already exists in choices");
    }
  }

  //clicking the "cancel" button resets all the input fields and errors in the form by resetting their states
  resetForm = () => {
    this.setState({
      label: '',
      type: '',
      defaultValue: '',
      item: '',
      choices: [],
      order: '',
      checked: false,
      errors: {
        max: '',
        duplicates: '',
        label: ''
      },
      disabled: false
    })
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
  validateLabel = () => {
    //check of the label input field is blank
    if (!this.state.label) {
      this.setState({
        errors: {
          ...this.state.errors,
          label: "This field is required"
        }
      })
    } else {
      //if not blank, clear the error message
      this.setState({
        errors: {
          ...this.state.errors,
          label: ""
        }
      })
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    //add any default values to the choices array
    this.addDefaultValue();
    //check if the label field is empty
    this.validateLabel();
    //don't submit if errors state contains the label or max error messages
    let errors = this.state.errors;
    if (!this.state.label || errors.max) {
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
            <Choices label="Choices" value={this.state.item} disabled={this.state.disabled}
                     onChange={this.handleChange('item')} onAdd={this.addItem}>
              {this.state.choices.map(item => (
                <ListItem key={item} item={item} onDelete={() => this.deleteItem(item)}/>
              ))}
            </Choices>
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