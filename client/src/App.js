import logo from './logo.svg';
import './App.css';
import React from "react";

function App(props) {  
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("http://localhost:3001/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
    return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {props.children}
            {!data ? "Loading..." : data}
        </header>
    </div>
  );
}

export default App;
