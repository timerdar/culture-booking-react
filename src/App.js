import EventList from "./components/public/events/EventList";
import SelectedEvent from "./components/public/events/SelectedEvent";
import EventAdd from "./components/admin/EventAdd";
import VisitorAdd from "./components/public/visitors/VisitorAdd";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import TicketView from "./components/public/tickets/TicketView";
import SelectSeat from "./components/public/events/SelectSeat";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/events"/>}/>
          <Route path="/events" element={<EventList/>}/>
          <Route path="/admin/events/add" element={<EventAdd/>}/>
          <Route path="/events/:id" element={<SelectedEvent/>}/>
          <Route path="/events/:id/registration/" element={<VisitorAdd/>}/>
          <Route path="/events/:id/seats" element={<SelectSeat/>}/>
          <Route path="/tickets/:uuid" element={<TicketView/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;