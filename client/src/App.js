import logo from './logo.svg';
import './App.css';
import React from "react";
import RepoTable from './components/RepoTable';

function App(props) {  
    const [tableContent, setTableContent] = React.useState(null);

    React.useEffect(() => {
        fetch("http://localhost:3001/api/repositories?name=MetaGPT", {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
            setTableContent(data);
        });
    }, []);
    return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {props.children}
            {!tableContent ? "Loading..." : <RepoTable table={tableContent.repositories} />}
            
        </header>
    </div>
  );
}

export default App;
