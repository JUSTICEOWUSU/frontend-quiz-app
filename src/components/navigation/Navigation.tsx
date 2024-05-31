import { useContext } from "react";
import styled from "styled-components";
import { ModeContext } from "../../App";
import { useParams } from "react-router-dom";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";


const ModeBar = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: space-between;

  .subject {
    gap: 1rem;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    color: ${({ theme }) =>
      theme.mode == "dark" ? theme.darkMode.text : theme.lightMode.text};

    p {
      font-size: 1.125rem;
      margin: 0;
      font-weight: 500;
      font-family: "Rubik Variable", "Rubik", sans-serif;
    }
    span {
      width: 2.5rem;
      height: 2.5rem;
      display: block;
      border-radius: 0.5rem;
      background: #f6e7ff;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  /* Tablet */
  @media (min-width: 640px) {
    margin-bottom: 3.0625rem;

    .subject {
      gap: 1.5rem;

      p {
        font-size: 1.75rem;
      }
      span {
        width: 3rem;
        height: 3rem;
      }
    }
  }

  /* Desktop (1025px ->) */
  @media (min-width: 1052px) {
    margin-bottom: 3rem;
    margin-right: 24px;
    margin-bottom: 4.5rem;
  }
`;

const ToggleWrapper = styled.div`
  /* Mobile */
  width: 80px;
  margin: 0;
  padding: 1rem 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .imageContainer {
    width: 1rem;
    height: 1rem;
    display: block;

    img {
      width: 100%;
      height: 100%;
    }
  }

  /* Tablet (1025px ->) */
  @media (min-width: 640px) {
    margin-right: 24px;
    width: 8rem;

    .imageContainer {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

function Navigation() {
  const { colorMode } = useContext(ModeContext);
  const { subject } = useParams();

  const constumSubjectIconstyle = {
    background: `${
      subject == "HTML"
        ? "#FFF1E9"
        : subject == "CSS"
        ? "#E0FDEF"
        : subject == "JavaScript"
        ? "#EBF0FF"
        : "#F6E7FF"
    }`,
  };

  const icon = `${
    subject == "HTML"
      ? "/images/icon-html.svg"
      : subject == "CSS"
      ? "/images/icon-css.svg"
      : subject == "JavaScript"
      ? "/images/icon-js.svg"
      : "/images/icon-accessibility.svg"
  }`;

  return (
    <ModeBar>
      <div className="subject">
        {subject ? (
          <>
            <span style={constumSubjectIconstyle}>
              <img src={icon} alt={`${subject} icon`} />
            </span>
            <p>{subject}</p>
          </>
        ) : (
          ""
        )}
      </div>

      <ToggleWrapper>
        <span className="imageContainer">
          <img
            src={`${
              colorMode == "dark"
                ? "/images/icon-sun-light.svg"
                : "/images/icon-sun-dark.svg"
            }`}
          />
        </span>

        <ToggleSwitch />

        <span className="imageContainer">
          <img
            src={`${
              colorMode == "dark"
                ? "/images/icon-moon-light.svg"
                : "/images/icon-moon-dark.svg"
            }`}
          />
        </span>
      </ToggleWrapper>
    </ModeBar>
  );
}

export default Navigation;
