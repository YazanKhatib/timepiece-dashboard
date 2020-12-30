import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Stylesheet
import './Nav.css';

// Assets
import Logo from '../../assets/images/logo/primary.svg';
import {
  LanguageSwitcher,
  LightDarkModeSwitcher,
} from '../FormElements/FormElements';

interface NavProps {
  list: {
    icon: string;
    name: string;
    link: string;
  }[];
  active: string | null;
}

export const SideNav = (props: NavProps) => {
  const getActiveIndexByName = (name: string | null): number => {
    let matched_index = 0;
    props.list.map((item, index) => {
      if (item.link.substring(1) === name) matched_index = index;
    });
    return matched_index;
  };

  const getActiveBoxPositionByIndex = (index: number): number => {
    return index === 0
      ? index * 90
      : index === props.list.length - 1
      ? index * 90 + 10
      : index * 90 + 5;
  };

  const [activeBox, setActiveBox] = useState<number>(
    getActiveBoxPositionByIndex(getActiveIndexByName(props.active)),
  );

  console.log(activeBox);

  return (
    <nav className="side-nav">
      <div className="active-box" style={{ top: activeBox }} />
      <ul>
        {props.list.map((item, index) => {
          return (
            <li
              key={index}
              className={
                item.link.substring(1) === props.active ? 'active' : ''
              }
              onClick={() => setActiveBox(getActiveBoxPositionByIndex(index))}>
              <Link to={item.link}>
                <span>
                  <i className={item.icon}></i> {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const TopNav = () => {
  return (
    <nav className="top-nav">
      <img src={Logo} className="logo" />

      <div className="actions">
        <div className="switchers">
          <LightDarkModeSwitcher />
          <span className="margin-10" />
          <LanguageSwitcher />
        </div>

        <i className="icon-logout" />
      </div>
    </nav>
  );
};
