import {React,useState,useEffect} from "react";

export function RecipeSuggestions(){
    const [recipes,setRecipes]=useState([]);
    const [query,setQuery]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    // Debounce function
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };

    async function fetchRecipes(searchQuery) {
      if (!searchQuery.trim()) {
        setError("Please enter a search query.");
        setRecipes([]);
        return;
      }
      setLoading(true);
      setError("");
      try {
        // IMPORTANT: Replace with your actual API key or move to .env
        const apiKey = 'f1f0bf522cb64891bcfe777bd2486cdf';
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&number=9&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Could not fetch recipes. Status: " + response.status);
        }
        const data = await response.json();
        setRecipes(data.results);
        if (data.results.length === 0) {
          setError("No recipes found for your query. Try different keywords.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching recipes.");
        setRecipes([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    // Debounced version of fetchRecipes
    const debouncedFetchRecipes = debounce(fetchRecipes, 500);

    useEffect(() => {
      if (query.trim() !== "") {
        //  Optional: trigger search on query change after debounce,
        //  or rely solely on form submission.
        //  debouncedFetchRecipes(query);
      } else {
        setRecipes([]); // Clear recipes if query is cleared
        setError("");
      }
    }, [query]); // Removed debouncedFetchRecipes from dependencies to avoid re-creating it

    const handleInputChange = (event) => {
      setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      fetchRecipes(query); // Use non-debounced for explicit submit
    };

    return(
      <div className="component-container">
        <h2 className="component-title">Recipe Suggestions</h2>

        <div className="form-container mb-4">
          <form onSubmit={handleSubmit} className="search-input-container">
            <div className="form-group">
              <label htmlFor="recipeSearchQuery" className="sr-only">Search Recipes</label> {/* sr-only for accessibility if label is visually hidden */}
              <input
                id="recipeSearchQuery"
                type="text"
                value={query}
                placeholder="Enter ingredients or recipe name..."
                onChange={handleInputChange}
                aria-label="Search Recipes"
              />
            </div>
            <button type="submit" className="button mt-2" disabled={loading}>
              {loading ? "Searching..." : "Find Recipes"}
            </button>
          </form>
        </div>

        {error && (
          <div className="message message-error mb-3">
            {error}
          </div>
        )}

        {loading && <p className="text-center mt-4 text-muted">Loading recipes...</p>}

        {!loading && recipes.length === 0 && !error && query === "" && (
          <p className="text-center mt-4 info-box">Enter a query to find recipe suggestions.</p>
        )}

        {!loading && recipes.length === 0 && !error && query !== "" && (
          <p className="text-center mt-4 info-box">No recipes found. Try different keywords.</p>
        )}

        {!loading && recipes.length > 0 && (
          <div className="recipe-card-list mt-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-card-content">
                  <h3>{recipe.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: recipe.summary ? recipe.summary.slice(0, 150) + (recipe.summary.length > 150 ? '...' : '') : 'No summary available.' }} />
                  <a 
                    href={recipe.sourceUrl || recipe.spoonacularSourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="button button-secondary mt-auto"
                  >
                    View Recipe
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
}