"use client";

import React from "react";
import Button from "@/components/Button";
import { useReducer } from "react";
import InputField from "@/components/InputField";

type TFormState = {
  email: string;
  password: string;
  name: string;
  birth: string;
  valids: Record<"email" | "password" | "name" | "birth", boolean>;
  errorMessages: Record<"email" | "password" | "name" | "birth", string | null>;
};

type TFormAction =
  | { type: "UPDATE_EMAIL"; payload: string }
  | { type: "UPDATE_PASSWORD"; payload: string }
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_BIRTH"; payload: string }
  | { type: "VALIDATE_EMAIL" }
  | { type: "VALIDATE_PASSWORD" }
  | { type: "VALIDATE_NAME" }
  | { type: "VALIDATE_BIRTH" };

const initialFormState: TFormState = {
  email: "",
  password: "",
  name: "",
  birth: "",
  valids: {
    email: true,
    password: true,
    name: true,
    birth: true,
  },
  errorMessages: {
    email: null,
    password: null,
    name: null,
    birth: null,
  },
};

function formReducer(state: TFormState, action: TFormAction) {
  switch (action.type) {
    /* 이메일 상태 업데이트 */
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    /* 이메일 유효성 검사 */
    case "VALIDATE_EMAIL": {
      const email = state.email.trim();
      const isValid =
        email === "" ||
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i.test(
          email
        );
      return {
        ...state,
        valids: {
          ...state.valids,
          email: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          email: isValid ? null : "이메일 형식을 확인해주세요",
        },
      };
    }
    /* 비밀번호 상태 업데이트 */
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    /* 비밀번호 유효성 검사 */
    case "VALIDATE_PASSWORD": {
      const password = state.password.trim();
      const isValidLength = password.length >= 8 && password.length <= 16;
      const isValidComplexity = /^(?=.*[a-zA-Z])(?=.*[\d\W])/.test(password);
      const isValid = password === "" || (isValidLength && isValidComplexity);
      return {
        ...state,
        valids: {
          ...state.valids,
          password: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          password: isValid ? null : "비밀번호 양식을 확인해주세요",
        },
      };
    }
    /* 이름 상태 업데이트 */
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    /* 이름 유효성 검사 */
    case "VALIDATE_NAME": {
      const name = state.name.trim();
      const isValidLength = name.length <= 8;
      const isValidComplexity = /^[가-힣]+$/.test(name);
      const isValid = name === "" || (isValidLength && isValidComplexity);
      return {
        ...state,
        valids: {
          ...state.valids,
          name: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          name: isValid ? null : "8글자 이하의 한글을 입력해주세요.",
        },
      };
    }
    /* 생년월일 상태 업데이트 */
    case "UPDATE_BIRTH":
      return {
        ...state,
        birth: action.payload,
      };

    /* 생년월일 유효성 검사 */
    case "VALIDATE_BIRTH": {
      const birth = state.birth.trim();
      const isValidLength = birth.length <= 8;
      const isValidComplexity =
        /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(birth) &&
        parseInt(birth.substring(0, 4)) >= 1900 &&
        parseInt(birth.substring(0, 4)) <= 2024;
      const isValid = birth === "" || (isValidLength && isValidComplexity);
      return {
        ...state,
        valids: {
          ...state.valids,
          birth: isValid,
        },
        errorMessages: {
          ...state.errorMessages,
          birth: isValid ? null : "올바른 생년월일을 입력해주세요",
        },
      };
    }

    default:
      return state;
  }
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_EMAIL", payload: e.target.value });
    dispatch({ type: "VALIDATE_EMAIL" });
  };

  const handlePassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value });
    dispatch({ type: "VALIDATE_PASSWORD" });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_NAME", payload: e.target.value });
    dispatch({ type: "VALIDATE_NAME" });
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_BIRTH", payload: e.target.value });
    dispatch({ type: "VALIDATE_BIRTH" });
  };

  // const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   dispatch({ type: "VALIDATE_EMAIL" });

  //   if (state.isValid) {
  //     console.log("Email is valid:", state.email);
  //   }
  // };

  return (
    <form onSubmit={() => {}} className="flex w-[400px] flex-col">
      {/* 이메일 주소 */}
      <InputField
        label="로그인에 사용할 이메일 주소를 입력해주세요"
        id="email"
        type="email"
        placeholder="example@onyx.co.kr"
        errorMessage={state.errorMessages.email}
        invalid={!state.valids.email}
        onChange={handleEmailChange}
        value={state.email}
      />
      {/* 비밀번호 */}
      <InputField
        label="사용할 비밀번호를 입력해주세요"
        id="password"
        type="password"
        placeholder="8~16 글자의 영문, 숫자, 특수문자 조합"
        errorMessage={state.errorMessages.password}
        invalid={!state.valids.password}
        onChange={handlePassWordChange}
        value={state.password}
      />
      {/* 이름 */}
      <InputField
        label="이름을 입력해주세요"
        id="name"
        type="text"
        placeholder="예) 현지수"
        errorMessage={state.errorMessages.name}
        invalid={!state.valids.name}
        onChange={handleNameChange}
        value={state.name}
      />
      {/* 생년월일 */}
      <InputField
        label="생년월일을 입력해주세요"
        id="birth"
        type="text"
        placeholder="예) 19990707"
        errorMessage={state.errorMessages.birth}
        invalid={!state.valids.birth}
        onChange={handleBirthChange}
        value={state.birth}
      />
      {/* 회원가입 완료 버튼 */}
      <Button
        className="mt-[50px]"
        label="회원가입 완료"
        type="submit"
      ></Button>
    </form>
  );
}