import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

const AutoComplete = (props) => {
  const { suggestions } = props;
  const userInputRef = useRef(null);

  const [activeSuggestions, setActiveSuggestions] = useState(0);
  const [initialSuggestions] = useState(suggestions);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onClick = () => {
    setShowSuggestions(true);
  };

  const onChange = (e) => {
    const userInput = userInputRef.current.value;
    const founded = initialSuggestions.filter(
      (s) => s.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setActiveSuggestions(0);
    setFilteredSuggestions(founded);
    setShowSuggestions(true);
    setUserInput(userInput);
  };

  const onClickSuggestion = (e) => {
    const founded = initialSuggestions.findIndex(
      (s) => s.label === e.target.innerText
    );
    setActiveSuggestions(founded);
    setFilteredSuggestions(initialSuggestions);
    setShowSuggestions(false);
    setUserInput(e.target.innerText);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestions(
        initialSuggestions.findIndex(
          (k) =>
            k.label ===
            filteredSuggestions[
              filteredSuggestions.findIndex(
                (s) => s.label === filteredSuggestions[activeSuggestions].label
              )
            ].label
        )
      );
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestions].label);
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestions === 0) {
        return;
      }

      setActiveSuggestions(activeSuggestions - 1);
    }

    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestions === filteredSuggestions.length - 1) {
        return;
      }

      setActiveSuggestions(activeSuggestions + 1);
    }
  };

  const onMouseLeave = () => {
    setShowSuggestions(false);
    setFilteredSuggestions(initialSuggestions);
  };

  useEffect(() => {
    userInputRef.current.value = userInput;
  }, [userInput]);

  useEffect(() => {
    !!props.callback &&
      props.callback({
        index: activeSuggestions,
        label: initialSuggestions[activeSuggestions].label
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSuggestions]);

  console.log("1", {
    id: initialSuggestions[activeSuggestions].id,
    label: initialSuggestions[activeSuggestions].label,
    index: activeSuggestions
  });

  let suggestionsListComponent;

  if (showSuggestions && (userInput === "" || !!userInput)) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestions) {
              className = "activeSuggestion";
            }

            return (
              <li
                className={className}
                key={suggestion.id}
                onClick={onClickSuggestion}
                data-id={suggestion.id}
              >
                {suggestion.label}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="noSuggestion">
          <em>No suggestions</em>
        </div>
      );
    }
  }

  return (
    <div onMouseLeave={onMouseLeave}>
      <input
        ref={userInputRef}
        placeholder="search here"
        onClick={onClick}
        onChange={onChange}
        onKeyDown={onKeyDown}
        name="searchHere"
        size={22}
      />
      {suggestionsListComponent}
    </div>
  );
};

export default AutoComplete;
