import React, { useEffect, useState } from "react"; //always import React
import "./App.css"; //how to import CSS globally


function App () {
  const [names, setNames] = useState({
    namesArray: [],
    namesComponent: [],
    name:"",
    luckyName: "",
  });

  useEffect(() => {
    setNames((prevState) => {
      let newNames = {...prevState};
      newNames.namesComponent = newNames.namesArray.map(mapNames)
      return newNames;
    })
  }, [names.namesArray.length]);

  const mapNames = (aName, index) => {
    return(
      <li key={index}>{aName}</li>
    )
  };

  const onAddNameToHatClicked = () => {
    let nameToAdd = names.name;
    let updatedArray = names.namesArray;
    updatedArray.push(nameToAdd); 

    setNames(prevState => {
      let newNames = {...prevState}
      newNames.namesArray = updatedArray;
      newNames.name = "";

      return newNames;
    })
  }

  const handleKeyDown = event => {
    if(event.key === "Enter") {
      onAddNameToHatClicked()
    }
  };

  const onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setNames(prevState => {
      const updatedFormData = {
        ...prevState
      };
      updatedFormData[name] = value;
      return updatedFormData;
    })
  };

  const onRemoveNamesClicked = (e) => {
    e.preventDefault();
    setNames(prevState => {
      let clearNames = {...prevState};
      clearNames.name = "";
      clearNames.luckyName = "";
      clearNames.namesArray = [];
      return clearNames;
    })
  }

  const onLuckyNameClicked = (e) => {
    e.preventDefault();
    let luckyOne = names.namesArray[Math.floor(Math.random()*names.namesArray.length)];
    console.log("the luckyOne is:", luckyOne);

    setNames(prevState => {
      let newNames = {...prevState};
      newNames.name = "";
      newNames.luckyName = luckyOne;

      return newNames;
    })
    ;
}

    return (
      <div className="App">
        <header className="App-header">
          <div>
            <img src="https://tinyurl.com/bd858vbb" alt="..."></img>
          </div>
          <div className="mb-3">
            <input onChange={onChange}
              onKeyDown={handleKeyDown}
              type="text" 
              className="form-control" 
              id="nameField" 
              name="name" 
              placeholder="Enter name here"
              value={names.name}/>
            <button 
              onClick={onAddNameToHatClicked} 
              type="button">Add Name to Hat
            </button>
          </div>
          <div>
            <button onClick={onLuckyNameClicked}>Choose a lucky name</button>
            <button onClick={onRemoveNamesClicked}>Remove All Names</button>
          </div>
          {names.luckyName && (<h3>You pulled out: {names.luckyName}!</h3>)}
          <ul>
            {names.namesComponent}
          </ul>
        </header>
      </div>
    );
  }

export default App;
