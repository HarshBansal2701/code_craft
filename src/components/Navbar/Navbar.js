import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import ThemeDropdown from "../Dropdowns/ThemeDropdown";
import { checkStatus, submitCode } from "../../api";

const Navbar = ({
  language,
  setLanguage,
  setTheme,
  theme,
  setOutput,
  setStatus,
  testInput,
  code
}) => {
  const handleSubmit = async () => {
    setStatus("Running");

    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(testInput),
    };

    try {
      const { data } = await submitCode(formData);
      const { token } = data;

      if (!token) {
        throw new Error("No token received from the submitCode API.");
      }

      // Poll for the status of the submission
      let statusResponse = await checkStatus(token);
      while (statusResponse.success && statusResponse.data.status?.id === 1) {
        // Status ID 1 typically means "Processing"
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
        statusResponse = await checkStatus(token);
      }

      if (statusResponse.success) {
        setOutput(statusResponse.data);
        setStatus("Finished");
      } else {
        console.error(statusResponse.err || "Unknown error occurred");
        setStatus("Error");
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message || "An error occurred");
      setStatus("Error");
    }
  };

  return (
    <div className="grid grid-cols-2 m-2">
      <button
        onClick={handleSubmit}
        className="bg-[#5cb85c] border-[#4cae4c] border-1 text-white rounded-full w-32 text-sm md:text-base hover:border-[#398439] hover:bg-[#449d44]"
      >
        <FontAwesomeIcon
          icon={faPlayCircle}
          className="mr-2"
          color="white"
          size="sm"
        />
        <span>Run Code</span>
      </button>
      <div className="grid grid-cols-2 gap-2">
        <LanguageDropdown language={language} setLanguage={setLanguage} />
        <ThemeDropdown theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
};

export default Navbar;
