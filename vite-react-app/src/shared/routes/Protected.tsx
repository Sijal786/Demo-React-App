import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../helper/isAuthenticated";
import Routes from "./Routes";

const Protected = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(Routes.Login);
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
