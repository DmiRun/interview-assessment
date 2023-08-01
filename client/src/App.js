import './App.css';
import React from "react";
import RepoTable from './components/RepoTable';
import FormWithSingleField from './components/FormWithSingleField';
import FormWithTwoFields from './components/FromWithTwoFields';

function App() {  
    const [tableContent, setTableContent] = React.useState(null);
    const GetByNameHandler = (formData) => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}?name=${formData}`, {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
            setTableContent(data ? data : "Cannot get such element");
        });
    }

    const GetByIDHandler = (formData) => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}?id=${formData}`, {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
            setTableContent(data ? data : "Cannot get such element");
        });
    }

    const GetAllHandler = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}`, {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
            setTableContent(data);
        });
    }
    
    const SetSurveyInterval = (formData) => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}?minutes=${formData.firstInput}&startDate=${formData.secondInput}`, {
            method: "PUT",
        });
    }

    const ForceUpdateHandler = (formData) => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}?startDate=${formData}`, {
            method: "PUT",
        })
        .then((res) => console.log(res));
    }

    const ClearHandler = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}`, {
            method: "DELETE",
        })
        .then(
            setTableContent({repositories: [{
                message: "Database is clear",
                whatToDo: "Try use buttons above!"
            }]})
        );
    }

    React.useEffect(GetAllHandler, []);

    return (
    <div className="App">
        <main>
            <div className="control-panel-ui">
                <div className="control-panel-element-ui">
                    <button className="form-input-ui" onClick={GetAllHandler}>Show all repositories</button>
                </div>
                <FormWithSingleField label="Enter repo name" inputType="text" submitValue="Get by name" handler={GetByNameHandler}/>
                <FormWithSingleField label="Enter repo ID" inputType="text" submitValue="Get by ID" handler={GetByIDHandler}/>
                <p> </p>
                <FormWithTwoFields label="Enter interval in minutes and start date" inputType="number" secondInputType="date" submitValue="Update every X minutes" handler={SetSurveyInterval}/>
                <FormWithSingleField label="Choose date to start searching from" inputType="date" submitValue="Update database now" handler={ForceUpdateHandler}/>
                <div className="control-panel-element-ui">
                    <button className="form-input-ui" onClick={ClearHandler}>Clear database</button>
                </div>
            </div>
            {!tableContent ? "Loading..." : <RepoTable table={tableContent.repositories} />}
        </main>
    </div>
  );
}

export default App;
