import { connect } from "react-redux";
import { decrement, increment } from "../actions";

const Counter = ({ count, increment, decrement }) => {
  return (
    <div>
      <p></p>
      <div className="ui container">
        <button onClick={()=>increment(count)}>Increment</button>
        <button onClick={()=>decrement(count)}>decrement</button>
        Count : <span>{count}</span>
        
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { count: state.count };
};

export default connect(mapStateToProps, {increment, decrement})(Counter);
