import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Form } from './Form';

var form = {
  "DATALOADER": {
    "ASPECT_RATIO_GROUPING": true,
    "FILTER_EMPTY_ANNOTATIONS": true,
    "NUM_WORKERS": 2,
    "REPEAT_THRESHOLD": 0.0,
    "SAMPLER_TRAIN": "TrainingSampler",
    "INPUT": {
      "CROP": {
        "ENABLED": false,
        // "SIZE": [
        //     0.1,
        //     0.9
        // ],
        "TYPE": "relative_range"
      }
    }
  }
}


function getType(value) {
  switch (typeof (value)) {
    case 'number':
      return "number";
    case 'boolean':
      return "checkbox"
    case 'string':
      return "text";
    case 'object':
      return 'object'
    default:
      return "text"
  }
  
}

function createFlatArray(arr, formValue, name = "",) {
  // {name: "asd/ads", type: "number"}
  let fields = [];
  let keys = Object.keys(arr);
  console.log(keys)
  for (let i = 0; i < keys.length; i++) {
    let type = getType(arr[keys[i]]);
    if (type === 'object') {
      // debugger;
      let innerFields = createFlatArray(arr[keys[i]], formValue, name + "." + keys[i])

      fields = fields.concat(innerFields)
    } else {
      fields = fields.concat({
        "type": type, "name": name + "." + keys[i], onChange: (setFormValue, change, originalForm) => {
          // formValue[keys[i]] = value;
          //change the parent form
          let keyPath = `${name}.${keys[i]}`.slice(1).split('.')
          // let value
          for (let i = 0; i < keyPath.length; i++) {
            originalForm[keyPath[i]] = change;
          }
          debugger;
          setFormValue(originalForm)
        }
      });
    }
  }
  console.log("internal fields", fields);
  return fields;
}

function App() {

  // const [formValue, setFormValue] = useState({ ...form.DATALOADER });
  // let fields = createFlatArray(form.DATALOADER, formValue);



  return (
    <div className="App">
      <Form initialForm={form}></Form>
      {/* <form>
        {fields.map((input) => {
          return (<div key={input.name}>
            <p>{input.name}</p>
            <input type={input.type} value={""} onChange={(e) => {
              input.onChange(setFormValue, e.target.value, formValue)
            }}></input>
          </div>)
        })}
      </form> */}
    </div>
  );
}

export default App;
