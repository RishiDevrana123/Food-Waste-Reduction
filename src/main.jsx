import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './index.css'
import {GroceryList} from './Components/GroceryList.jsx';
import {RecipeSuggestions} from './Components/RecipeSuggestions.jsx';
import {FoodWasteTracking} from './Components/FoodWasteTracking.jsx';

function Header(){
    return (
        <nav className="main-nav">
            <ul className="nav-list">
                <li className="nav-item"><Link to="/" className="nav-link">Grocery List</Link></li>
                <li className="nav-item"><Link to="/recipesuggestions" className="nav-link">Recipe Suggestions</Link></li>
                <li className="nav-item"><Link to="/foodwastetracking" className="nav-link">Food Waste Tracking</Link></li>
            </ul>
        </nav>
    )
}

const router=createBrowserRouter([
    {
        path:"/",
        element:
        <div>
            <Header/>
            <GroceryList/>
        </div>
    },{
        path:"/foodwastetracking",
        element:
        <div>
            <Header/>
            <FoodWasteTracking/>
        </div>
    },{
        path:"/recipesuggestions",
        element:
        <div>
            <Header/>
            <RecipeSuggestions/>
        </div>
    }
])

function App(){
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
);
