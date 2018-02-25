import React from 'react';
import TextInput from './TextInput';
import DropdownSelect from './DropdownSelect';
import Multiselect from './Multiselect';
import Checkbox from './Checkbox';
import Button from './Button';
import FormError from "./FormError";
import axios from 'axios';


const typeOptions = [
  { key: 'Multiselect', text: 'Multiselect', value: 'Multiselect' },
  { key: 'Single select', text: 'Single select', value: 'Single select' }
];

const choices = [
  { key: 'Asia', text: 'Asia', value: 'Asia' },
  { key: 'Australia', text: 'Australia', value: 'Australia' },
  { key: 'Europe', text: 'Europe', value: 'Europe' },
  { key: 'Americas', text: 'Americas', value: 'Americas' },
  { key: 'Africa', text: 'Africa', value: 'Africa' },
  { key: 'Africa', text: 'Africa', value: 'Africa' }
];

const orderOptions = [
  { key: 'alphabetical', text: 'Alphabetical', value: 'alphabetical' },
  { key: 'random', text: 'Random', value: 'random' }
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
      labelError: false,
      labelErrorText: "This field is required",
      duplicatesError: false,
      duplicatesErrorText: "Duplicate choices are not allowed",
      maxError: false,
      maxErrorText: "The maximum number of choices is 50"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange = (name) => (e, { value }) => {
    this.setState({ [name]: value});
    console.log(this.state);
  };

  handleCheck = () => {
    this.setState({checked: !this.state.checked});
    console.log('checked?', this.state.checked)
  };

  resetForm = () => {
    this.setState({
      label: '',
      type: '',
      defaultValue: '',
      choices: [],
      order: '',
      checked: false
    })
  };

  checkForDuplicates() {
    let seen = new Set();
    let hasDuplicates = choices.some(function(currentObject) {
      return seen.size === seen.add(currentObject.value).size;
    });
    if (!hasDuplicates) {
      this.setState({duplicatesError: true})
    } else {
      this.setState({duplicatesError: false})

    }
    console.log("hasDuplicates", this.state.duplicatesError);
  };

  sendData = () => {
    axios.post('http://www.mocky.io/v2/566061f21200008e3aabd919', {
      'label': this.state.label,
      'type': this.state.type
    }).then(function (response) {
      console.log(response);
      console.log('json post data', response.config.data);
    }).catch((e) => {
      console.error('error', e);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    this.checkForDuplicates();

    if (!this.state.label) {
      this.setState({labelError: true});
    } else {
      this.setState({labelError: false})
    }

    if (this.state.choices.length >= 50) {
      this.setState({maxError: true});
    } else {
      this.setState({maxError: false});
    }

    if (this.checkForDuplicates) {
      this.setState({duplicatesError: true});
    } else {
      this.setState({duplicatesError: false});
    }

    if (!this.state.label || this.state.choices.length >= 50) {
      console.log("error");
      return false;
    } else {
      this.sendData();
    }

  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          label="Label"
          value={this.state.label}
          onChange={this.handleChange('label')}
        />
        {this.state.labelError ? <FormError label={this.state.labelErrorText}/> : null}
        <div>
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
        {this.state.maxError ? <FormError label={this.state.maxErrorText}/> : null}
        <DropdownSelect
          label="Order"
          onChange={this.handleChange('order')}
          options={orderOptions}
          placeholder='Choose an option'
          value={this.state.order}
        />
        <div>
          <Button label="Save changes" type="submit" className="save"/>
          <span>Or</span>
          <Button label="Cancel" type="button" className="cancel"/>
        </div>
        <Button label="reset" type="button" onClick={this.resetForm}/>
      </form>
    );
  }
}

export default FieldBuilder;