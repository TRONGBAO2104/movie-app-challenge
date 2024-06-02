import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Router from "./routes";
import 'bootstrap-icons/font/bootstrap-icons.css';
export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
