import React from "react";
import { CSSTransition } from "react-transition-group";
import listTransitionSlide from "../contactList/listSlide.module.css";

const Filter = ({ valueFilter, onChangeInputFilter }) => (
  <CSSTransition
    in={valueFilter !== null}
    timeout={250}
    unmountOnExit
    classNames={listTransitionSlide}
  >
    <input
      minLength={5}
      type="text"
      value={valueFilter}
      onChange={onChangeInputFilter}
    />
  </CSSTransition>
);

export default Filter;
