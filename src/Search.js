import React from "react";
import MediaQuery from "react-responsive";
import config from "./config.js";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "london",
      radius: 5,
      propertyType: "house",
      bedrooms: 2,
      output: [],
      window: window.innerWidth
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
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
      "&results_per_page=12&category=for-sale&where=" +
      this.state.location +
      "&distance=" +
      this.state.radius +
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
        console.log("fetch successful");
      })
      .then(data => {
        console.log(data.results);
        this.setState({
          output: data.results
        });
      })
      .catch(err => {
        console.log("fetch unsuccessful");
      });
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { output, width } = this.state;
    const isDesktop = width >= 751;
    return (
      <div>
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
            name="propertyType"
            value={this.state.propertyType}
            onChange={this.handleChange}
          >
            <option value="house" defaultValue>
              House
            </option>
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

        <div className="properties-container">
          {output.map(property => (
            <div className="property" key={property.id}>
              <h5 className="property-title">
                {property.location.display_name}
              </h5>
              <img
                className="property-image"
                src={property.image_url}
                alt="property image"
              />
              <div className="property-info">
                <p className="property-price">£{property.sale_price}</p>
                <p className="property-bio">{property.title}</p>
                <MediaQuery minWidth={1040}>
                  {matches => {
                    return matches ? (
                      <p className="property-desc">{property.description}</p>
                    ) : null;
                  }}
                </MediaQuery>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
