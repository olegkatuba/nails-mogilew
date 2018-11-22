import React, { Component } from "react";
import withWidget from "../widget";

class EmailWidget extends Component {
  render() {
    return (
      <div>Some content</div>
    );
  }
}

export default withWidget({
  name: 'email',
  title: "Email Notifications",
  description: "Email Notifications"
})(EmailWidget);
