const express = require("express");
const fs = require("fs");
const app = express();
const cmd = require("node-cmd");

const mainFunc = (imp, comp) => {
  const str = (() =>
    `import logo from "./logo.svg";import "./App.css";function App(){return(<div className="App"><header className="App-header"><img src={logo}className="App-logo" alt="logo"/><p>Edit<code>src/App.js</code>and save to reload.</p><a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer">Learn React</a>${comp}</header></div>)}
    export default App;`.split(";"))();

  const res = str
    .reduce((a, c, i) => {
      if (i === 1) {
        a = a.concat(imp);
      }
      a = a.concat(c);
      return a;
    }, [])
    .join(";");
  return res;
};

app.get("/", (req, res) => {
  const mainFile = mainFunc(`import { Button } from "./Button";`, `<Button />`);
  const buttonFile = `import React from 'react';export const Button=()=>{return(<div>Search</div>)}`;
  fs.writeFile("../sample/src/App.js", mainFile, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

  fs.writeFile("../sample/src/Button.js", buttonFile, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  cmd.run(
    `cd .. && cd ./sample && npm run format`,
    function (err, data, stderr) {
      console.log(
        "examples dir now contains the example file along with : ",
        data,
        err
      );
    }
  );
  res.send("Done");
});

app.listen(3000, () => console.log("Server listening at port 3000"));
