import styled from "styled-components";
import { ModeContext } from "../../App";
import { useContext, Suspense } from "react";
import { useParams } from "react-router-dom";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


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
      margin: 0;
      font-weight: 500;
      font-size: 1.125rem;
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
    margin-right: 24px;
    margin-bottom: 3rem;
    margin-bottom: 4.5rem;
  }
`;

const ToggleWrapper = styled.div`
  /* Mobile */
  margin: 0;
  width: 80px;
  height: 20px;
  display: flex;
  padding: 1rem 0;
  align-items: center;
  justify-content: space-between;

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
    width: 8rem;
    margin-right: 24px;

    .imageContainer {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

function Bar() {
  const { subject } = useParams();
  const { colorMode } = useContext(ModeContext);

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
      ? "/assets/images/icon-html.svg"
      : subject == "CSS"
      ? "/assets/images/icon-css.svg"
      : subject == "JavaScript"
      ? "/assets/images/icon-js.svg"
      : "/assets/images/icon-accessibility.svg"
  }`;

  return (
    <ModeBar>
      <div className="subject">
        <Suspense fallback={<LoadingSpinner />}>
          {subject ? (
            <>
              <span style={constumSubjectIconstyle}>
                <img
                  loading="lazy"
                  srcSet={icon}
                  src={icon}
                  alt={subject}
                />
              </span>
              <p>{subject}</p>
            </>
          ) : (
            ""
          )}
        </Suspense>
      </div>

      <ToggleWrapper>
        <span className="imageContainer">
          <img
            loading="lazy"
            srcSet={`${
              colorMode == "dark"
                ? "/assets/images/icon-sun-light.svg"
                : "/assets/images/icon-sun-dark.svg"
            }`}
            src={`${
              colorMode == "dark"
                ? "/assets/images/icon-sun-light.svg"
                : "/assets/images/icon-sun-dark.svg"
            }`}
            alt="light mode"
          />
        </span>

        <ToggleSwitch />

        <span className="imageContainer">
          <img
            loading="lazy"
            srcSet={`${
              colorMode == "dark"
                ? "/assets/images/icon-moon-light.svg"
                : "/assets/images/icon-moon-dark.svg"
            }`}
            src={`${
              colorMode == "dark"
                ? "/assets/images/icon-moon-light.svg"
                : "/assets/images/icon-moon-dark.svg"
            }`}
            alt="dark mode"
          />
        </span>
      </ToggleWrapper>
    </ModeBar>
  );
}

export default Bar;
