import "./App.css";
import Greeting from "./Components/Greeting/Greeting";
import NotificationList from "./Components/NotificationList/NotificationList";
import Statistics from "./Components/Statistics/Statistics";
import Timeline from "./Components/Timeline/Timeline";
import Timer from "./Components/Timer/Timer";

function App() {
  return (
    <div className="App">
      <Greeting />
      <Timeline />
      {/* Stats Viewer */}
      <Statistics />
      {/* Animated List add to top */}
      <NotificationList />
      {/* Timer */}
      <Timer />
    </div>
  );
}

export default App;
