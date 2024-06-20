import React from "react";
import classNames from "classnames";
import styles from "../../style.module.scss";

const SIderBar = () => {
  return (
    <div
      className={classNames(styles.sidebar, {
        [styles.open]: open,
      })}
    >
      <button
        className={classNames({ [styles.active]: open })}
        onClick={() => setOpen(!open)}
      >
        {open ? "Закрыть" : "Открыть"}
      </button>
      <div className={styles.content}>
        {items.map((item) => (
          <div
            className={classNames(styles.item, {
              [styles.hidden]: !open,
            })}
          >
            {item}
            <div className={styles.hoverLine}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SIderBar;
