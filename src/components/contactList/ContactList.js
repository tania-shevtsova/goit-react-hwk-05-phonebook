import React from "react";
import ContactItem from "../contactItem/ContactItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import listTransitionSlide from "./listSlide.module.css";

const ContactList = ({ arr, handleDelete }) => (
  <TransitionGroup component="ul">
    {arr.map(el => (
      <CSSTransition
        key={el.id}
        timeout={250}
        unmountOnExit
        classNames={listTransitionSlide}
      >
        <ContactItem key={el.id} {...el} handleDelete={handleDelete} />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default ContactList;
