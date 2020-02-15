import React from "react";
import css from "./Notify.module.css";

const Notify = ({ notificationMessage }) => (
  <div className={css.custom}>
    <span className={css.customMessage}>{notificationMessage}</span>
  </div>
);

export default Notify;
