import logo from "./logo.svg";
import "./App.css";

import axios from "axios";
import { useEffect } from "react";

axios.interceptors.request.use(
  function (config) {
    config.headers.Accept = "application/json";
    config.headers.NS = "test";
    config.headers.DB = "test";
    config.headers.Authorization =
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NzM5NDEwMDAsIm5iZiI6MTY3Mzk0MTAwMCwiZXhwIjoxNjc0MDI3NDAwLCJpc3MiOiJTdXJyZWFsREIiLCJOUyI6InRlc3QiLCJEQiI6InRlc3QiLCJTQyI6ImFjY291bnQiLCJJRCI6InVzZXI6cmxueHhremJ6YmcyNnNua3dpbnAifQ.O8Z0MVvjbO05fg7DKnNIAOMQjWXAUpkK0RtzG2fForzQswB0w0Ycxq9MmqrTHB-kD6LKJA24tir7TjVRVrQNlw";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function App() {
  useEffect(() => {
    console.log("====");
    axios
      .post("http://152.136.153.160:8000/sql", "select * from project;")
      .then((r) => {
        console.log(r.data[0]);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
