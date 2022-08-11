import { useState } from "react";


function getType(value) {
  switch (typeof value) {
    case "number":
      return "number";
    case "boolean":
      return "checkbox";
    case "string":
      return "text";
    case "object":
      return "object";
    default:
      return "text";
  }
}

//return new form
const changeForm = (path, form, newValue) => {
  if (path.indexOf(".") === -1) {
    // if(newValue === 'on' && typeof(form[path] === 'boolean')){
    //     form[path] = Boolean(newValue);
    // }else{
        form[path] = newValue;
    // }
    return form;
  } else {
    const newPath = path.split(".");
    // debugger;
    form[newPath[0]] = changeForm(
      path.slice(path.indexOf(".") + 1),
      form[newPath[0]],
      newValue
    );
  }
//   debugger;
  return form;
};

export const Form = ({ initialForm }) => {
  const [myForm, setForm] = useState(initialForm);


  const createFields = (form, levelPath = "") => {
    let jsx = [];
    let keys = Object.keys(form);
    for (let i = 0; i < keys.length; i++) {
      let path = levelPath;
      if (path.length === 0) {
        path += keys[i];
      } else {
        path += `.${keys[i]}`;
      }
      let type = getType(form[keys[i]]);
      if (type === "object") {
        jsx = jsx.concat(createFields(form[keys[i]], path));
      } else if (type === "checkbox") {
        jsx = jsx.concat(
          <div key={keys[i]}>
            <p>{path}</p>
            <input
              type={type}
              checked={form[keys[i]]}
              onChange={(e) => {
                //   debugger;
                // console.log('value', e.target.checked);
                let newFormData = changeForm(path, myForm, e.target.checked);
                // console.log("newFormData", newFormData);
                setForm({...newFormData});
                
              }}
            ></input>
          </div>
        );
      } else {
        jsx = jsx.concat(
          <div key={keys[i]}>
            <p>{path}</p>
            <input
              type={type}
              value={form[keys[i]]}
              onChange={(e) => {
                //   debugger;
                let newValue = e.target.value;
                if(type === 'number'){
                    newValue = +newValue
                }
                let newFormData = changeForm(path, myForm, newValue);
                //   debugger;
                setForm({...newFormData});
              }}
            ></input>
          </div>
        );
      }
    }
    return jsx;
  };


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log( myForm);
      }}
    >
      {createFields(myForm)}
      <input type={"submit"}></input>
    </form>
  );
};
