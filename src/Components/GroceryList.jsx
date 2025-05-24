import { useState, useEffect } from 'react';

export function GroceryList() {
  const [grocery, setGrocery] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('groceryList')) || [];
    setGrocery(savedItems);
  }, []);

  function saveItemname(event) {
    setCurrentItem(event.target.value);
  }
  function storeItem() {
    if (currentItem.trim() === "") {
      setError("Item can not be empty");
      return;
    }
    if (expirationDate === "") {
      setError("Expiration date can not be empty");
      return;
    }
    const newGroceryItem = { name: currentItem, expirationDate: expirationDate, id: Date.now() };
    const groceries = [...grocery, newGroceryItem];
    setGrocery(groceries);
    localStorage.setItem('groceryList', JSON.stringify(groceries));
    setCurrentItem("");
    setExpirationDate("");
    setError("");
  }
  function deleteItem(idToDelete) {
    const groceries = grocery.filter((item) => item.id !== idToDelete);
    setGrocery(groceries);
    localStorage.setItem('groceryList', JSON.stringify(groceries));
  }

  return (
    <div className="component-container">
      <h2 className="component-title">Grocery List</h2>

      {error && (
        <div className="message message-error mb-3">
          {error}
        </div>
      )}

      <div className="form-container mb-4">
        <div className="form-group">
          <label htmlFor="groceryItemName">Item Name</label>
          <input
            id="groceryItemName"
            type="text"
            placeholder='Enter Grocery Item'
            value={currentItem}
            onChange={saveItemname}
            aria-label="Grocery Item Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="groceryExpirationDate">Expiration Date</label>
          <input
            id="groceryExpirationDate"
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            aria-label="Expiration Date"
          />
        </div>
        <button onClick={storeItem} className="button mt-2">
          Add Item
        </button>
      </div>

      {grocery.length > 0 ? (
        <ul className="item-list">
          {grocery.map((item) => (
            <li key={item.id} className="list-item">
              <div className="list-item-header">
                <span className="list-item-title">{item.name}</span>
                <button onClick={() => deleteItem(item.id)} className="button button-danger button-sm">
                  Delete
                </button>
              </div>
              <p>Expires: {item.expirationDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center mt-4 text-muted">Your grocery list is empty. Add items above!</p>
      )}
    </div>
  );
}


