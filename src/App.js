import "./App.css";
import Greeting from "./Components/Greeting/Greeting";
import NotificationList from "./Components/NotificationList/NotificationList";
import Statistics from "./Components/Statistics/Statistics";
import Timeline from "./Components/Timeline/Timeline";
import Timer from "./Components/Timer/Timer";
import { useDashboard } from "./useDashboard";

function App() {
  const {
    dateMap,
    setDateMap,
    setMapLoading,
    mapLoading,
    setSelectedRange,
    selectedRange,
    selectedDate,
    setSelectedDate,
  } = useDashboard();
  console.log("ListscrollingDebug:In App Function", mapLoading);
  return (
    <div className="App">
      <Greeting />
      <Timeline
        dateMap={dateMap}
        setDateMap={setDateMap}
        setMapLoading={setMapLoading}
        mapLoading={mapLoading}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {/* Stats Viewer */}
      <Statistics
        dateMap={dateMap}
        setDateMap={setDateMap}
        setMapLoading={setMapLoading}
        mapLoading={mapLoading}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {/* Animated List add to top */}
      <NotificationList />
      {/* Timer */}
      <Timer />
    </div>
  );
}

export default App;
