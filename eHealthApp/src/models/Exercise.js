import Activity from "./Activity";

class Exercise extends Activity {
  constructor(type, steps, caloriesBurnt, startTime, endTime, distance) {
    super(type);
    console.log(
      `got here: ${type} ${steps} ${caloriesBurnt} ${startTime} ${endTime} ${distance}`
    );
    this.steps = steps;
    this.caloriesBurnt = caloriesBurnt;
    this.startTime = startTime;
    this.endTime = endTime;
    this.distance = distance;
  }
}

export default Exercise;
