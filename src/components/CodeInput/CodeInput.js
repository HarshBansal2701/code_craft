import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowSize } from "../../Hook/windowSize";
import {
  faSquareCaretUp,
  faSquareCaretDown,
} from "@fortawesome/free-solid-svg-icons";

const CodeInput = ({ testInput, setTestInput, setToggled }) => {
  const [toggleInputBar, setToggleInputBar] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setToggleInputBar(false);
    } else {
      setToggleInputBar(true);
    }
  }, [width]);

  const handleToggle = () => {
    setToggleInputBar((prev) => {
      const newState = !prev;
      setToggled(newState);
      return newState;
    });
  };

  return (
    <div
      className={`sm:border flex flex-col justify-end w-full md:w-full bg-gray-100 ${
        toggleInputBar ? "md:h-16" : "md:h-1/3"
      }`}
    >
      <button
        className="flex items-center bg-gray-200 p-2 rounded-md text-base justify-center w-16 "
        onClick={handleToggle}
      >
        stdin{" "}
        <FontAwesomeIcon
          icon={toggleInputBar ? faSquareCaretUp : faSquareCaretDown}
          size="xs"
          className="ml-1"
        />
      </button>
      {!toggleInputBar && (
        <textarea
          className="p-2 outline-none border-none bg-white"
          cols="30"
          rows="15"
          placeholder=""
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
        ></textarea>
      )}
    </div>
  );
};

export default CodeInput;
