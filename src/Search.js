import React from "react";
import config from "./config.js";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      radius: "",
      propertyType: "",
      bedrooms: "",
      output: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const url =
      "https://api.adzuna.com:443/v1/api/property/gb/search/1?app_id=" +
      config.api_Id +
      "&app_key=" +
      config.api_Key +
      "&results_per_page=10&category=for-sale&where=" +
      this.state.location +
      "&distance=" +
      this.state.radius;
    "&property_type=" +
      this.state.propertyType +
      "&beds=" +
      this.state.bedrooms;
    let header = {
      mode: "no-cors"
    };
    fetch(url, { header })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.results);
        let searchResults = data.results;
        let propertyListing = searchResults.map(property => {
          return (
            <div className="property" key={property.id}>
              £{property.sale_price}
            </div>
          );
        });
        this.setState({
          output: propertyListing
        });
      });
  }

  render() {
    return (
      <div>
        Search form
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input"
            name="location"
            value={this.state.location}
            placeholder="Enter a location"
            onChange={this.handleChange}
          />
          <input
            type="number"
            className="input"
            name="radius"
            value={this.state.radius}
            placeholder="Radius(km)"
            onChange={this.handleChange}
          />
          <select
            className="input"
            name="property-type"
            value={this.state.propertyType}
            onChange={this.handleChange}
          >
            <option value="house">House</option>
            <option value="flat">Flat</option>
            <option value="flat_maisonette">Maisonette</option>
          </select>
          <input
            type="number"
            className="input"
            name="bedrooms"
            value={this.state.bedrooms}
            placeholder="No. of bedrooms"
            onChange={this.handleChange}
          />
          <button type="submit" className="input">
            Search
          </button>
        </form>
        <div>{this.state.output}</div>
      </div>
    );
  }
}

export default Search;
