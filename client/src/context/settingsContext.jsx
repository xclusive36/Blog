import { createContext, useState } from "react";
import PropTypes from "prop-types";

const contextObj = {
  isModalOpen: false,
};

const defaultContextObj = { contextObj };

export const SettingsContext = createContext({
  SettingsObj: defaultContextObj,
  // eslint-disable-next-line no-unused-vars
  setSettingsObj: (data) => {},
});

export const SettingsProvider = ({ children }) => {
  const [SettingsContextObj, setSettingsContextObj] =
    useState(defaultContextObj);

  const value = {
    SettingsContextObj,
    setSettingsContextObj,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
