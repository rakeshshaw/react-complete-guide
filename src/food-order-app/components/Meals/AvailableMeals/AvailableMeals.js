import DUMMY_MEALS from "../../../apis/dummy/dummy-meals";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {
  return (
    <>
      <section className={classes.meals}>
        <Card>
          <ul>
            {DUMMY_MEALS.map((mealItem) => (
              <MealItem
                key={mealItem.id}
                id={mealItem.id}
                name={mealItem.name}
                price={mealItem.price}
              />
            ))}
          </ul>
        </Card>
      </section>
    </>
  );
};

export default AvailableMeals;
