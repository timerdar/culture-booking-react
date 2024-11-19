import EventList from "./components/public/events/EventList";
import EventAdd from "./components/admin/EventAdd";
import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/events" element={<EventList/>}/>
        <Route path="/admin/events/add" element={<EventAdd/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;