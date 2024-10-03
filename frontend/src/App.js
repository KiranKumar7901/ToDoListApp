import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState('');

  // function to add Item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
      });
      console.log(res);
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (error) {
      console.log(error);
    }
  };

  // function to fetch item using useEffect hook
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/item");
        setListItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemsList();
  }, []);

  // function to delete item
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // function to update item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}}>
      <input type="text" className="update-new-input" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText}/>
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  )

  const updateItem = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`,{item: updateItemText});
      setUpdateItemText('');
      setIsUpdating('');
      console.log(res.data);
      const updateItemIndex = listItems.findIndex(item => item._id === isUpdating);
      // eslint-disable-next-line
      const updatedItem = listItems[updateItemIndex].item = updateItemText
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>ToDo List App</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add ToDo Items"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item">
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
