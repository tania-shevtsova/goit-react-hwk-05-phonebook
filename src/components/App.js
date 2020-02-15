import React, { Component } from "react";
import ContactForm from "./contact-form/ContactForm";
import uuid from "uuid";
import css from "./App.module.css";
import transitions from "../transitions.module.css";
import cssForm from "./contact-form/ContactForm.module.css";
import { CSSTransition } from "react-transition-group";
import PNotify from "pnotify/dist/es/PNotify";
import "pnotify/dist/es/PNotifyAnimate";
import Notify from "./notify/Notify";
import tr from "./notify/tr.module.css";


class App extends Component {
  state = {
    contacts: [],
    filter: "",
    name: "",
    number: "",
    isOpen: false,
    onNotification: false,
    notificationMessage: ""
  };

  componentDidMount() {
    const currentLocal = JSON.parse(localStorage.getItem("contacts"));
    this.setState({
      contacts: currentLocal || [],
      isOpen: true
    });
  }

  handleChange = e => {
    const name = e.target.name;

    this.setState({ [name]: e.target.value });
  };

  handleChangeNumber = e => {
    const number = e.target.name;

    this.setState({
      [number]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const findSame = this.state.contacts.find(
      el => el.name.toLowerCase() === this.state.name.toLowerCase()
    );
    if (findSame) {
      this.setState({
        onNotification: true,
        notificationMessage: `${this.state.name} already exists in your contact list!`
      });
      setTimeout(() => {
        this.setState({
          onNotification: false
        });
      }, 1500);

      this.setState({ name: "" });
      return;
    }

    if (this.state.name === "") {
      alert("Please, enter a name!");
      return;
    }

    if (this.state.number === "") {
      alert("Please, enter a phone number!");
      return;
    }

    const object = {
      id: uuid(),
      name: this.state.name,
      number: this.state.number
    };
    this.setState(prev => {
      localStorage.setItem(
        "contacts",
        JSON.stringify([...prev.contacts, object])
      );
      return {
        contacts: [...prev.contacts, object]
      };
    });

    e.target.reset();
    this.setState({ name: "", number: "" });
  };

  onChangeInputFilter = e => {
    this.setState({
      filter: e.target.value
    });
  };

  inputFilter = (contacts, filter) => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleDelete = ({ id }) => {
    this.setState(prev => {
      localStorage.setItem(
        "contacts",
        JSON.stringify(prev.contacts.filter(el => el.id !== id))
      );
      return {
        contacts: prev.contacts.filter(el => el.id !== id)
      };
    });
  };

  render() {
    const { isOpen, onNotification, notificationMessage } = this.state;
    const filteredNames = this.inputFilter(
      this.state.contacts,
      this.state.filter
    );

    return (
      
      <>
        <CSSTransition
          in={isOpen}
          timeout={500}
          classNames={transitions}
          unmountOnExit
        >
          <h2 className={cssForm.header}>Phonebook</h2>
        </CSSTransition>

        <ContactForm
          contacts={this.state.contacts}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleChangeNumber={this.handleChangeNumber}
          value={this.state.name}
          valuenum={this.state.number}
          name={this.state.contacts.name}
          arr={filteredNames}
          number={this.state.contacts.number}
          onChangeInputFilter={this.onChangeInputFilter}
          valueFilter={this.state.filter}
          handleDelete={this.handleDelete}
        />
        <CSSTransition
          in={onNotification}
          timeout={250}
          classNames={tr}
          unmountOnExit
        >
          <Notify notificationMessage={notificationMessage} />
        </CSSTransition>
      </>
    );
  }
}

export default App;
