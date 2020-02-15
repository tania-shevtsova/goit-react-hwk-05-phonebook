import React from "react";
import css from "./contactItem.module.css";

const ContactItem = ({ name, number, handleDelete, id }) => {
  return (
    <>
      <div>
        <li className={css.contactItem}>
          <p>{name}:</p> <p>{number}</p>
          <button
            className={css.contactItemButtonDelete}
            type="button"
            onClick={() => handleDelete({ id })}
          >
            <span className={css.closeSymbol}>{`\u2716`}</span>
          </button>
        </li>
      </div>
    </>
  );
};

export default ContactItem;
