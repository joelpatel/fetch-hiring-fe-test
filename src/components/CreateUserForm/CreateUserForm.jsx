import { createRef, useEffect, useState } from "react";
import ResultOverlayContent from "../ResultOverlayContent/ResultOverlayContent";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import InvalidReason from "../UI/InvalidReason/InvalidReason";
import Modal from "../UI/Modal/Modal";

/**
 * CreateUserForm component.
 * Takes fullName, email, password, occupation, state
 * from user and submits a POST request to create a user.
 */
const CreateUserForm = () => {
  const fullNameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const occupationRef = createRef();
  const stateRef = createRef();

  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);
  const [validations, setValidations] = useState({
    email: undefined,
    fullName: undefined,
    password: undefined,
    occupation: undefined,
    state: undefined,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    fetch("https://frontend-take-home.fetchrewards.com/form", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((resData) => {
        setOccupations(resData.occupations);
        setStates(resData.states);
      })
      .catch((err) => console.log(err));
  }, []); // on component loads

  const emailValidationHandler = () => {
    const emailFormat =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setValidations((prevState) => {
      return {
        ...prevState,
        email: emailFormat.test(emailRef.current.current.value.toLowerCase()),
      };
    });
  };

  const passwordValidationHandler = () => {
    setValidations((prevState) => {
      return {
        ...prevState,
        password: passwordRef.current.current.value.trim().length > 5,
      }; // allowed length >= 6
    });
  };

  const fullNameValidationHandler = () => {
    setValidations((prevState) => {
      return {
        ...prevState,
        fullName: fullNameRef.current.current.value.trim().length > 1,
      }; // allowed length >= 2
    });
  };

  const stateValidationHandler = () => {
    setValidations((prevState) => {
      return { ...prevState, state: stateRef.current.value !== "n/a" };
    });
  };

  const occupationValidationHandler = (e) => {
    setValidations((prevState) => {
      return {
        ...prevState,
        occupation: occupationRef.current.value !== "n/a",
      };
    });
  };

  /** set the final validation after which form will be submitable
   * - it is not used for a lot right now
   * - however if the developer wants to update the ui and
   * - disable the create me button unless the form is valid,
   * - then this useeffect will come in handy
   */
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        validations.email &&
          validations.fullName &&
          validations.occupation &&
          validations.password &&
          validations.state
      );
    }, 200);

    return () => {
      clearTimeout(identifier);
    }; // This executes before the useEffect executes the NEXT time, not the first time but the next (for every) time. && Whenever the component unMount's from the DOM (i.e. whenever it is removed.).
  }, [
    validations.email,
    validations.fullName,
    validations.occupation,
    validations.password,
    validations.state,
  ]);

  const validationFailedHandler = () => {
    // following ifs to set all invalid to false
    // consider if user just pushes create me button
    // then without following ifs there won't be highlights

    if (validations.fullName === undefined) {
      setValidations((prevState) => {
        return { ...prevState, fullName: false };
      });
    }
    if (validations.email === undefined) {
      setValidations((prevState) => {
        return { ...prevState, email: false };
      });
    }
    if (validations.password === undefined) {
      setValidations((prevState) => {
        return { ...prevState, password: false };
      });
    }
    if (validations.occupation === undefined) {
      setValidations((prevState) => {
        return { ...prevState, occupation: false };
      });
    }
    if (validations.state === undefined) {
      setValidations((prevState) => {
        return { ...prevState, state: false };
      });
    }

    // following if else focuses user to the first invalid input
    if (!validations.fullName) {
      fullNameRef.current.focus();
    } else if (!validations.email) {
      emailRef.current.focus();
    } else if (!validations.password) {
      passwordRef.current.focus();
    } else if (!validations.occupation) {
      occupationRef.current.focus();
    } else if (!validations.state) {
      stateRef.current.focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      validationFailedHandler();
      return;
    }

    // following lines to actually submit
    const user = {
      name: fullNameRef.current.current.value,
      email: emailRef.current.current.value,
      password: passwordRef.current.current.value,
      occupation: occupationRef.current.value,
      state: stateRef.current.value,
    };

    fetch("https://frontend-take-home.fetchrewards.com/form", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setResult(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="pt-20 w-full md:h-screen bg-background">
        <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-10/12 h-full">
          <div className="pb-8">
            <p className="text-4xl font-medium inline border-b-4 border-gray-500">
              Create User
            </p>
          </div>
          <div>
            <form
              action=""
              method="POST"
              className="flex flex-col w-full lg:w-6/10"
              onSubmit={submitHandler}
            >
              <Input
                label="Full Name"
                id="fullname"
                type="text"
                ref={fullNameRef}
                placeholder="Please enter your full name here"
                onChange={fullNameValidationHandler}
                isValid={validations.fullName}
                reason="Full Name must be atleast 2 characters long!"
              />

              <Input
                label="Email"
                id="email"
                type="email"
                ref={emailRef}
                placeholder="Please enter your email here"
                onChange={emailValidationHandler}
                isValid={validations.email}
                reason="Email is invalid!"
              />

              <Input
                label="Password"
                id="password"
                type="password"
                ref={passwordRef}
                placeholder="Please enter your password here"
                onChange={passwordValidationHandler}
                isValid={validations.password}
                reason="Password must be atleast 6 characters long!"
              />

              <div className="mb-2">
                <label
                  htmlFor="occupations"
                  className="text-xl font-medium inline"
                >
                  Occupation
                </label>
              </div>
              <select
                id="occupations"
                className={`mb-4 bg-transparent border-2 ring-0 text-sm rounded-md focus:outline-neutral-900  active:outline-neutral-900 w-full p-2 ${
                  validations.occupation === false
                    ? "border-red-500 outline-offset-4"
                    : ""
                }`}
                defaultValue="n/a"
                ref={occupationRef}
                onChange={occupationValidationHandler}
              >
                <option value="n/a">Choose an occupation</option>
                {occupations.map((occupation, i) => {
                  return <option key={i}>{occupation}</option>;
                })}
              </select>
              {validations.occupation === false && (
                <InvalidReason>Please select your occupation!</InvalidReason>
              )}

              <div className="mb-2">
                <label htmlFor="states" className="text-xl font-medium inline">
                  State
                </label>
              </div>
              <select
                id="states"
                className={`mb-4 bg-transparent border-2 ring-0 text-sm rounded-md focus:outline-neutral-900 active:outline-neutral-900 w-full p-2 ${
                  validations.state === false
                    ? "border-red-500 outline-offset-4"
                    : ""
                }`}
                defaultValue="n/a"
                ref={stateRef}
                onChange={stateValidationHandler}
              >
                <option value="n/a">Choose which state</option>
                {states.map((state, i) => {
                  return (
                    <option key={i} value={state.abbreviation}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
              {validations.state === false && (
                <InvalidReason>Please select your state!</InvalidReason>
              )}

              <Button type="submit">Create Me</Button>
            </form>
          </div>
        </div>
      </div>
      {result && (
        <Modal dismissModal={setResult} title="USER CREATED SUCCESSFULLY">
          <ResultOverlayContent result={result} />
        </Modal>
      )}
    </>
  );
};

export default CreateUserForm;
