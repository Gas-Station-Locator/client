import React from "react";
import { useTheme } from "../assets/ThemeContext";

const SignIn = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <form action="POST">
      <input
        type="text"
        onChange={(userEvent) => {
          //setUsername(user.target.value)
        }}
        placeholder="Username"
        name=""
        id=""
      />

      <input
        type="password"
        onChange={(userEvent) => {
          //setPassword(user.target.value)
        }}
        placeholder="Password"
        name=""
        id=""
      />

      <input type="submit" name="submit" />
    </form>
  );
};

export default SignIn;
