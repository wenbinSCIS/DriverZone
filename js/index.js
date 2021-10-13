import Calendar from "color-calendar";
import "../css/theme-glass.css";


let calA = new Calendar({
  id: "#calendar-a",
  theme: "glass",
  // border: "5px solid black",
  weekdayType: "long-upper",
  monthDisplayType: "long",
  // headerColor: "yellow",
  // headerBackgroundColor: "black",
  calendarSize: "small",
  layoutModifiers: ["month-left-align"],
  eventsData: [
    {
      id: 1,
      name: "French class",
      start: "2020-12-17T06:00:00",
      end: "2020-12-18T20:30:00"
    },
    {
      id: 2,
      name: "Blockchain 101",
      start: "2020-12-20T10:00:00",
      end: "2020-12-20T11:30:00"
    },
    {
      id: 3,
      name: "Cheese 101",
      start: "2020-12-01T10:00:00",
      end: "2020-12-02T11:30:00"
    },
    {
      id: 4,
      name: "Cheese 101",
      start: "2020-12-01T10:00:00",
      end: "2020-12-02T11:30:00"
    }
  ],
  dateChanged: (currentDate, events) => {
    console.log("date change", currentDate, events);
  },
  monthChanged: (currentDate, events) => {
    console.log("month change", currentDate, events);
  }
});