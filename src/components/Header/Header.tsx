import React from "react";
import styles from "./style.module.scss";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/user";
const Header = () => {
  const headerLinks: { label: string; path: string }[] = [
    { label: "Главная", path: "/" },
    { label: "Войти", path: "/login" },
  ];
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const location = useLocation();
  return (
    <header>
      <div className={styles.links}>
        {headerLinks.map((link) => (
          <Link
            className={classNames(styles.link, {
              [styles.active]: location.pathname === link.path,
            })}
            to={link.path}
          >
            {link.label}
          </Link>
        ))}
        {user && (
          <Link
            className={styles.link}
            onClick={() => dispatch(logout())}
            to={"/"}
          >
            Выйти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
