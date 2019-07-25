window.onload = function() {
  class Hello extends React.Component {
    render() {
      return React.createElement("div", null, `Hello ${this.props.toWhat}`);
    }
  }



  console.info("Hello", React.createElement(Hello, { toWhat: "World" }, null));



  ReactDOM.render(
    React.createElement(Hello, { toWhat: "World" }, null),
    document.getElementById("root")
  );
};
