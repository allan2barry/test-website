import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      selectValue: "",
      recipeData: [{
        title: "Tomato Soup",
        items: ["Tomatoes", "Onion", "Carrot", "Celery", "Tomato Purée", "Sugar", "Vegetable Stock"],
      }, {
        title: "Sticky Toffee Pudding",
        items: ["Baking Soda", "Black Treacle", "Butter", "Double Cream", "Eggs", "Flour", "Golden Syrup", "Muscovado Sugar", "Supervalu Goodness Pitted Dates", "Supervalu Whipped Cream", "Water"],
      }, {
        title: "Bloody Mary",
        items: ["Ice", "Vodka", "Tomato Juice", "Lemon Juice", "Lemon", "Worcestershire Sauce", "Tabasco", "Celery Salt", "Black Pepper", "Celery Sticks"],
      }],
      basket: [],
      possibleRecipes: [],
    }
  }

  componentDidMount(){
    this.addOptions();
  }

  handleChange = (e) => { 
    this.setState({
      selectValue: e.target.value,
    });
  }
  
  addItem = () => {
    if(this.state.selectValue !== ""){
      this.setState({
        basket: [...this.state.basket, this.state.selectValue]
      }, this.checkRecipe)
    }
  }

  checkRecipe = () => {
    var i;
    var j = 0;
    var tempItems = [];
    var tempRecipes = [];

    for(i=0; i < this.state.recipeData[j].items.length; i++) {
        if(this.state.basket.indexOf(this.state.recipeData[j].items[i]) === -1){
          if(tempItems.indexOf(this.state.recipeData[j].items[i]) === -1){
            tempItems.push(this.state.recipeData[j].items[i])
          }
        }
        if(i === (this.state.recipeData[j].items.length - 1)){
          if(tempItems.length <= 3){
            if(tempItems.length > 0){
              tempRecipes.push({title: this.state.recipeData[j].title, items: tempItems});
            } else {
              tempRecipes.push({title: this.state.recipeData[j].title, items: ["Recipe Complete"]});
            }
          }
          tempItems = [];
          if(j < (this.state.recipeData.length -1)){
            j++;
            i=0;
          }
        }
    };

    this.setState({
      possibleRecipes: tempRecipes
    }, this.renderRecipes);
  }

  addOptions = () => {
    var i;
    var j=0;
    for(i=0; i < this.state.recipeData[j].items.length; i++) {
      var opt_element = document.createElement("option");
      opt_element.appendChild(document.createTextNode(this.state.recipeData[j].items[i]));
      document.getElementById("values").appendChild(opt_element);    
      if(i === (this.state.recipeData[j].items.length - 1)){
        if(j < (this.state.recipeData.length -1)){
          j++;
          i=0;
        }
      }
    };
  }

  renderRecipes = () => {
    document.getElementById("missingIngredients").innerHTML = "";
    if(this.state.possibleRecipes.length !== 0){
      var i;
      var j=0;
      var ingredients = document.createElement("ul");
      ingredients.setAttribute("id", "Recipe");
      for(i=0; i < this.state.possibleRecipes[j].items.length; i++) {
        var ingredient = document.createElement("li");
        ingredient.appendChild(document.createTextNode(this.state.possibleRecipes[j].items[i]))
        ingredients.appendChild(ingredient);

        if(this.state.possibleRecipes[j].items[i] !== "Recipe Complete"){
          var basketAdd = document.createElement("button");
          basketAdd.appendChild(document.createTextNode("Add item"));
          basketAdd.setAttribute("id", "addToBasket");
          basketAdd.setAttribute("class", "ml-1 btn-success");
          basketAdd.addEventListener('click', this.addFromRecipe);
          basketAdd.setAttribute("value", this.state.possibleRecipes[j].items[i])
          ingredient.appendChild(basketAdd);
        }

        if(i === (this.state.possibleRecipes[j].items.length - 1)){
          document.getElementById("missingIngredients").appendChild(document.createElement("p").appendChild(document.createTextNode(this.state.possibleRecipes[j].title)))
          document.getElementById("missingIngredients").appendChild(ingredients);
          if(j < (this.state.possibleRecipes.length -1)){
            ingredients = document.createElement("ul");
            ingredients.setAttribute("id", "Recipe");
            j++;
            i=0;
          }
        }
      };
    } else {
      document.getElementById("missingIngredients").innerHTML = "You're not close to finishing any recipes.";
    }
  }

  addFromRecipe = (e) => {
    if(e.target.value !== ""){
      this.setState({
        basket: [...this.state.basket, e.target.value]
      }, this.checkRecipe)
    }
    this.renderRecipes();
  }

  render() {
    return (
      <div id="my-grid">
        <div className="text-center" id="grid1">
          <button className="ml-1 mt-1 btn btn-success" onClick={this.addItem}>Add Item</button>
          <select className="mt-1" id="values" value={this.state.selectValue} onChange={this.handleChange}>
              <option value="">Pick your basket...</option>
          </select>
        </div>
        <div id="grid2">
          <p className="text-center">ITEMS TO COMPLETE RECIPES:</p>
          <div id="missingIngredients">
            You're not close to finishing any recipes.
            {/** recipe lists go here */}
          </div>
        </div>
        <div id="grid3">
          <p className="text-center">Basket:</p>
          <ul>
            {this.state.basket.map(function(object, i){
              return <li key={i}>{object}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
