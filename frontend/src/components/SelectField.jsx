import React, { useRef, useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import Input from "./input/inputOne";
import { useEffect } from "react";

const Dropdown = styled.div`
    top: calc(100% + 5px);
    background: #333;
    color: white;
    z-index: 1;
    left: 0;
    & li {
      border-bottom: 1px solid #aaa;
      transition: all 0.3s ease-in-out;
    }
    & li:hover {
      background: white;
      color: black;
      transition: all 0.3s ease-in-out;
    }
  `,
  Container = styled.div``,
  Search = styled.input`
    border-radius: 0px;
  `;

const SelectField = ({
  value,
  name,
  placeholder,
  label,
  options,
  onChange,
  required,
  disabled,
  inputClass,
  wrapperClass,
  labelClass,
  handleSearch,
  useSearch = false,
  error,
}) => {
  const [show, setShow] = useState(false);
  const searchInput = useRef(null);
  const [option, setOption] = useState([]);

  useEffect(() => setOption(options), [options]);

  const searchControl = (value) => {
    let data;
    if (value) {
      data = options.filter((data) => {
        if (data.name)
          return data.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        else return data.toLowerCase().indexOf(value) > -1;
      });
    } else data = options;

    setOption(data);
  };
  handleSearch = handleSearch || searchControl;
  return (
    <div className="mt-3">
      <Input
        value={value}
        name={name}
        label={label}
        placeholder={placeholder}
        labelClass={labelClass}
        disabled={disabled}
        wrapperClass={`input__two ${wrapperClass}`}
        inputClass={`relative focus:shadow-md  transition-all ${inputClass}`}
        inputC={disabled ? "" : "text-2xl cursor-pointer"}
        icon={<MdKeyboardArrowDown className="bold" size={"20"} />}
        required={required}
        readOnly={true}
        error={error}
        onChange={(e) => {}}
        onClick={({ target }) => {
          target.blur();
          setShow((state) => !state);
          if (show === false && !value) {
            error?.setTouched({ [name]: true });
            error?.setErrors({
              [name]: `&nbsp;${label} is required`,
            });
          }
          setTimeout((_) => {
            searchInput?.current?.focus();
          }, 1000);
        }}
      >
        <div>
          {show && (
            <Dropdown className="h-[180px] absolute mb-5 w-full shadow-lg rounded">
              <div className={`${useSearch ? "h-[140px]" : "h-[180px]"} pb-2`}>
                {useSearch && (
                  <Search
                    onChange={({ target }) => handleSearch(target.value)}
                    ref={searchInput}
                    className="rounded-none bg-white focus:outline-none focus:shadow text-black text-xl capitalize w-full px-3 py-3 italic shadow-none"
                    placeholder="Search here..."
                  />
                )}
                <Container className="scroll h-full overflow-auto pt-3">
                  {option.map((option, i) => {
                    value = option;

                    if (isNaN(Object.keys(value)[0])) {
                      value = value.name;
                    }

                    return (
                      <li
                        key={i}
                        onClick={() => {
                          onChange(value, option);
                          setShow(false);
                          setOption(options);
                        }}
                        className="mb- list-none capitalize text-xl py-2 px-4 cursor-pointer"
                      >
                        {value}
                      </li>
                    );
                  })}
                </Container>
              </div>
            </Dropdown>
          )}
        </div>
      </Input>
    </div>
  );
};

export default SelectField;
