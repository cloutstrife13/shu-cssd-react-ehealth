/**
 * Class to represent different Activities in the system
 * The activity can be logging a blood preasure measurement, logging the weight
 * As well as, logging a fitness activity (exercise)
 * Activity is a top level class from which other classes inhertits
 * The properties of Activity class are:
 * @param {ENUMERATOR} Type - Type of activity
 * @param {String} Timestamp - Time of submission of the activity
 */

const ACTIVITY_TYPE = Object.freeze({
  WALKING: "walking",
  RUNNING: "running",
  CYCLING: "cycling",
  BLOOD_PREASURE: "blood_preasure",
  WEIGHT: "weight"
});

class Activity {
  constructor(type) {
    this.type = this.validateType(type) ? type : "unknown";
    this.timestamp = new Date().toISOString();
  }

  validateType(type) {
    return Object.values(ACTIVITY_TYPE).indexOf(type) > -1 ? true : false;
  }
}

export default Activity;
