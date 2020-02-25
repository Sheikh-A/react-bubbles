// Stage 2 - Consuming the API
// Step 2 - In `ColorList.js`, complete the `saveEdit` and `deleteColor` functions to make AJAX requests to the API to edit/delete data

// HTTP/Axios Stretch Problems
// Build a form at the bottom of `ColorList.js` to add new colors to the colors data
import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [sparkly, setSparkly] = useState(initialColor);
  const history = useHistory()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setColorToEdit(initialColor)
        window.location.reload(false)
      })
      .catch(error => {
        console.log("API Data Not Pulling In", error);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res);
        window.location.reload(false);
      })
      .catch(err => console.log(err));
  };

  const addBubble = e => {
    e.preventDefault();
    setSparkly({ ...sparkly });
    axiosWithAuth()
      .post("/colors", sparkly)
      .then(res => {
        setSparkly(initialColor);
        window.location.reload(false);
      })
      .catch(err => console.log("No bubbles, sorry", err));
  };

  const handleDelete = () => {
    return (
      localStorage.removeItem("token"),
      history.push("/")
    )
  }

  return (
    <div>
    <button onClick={handleDelete}>Log Out</button>
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      </div>
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addBubble}>
        <legen>Add Bubble</legen>
        <label>
          Color Name:
          <input
            onChange={e => 
              setSparkly({
                ...sparkly,
                color: e.target.value
              })
            }
            value={sparkly.color}
          />
        </label>
        <label>
          Hex Code:
          <input
            type="color"
            onChange={e =>
              setSparkly({
                ...sparkly,
                code: { hex: e.target.value },
              })}
              value={sparkly.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">Add Bubble</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
