import React from 'react';
import TextInput from './TextInput';
import DropdownSelect from './DropdownSelect';
import Multiselect from './Multiselect';
import Checkbox from './Checkbox';
import Button from './Button';
import FormError from "./FormError";

const typeOptions = [
  { key: 'Multiselect', text: 'Multiselect', value: 'Multiselect' },
  { key: 'Single select', text: 'Single select', value: 'Single select' }
];

const choices = [
  { key: 'Asia', text: 'Asia', value: 'Asia' },
  { key: 'Australia', text: 'Australia', value: 'Australia' },
  { key: 'Europe', text: 'Europe', value: 'Europe' },
  { key: 'Americas', text: 'Americas', value: 'Americas' },
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
      error: {
        labelError: false,
        labelErrorText: "This field is required",
        duplicatesError: false,
        duplicatesErrorText: "Duplicate choices are not allowed",
        maxError: false,
        maxErrorText: "The maximum number of choices is 50"
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDropdowns = this.handleChangeDropdowns.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  handleChangeDropdowns = (name) => (e, { value }) => {
    this.setState({ [name]: value});
    console.log(this.state);
  }

  handleCheck = () => {
    this.setState({checked: !this.state.checked});
    console.log('checked?', this.state.checked)
  }


  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");

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

    if (this.state.labelError === true || this.state.maxError === true) {
      console.log("error");
      return;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          label="Label"
          value={this.state.label}
          onChange={this.handleChange}
          name="label"
        />
        {this.state.labelError ? <FormError label={this.state.error.labelErrorText}/> : null}
        <div>
          <DropdownSelect
            label="Type"
            onChange={this.handleChangeDropdowns('type')}
            options={typeOptions}
            placeholder='Choose an option'
            value={this.state.one}
          />
          <Checkbox onChange={this.handleCheck} label="A value is required"/>
        </div>
        <TextInput
          label="Default Value"
          value={this.state.defaultValue}
          onChange={this.handleChange}
          name="defaultValue"
        />
        <Multiselect
          label="Choices"
          onChange={this.handleChangeDropdowns('choices')}
          options={choices}
          placeholder='Choose an option'
          value={this.state.choices}
        />
        <DropdownSelect
          label="Order"
          onChange={this.handleChangeDropdowns('order')}
          options={orderOptions}
          placeholder='Choose an option'
          value={this.state.order}
        />
        <div>
          <Button label="Save changes" type="submit" className="save"/>
          <span>Or</span>
          <Button label="Cancel" type="button" className="cancel"/>
        </div>
      </form>
    );
  }
}

export default FieldBuilder;