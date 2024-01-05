import React from "react";

class Canteen extends React.Component {
  constructor() {
    super();
    var itms = {
      Samosa: 30,
      "Veg.Puffs": 20,
      Juice: 40,
      Tea: 15,
      Coffee: 15,
      Biscuits: 10,
      "Egg.puffs": 40,
      cake: 50,
      momos: 100,
      burger: 40,
      pizza: 200,
    };
    this.state = {
      allitems: itms,
      currentitem: Object.keys(itms)[0],
      cartitems: {}, // Initialize cartitems as an empty object
      isPopupVisible: false,
    };
  }

  togglePopup = () => {
    this.setState((prevState) => ({
      isPopupVisible: !prevState.isPopupVisible,
    }));
  };
  addtocart = () => {
    var selected = this.state.currentitem;
    var citems = { ...this.state.cartitems };
    if (Object.keys(citems).indexOf(selected) >= 0) citems[selected]++;
    else citems[selected] = 1;
    this.setState({ cartitems: citems });
  };
  updateitem = (evt) => {
    this.setState({ currentitem: evt.target.value });
  };

  removefromcart = (sitem) => {
    var x = { ...this.state.cartitems }; // Copy the cartitems object before modifying it
    if (x[sitem] > 1) x[sitem]--;
    else delete x[sitem];
    this.setState({ cartitems: x });
  };

  calculateTotal = () => {
    const { allitems, cartitems } = this.state;
    let total = 0;
    for (const item in cartitems) {
      total += cartitems[item] * allitems[item];
    }
    return total;
  };

  applyDiscount = () => {
    const totalAmount = this.calculateTotal();
    const discountThreshold = 1000;
    const discountPercentage = 15;
    let dis = 0;
    if (totalAmount >= discountThreshold) {
      const discountedAmount = totalAmount * (1 - discountPercentage / 100);
      dis = discountedAmount;
      return dis;
    } else {
      dis = totalAmount;
    }
    return dis;
  };

  render() {
    return (
      <div className="canteen">
        <button className="discount-badge" onClick={this.togglePopup}>
          <small> Discount %</small>
        </button>

        {this.state.isPopupVisible && (
          <div className="popup-overlay">
            <div className="popup-content">
              <span className="popup-close-button" onClick={this.togglePopup}>
                &times;
              </span>
              <h2>SPECIAL OFFER</h2>
              <p>Buy Above 1000 Get 15 % Offer.</p>
            </div>
          </div>
        )}

        <header>
          <h1>VNB Canteen</h1>
        </header>
        <hr />
        <div className="topbox">
          <select
            value={this.state.currentitem}
            onChange={this.updateitem}
            className="select"
          >
            {Object.keys(this.state.allitems).map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <button className="btns" onClick={this.addtocart}>
            Add to cart
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Items</th>
                <th>quantity</th>
                <th>price</th>
                <th>remove</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.cartitems).map((x, index) => (
                <tr key={index}>
                  <td> {x} </td>
                  <td>{this.state.cartitems[x]}</td>
                  <td>{this.state.allitems[x]}</td>
                  <td>
                    <button onClick={() => this.removefromcart(x)}>-</button>
                  </td>
                  <td>{this.state.allitems[x] * this.state.cartitems[x]}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" name="total">
                  SUBTOTAL: {this.calculateTotal()}
                </td>
              </tr>
              <tr>
                <td>Total Discount Amount is: {this.applyDiscount()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <hr />
        <footer>
          <h3>welcome back again</h3>
        </footer>
      </div>
    );
  }
}

export default Canteen;
