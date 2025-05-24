import {useState,useEffect} from 'react';

export function FoodWasteTracking(){
  const [discardedItems,setDiscardedItems]=useState([]);
  const [newItemName,setNewItemName]=useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemDate, setNewItemDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(()=>{
    const savedItems=JSON.parse(localStorage.getItem('wasteFood')) || [];
    if(savedItems){
      setDiscardedItems(savedItems);
    }
  },[]);

  function handleNewItemNameChange(event){
    setNewItemName(event.target.value);
  }
  function handleNewItemQuantityChange(event) {
    setNewItemQuantity(event.target.value);
  }
  function handleNewItemDateChange(event) {
    setNewItemDate(event.target.value);
  }
  function addNewItem(){
    setError("");
    setSuccessMessage("");
    if (!newItemName.trim()) {
      setError("Item name cannot be empty.");
      return;
    }
    if (!newItemQuantity.trim()) {
      setError("Quantity cannot be empty.");
      return;
    }
    if (!newItemDate) {
      setError("Date cannot be empty.");
      return;
    }
    const newItemObject = {
      id: Date.now(),
      name: newItemName,
      quantity: newItemQuantity,
      date: newItemDate
    };
    const updatedItems = [...discardedItems, newItemObject];
    setDiscardedItems(updatedItems);
    localStorage.setItem('wasteFood',JSON.stringify(updatedItems));
    setNewItemName("");
    setNewItemQuantity("");
    setNewItemDate(new Date().toISOString().split('T')[0]);
    setSuccessMessage("Item logged successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  }
  function deleteItem(idToDelete){
    const updatedItems = discardedItems.filter((item) => item.id !== idToDelete);
    setDiscardedItems(updatedItems);
    localStorage.setItem('wasteFood',JSON.stringify(updatedItems));
    setSuccessMessage("Item deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  const tips = {
    Storage: [
      "Properly store fruits and vegetables to extend freshness (e.g., use crisper drawers, separate ethylene producers).",
      "Keep track of expiration and best-by dates. Use older items first (FIFO - First In, First Out).",
      "Use airtight containers for leftovers and dry goods to prevent spoilage and maintain quality.",
      "Freeze items like bread, meat, or even some produce before they spoil if you can't use them in time."
    ],
    Shopping: [
      "Plan your meals for the week and create a detailed shopping list based on your plan.",
      "Check your fridge, freezer, and pantry before shopping to avoid buying duplicates.",
      "Buy loose produce instead of pre-packaged when possible, so you only buy what you need.",
      "Be wary of bulk deals unless you're sure you can use everything before it spoils."
    ],
    Cooking: [
      "Get creative with leftovers – transform them into new meals like soups, salads, or frittatas.",
      "Cook appropriate portion sizes to avoid excessive leftovers.",
      "Utilize all parts of ingredients (e.g., use vegetable scraps for stock, broccoli stems in stir-fries).",
      "Understand date labels: 'Best By' and 'Sell By' are often quality indicators, not safety deadlines."
    ],
    Awareness: [
      "Conduct a regular 'fridge audit' to see what needs to be used up soon.",
      "Share excess food with neighbors, friends, or consider donating to local food banks (if permissible).",
      "Compost fruit and vegetable scraps if you have the facility, turning waste into nutrient-rich soil.",
      "Learn about preserving food through methods like pickling, canning, or dehydrating."
    ]
  };

  return (
    <div className="component-container">
      <h2 className="component-title">Food Waste Tracking & Tips</h2>

      {error && <div className="message message-error mb-2">{error}</div>}
      {successMessage && <div className="message message-success mb-2">{successMessage}</div>}

      <section className="mb-3">
        <h3 className="component-title" style={{fontSize: '1.5em', borderBottom: 'none', marginBottom: '15px'}}>Log Discarded Item</h3>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="wasteItemName">Item Name</label>
            <input
              id="wasteItemName"
              type="text"
              placeholder="E.g., Bread, Apples"
              value={newItemName}
              onChange={handleNewItemNameChange}
              aria-label="Waste Item Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="wasteItemQuantity">Quantity</label>
            <input
              id="wasteItemQuantity"
              type="text"
              placeholder="E.g., 2 slices, 1 bag"
              value={newItemQuantity}
              onChange={handleNewItemQuantityChange}
              aria-label="Waste Item Quantity"
            />
          </div>
          <div className="form-group">
            <label htmlFor="wasteItemDate">Date Discarded</label>
            <input
              id="wasteItemDate"
              type="date"
              value={newItemDate}
              onChange={handleNewItemDateChange}
              aria-label="Date Discarded"
            />
          </div>
          <button onClick={addNewItem} className="button">
            Add Item
          </button>
        </div>
      </section>

      {discardedItems.length > 0 && (
        <section className="mb-3">
          <h3 className="component-title" style={{fontSize: '1.5em', borderBottom: 'none', marginBottom: '15px'}}>Your Discarded Items</h3>
          <div className="table-responsive">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Date Discarded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {discardedItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.date}</td>
                    <td>
                      <button onClick={() => deleteItem(item.id)} className="button button-danger button-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="tips-section">
        <h3 className="component-title" style={{fontSize: '1.5em', borderBottom: 'none', marginBottom: '20px'}}>Waste Reduction Tips</h3>
        {Object.entries(tips).map(([category, categoryTips]) => (
          <div key={category} className="info-box mb-2">
            <h4 style={{marginTop: 0, marginBottom: '10px', color: '#61dafb'}}>{category}</h4>
            <ul style={{paddingLeft: '20px', margin: 0}}>
              {categoryTips.map((tip, index) => (
                <li key={index} style={{marginBottom: '5px'}}>{tip}</li>
        ))}
      </ul>
          </div>
        ))}
      </section>
    </div>
  )
}