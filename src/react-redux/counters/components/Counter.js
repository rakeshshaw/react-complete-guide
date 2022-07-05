/*
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
*/

/**
 * The above Counter Functional component using useSelectror and useDispatch hooks instead of connect()
 */

import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  // Alternate to mapStateToProps and connect()
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p></p>
      <div className="ui container">
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          decrement
        </button>
        Count : <span>{count}</span>
      </div>
    </div>
  );
};

export default Counter;
