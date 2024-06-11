import React from 'react'

interface InputPropsTypes {
  handleInput: React.FormEventHandler<HTMLInputElement>;
  inputRef: React.LegacyRef<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

function InvisibleInput({handleInput,inputRef,handleKeyDown}:InputPropsTypes) {
  return (
    <input
      type="text"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        opacity: 0,
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      ref={inputRef}
    />
  );
}

export default InvisibleInput
