import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";

const ResetAll = ({ onResetAll }) => {
  return (
    <button className="btn btn-danger" onClick={() => onResetAll()}>
      resetAll
    </button>
  );
};

const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light">
      <div className="navbar-brand">{totalCounters} items</div>
    </nav>
  );
};

class Counters extends React.Component {
  getBadgeClasses = (counter) => {
    let classes = "badge m-2 badge-";
    classes += counter.value === 0 ? "warning" : "primary";
    return classes;
  };

  formatCount = (counter) => {
    return counter.value === 0 ? "Zero" : counter.value;
  };

  render() {
    const {
      counters,
      onIncrement,
      onDecrement,
      onDelete,
      onReset
    } = this.props;

    return (
      <div>
        {counters.map((counter) => (
          <div className="row">
            <span className={this.getBadgeClasses(counter)}>
              {this.formatCount(counter)}
            </span>

            <button
              onClick={() => onIncrement(counter)}
              className="btn btn-secondary m-2"
            >
              Inc
            </button>
            <button
              onClick={() => onDecrement(counter)}
              className="btn btn-info m-2"
            >
              Dec
            </button>
            <button
              onClick={() => onDelete(counter.id)}
              className="btn btn-danger m-2"
            >
              Del
            </button>
            <button
              onClick={() => onReset(counter)}
              className="btn btn-primary m-2"
            >
              Res
            </button>
          </div>
        ))}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  handleResetAll = () => {
    const copycounter = [...this.state.counters];
    copycounter.map((item) => (item.value = 0));

    this.setState({
      counters: copycounter
    });
  };

  handeIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index].value++;

    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index].value--;

    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);

    this.setState({ counters });
  };
  handleReset = (counterId) => {
    const counters = [...this.state.counters];
    const counterInd = counters.indexOf(counterId);
    counters[counterInd].value = 0;
    this.setState({ counters: counters });
  };

  render() {
    return (
      <div className="main__wrap">
        <div className="container">
          <div className="card__box">
            <ResetAll onResetAll={this.handleResetAll} />
            <NavBar
              totalCounters={
                this.state.counters.filter((c) => c.value > 0).length
              }
            />

            <Counters
              counters={this.state.counters}
              onIncrement={this.handeIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
              onReset={this.handleReset}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
