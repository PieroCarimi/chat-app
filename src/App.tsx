import React, { useState, lazy, Suspense, ChangeEvent } from "react";
import LoginForm from "./components/LoginForm";
import Welcome from "./components/Welcome";

type Users = Record<string, { counter: number; lastAccess: string }>;

export function App() {
  const cachedEmail = localStorage.getItem("email") || "";
  const cachedUsers = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users") || "{}")
    : {};
  const [isLogged, setIsLogged] = useState<boolean>(!!cachedEmail);
  const [inputEmail, setInputEmail] = useState<string>(cachedEmail);
  const [users, setUsers] = useState<Users>(cachedUsers);

  function onClickLogin() {
    setIsLogged(true);
    localStorage.setItem("email", inputEmail);
    const newUser = {
      counter: users[inputEmail]?.counter ? users[inputEmail].counter + 1 : 1,
      lastAccess: new Date().toLocaleString(),
    };
    const newUsers = { ...users, [inputEmail]: newUser };
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  }

  function onClickLogout() {
    setInputEmail("");
    setIsLogged(false);
    localStorage.removeItem("email");
  }

  function onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    setInputEmail(event.target.value);
  }

  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        {isLogged ? (
          <Welcome onClickLogout={onClickLogout} lastAccess={users[inputEmail]?.lastAccess || ""} />
        ) : (
          <LoginForm email={inputEmail} onClickLogin={onClickLogin} onChange={onChangeEmail} />
        )}
      </Suspense>
    </section>
  );
}