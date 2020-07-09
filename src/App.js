import React from 'react';
import { withRouter } from 'react-router';
import Http from './utils/Http';
import formatLink from './utils/formatLink';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      service: '',
      brand: '',
      style: '',
      serviceList: [],
      brandList: [],
      styleList: [],
    }
  }

  componentDidMount() {
    Http.get('search/terms').then(({ data }) => {
      this.setState({ serviceList: data });
    });
    Http.get('search/brands_terms').then(({ data }) => {
      this.setState({ brandList: data });
    });
    Http.get('search/styles').then(({ data }) => {
      this.setState({ styleList: data });
    });
  }

  handleChange(e) {
    const { history } = this.props;
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }, () => {
      const { service, brand, style } = this.state;
      
      const link = `${formatLink(service)}${formatLink(brand)}${formatLink(style)}`
      history.push(link)
    })
  }

render() {
    const {
      service,
      brand,
      style,
      serviceList,
      brandList,
      styleList,
    } = this.state;
    
    return (
      <div className="App">
        <div className="col">
          <p>Services</p>
          <select name="service" value={service} onChange={this.handleChange}>
            <option value="" />
            {serviceList.map(({ id, label, slug }) => <option key={id} value={slug}>{label}</option>)}
          </select>
        </div>
        <div className="col">
          <p>Brands</p>
          <select name="brand" value={brand} onChange={this.handleChange}>
            <option value="" />
            {brandList.map(({ id, label, slug }) => <option key={id} value={slug}>{label}</option>)}
          </select>
        </div>
        <div className="col">
          <p>Styles</p>
          <select name="style" value={style} onChange={this.handleChange}>
            <option value="" />
            {styleList.map(({ id, label, slug }) => <option key={id} value={slug}>{label}</option>)}
          </select>
        </div>
      </div>
    );
}

}

export default withRouter(App);
