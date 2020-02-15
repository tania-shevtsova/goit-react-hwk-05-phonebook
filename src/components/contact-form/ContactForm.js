import React from "react";
import ContactItem from "../contactItem/ContactItem";
import ContactList from "../contactList/ContactList";
import Filter from "../filter/Filter";
import css from "./ContactForm.module.css";
import { CSSTransition } from "react-transition-group";
import listTransitionPop from "../contactList/listPop.module.css";

const ContactForm = ({
  contacts,
  handleSubmit,
  handleChange,
  handleChangeNumber,
  value,
  valueNum,
  name,
  arr,
  number,
  onChangeInputFilter,
  valueFilter,
  handleDelete
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={css.contactForm}>
          <span>Name</span>
          <input
            minLength={5}
            type="text"
            name="name"
            onChange={handleChange}
            value={value}
          ></input>
          <span>Number</span>
          <input
            minLength={5}
            maxLength={7}
            type="number"
            name="number"
            onChange={handleChangeNumber}
            valuenum={valueNum}
          ></input>
          <button className={css.addButton} type="submit">
            Add contact
          </button>
        </div>

        <>
          <CSSTransition
            in={contacts.length >= 2}
            timeout={250}
            unmountOnExit
            classNames={listTransitionPop}
          >
            <div className={css.contactForm}>
              <h2>Find contacts by name</h2>

              <Filter
                valueFilter={valueFilter}
                onChangeInputFilter={onChangeInputFilter}
              />
            </div>
          </CSSTransition>
        </>

        {contacts.length > 0 && (
          <ContactList arr={arr} handleDelete={handleDelete}>
            <ContactItem name={name} number={number} />
          </ContactList>
        )}
      </form>
    </>
  );
};

export default ContactForm;
