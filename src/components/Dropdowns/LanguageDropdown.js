import React from 'react';
import Select from "react-select";
import { LANGUAGES } from '../../constants/languages';

export default function LanguageDropdown({ language, setLanguage }) {
  return (
    <Select
      placeholder={language.label}
      options={LANGUAGES}
      value={LANGUAGES.find(option => option.value === language.value)}
      className="w-full"
      onChange={(selectedOption) => {
        setLanguage(selectedOption); 
      }}
    />
  );
}
