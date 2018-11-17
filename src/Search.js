import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      radius: "",
      propertyType: "",
      bedrooms: ""
    };
    this.handleChange = this.handleChange.bind(this);
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
  }

  render() {
    return (
      <div>
        Search form
        <form className="search-form">
          <input
            type="text"
            className="input"
            name="location"
            value={this.state.location}
            placeholder="Enter a location"
          />
          <input
            type="number"
            className="input"
            name="radius"
            value={this.state.radius}
            placeholder="Radius(km)"
          />
          <select
            className="input"
            name="property-type"
            value={this.state.propertyType}
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
          />
          <button type="submit" className="input">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
