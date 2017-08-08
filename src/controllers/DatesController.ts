import Image from "../model/Image";
import BaseController from "./BaseController";

interface Year {
  months: Month[];
  count: number;
  year: number;
}

interface Month {
  days: Day[];
  count: number;
  month: number;
}

interface Day {
  day: number;
  count: number;
}

export default class DatesController extends BaseController {
  public index() {
    return new Image().query((qb) => {
      qb.select("images.year", "images.month", "images.day");

      qb.count("images.day AS count");

      qb.groupBy("images.year", "images.month", "images.day");

      qb.orderBy("images.year", "DESC");
      qb.orderBy("images.month", "DESC");
      qb.orderBy("images.day", "DESC");
    }).fetchAll().then(((result) => {
      if (result.length === 0) {
        return [];
      }

      const years = [];

      let currentYear: Year;
      let currentMonth: Month;

      result.forEach((date) => {
        if (date.get("month") !== currentMonth.month) {
          if (currentMonth.month) {
            currentYear.months.push(currentMonth);
          }

          currentMonth = {
            count: 0,
            days: [],
            month: date.get("month")
          };
        }

        if (date.get("year") !== currentYear.year) {
          if (currentYear.year) {
            years.push(currentYear);
          }

          currentYear = {
            count: 0,
            months: [],
            year: date.get("year")
          };
        }

        currentYear.count += date.get("count");
        currentMonth.count += date.get("count");

        currentMonth.days.push({
          count: date.get("count"),
          day: date.get("day")
        });
      });

      currentYear.months.push(currentMonth);
      years.push(currentYear);

      return years;
    }));
  }
}
