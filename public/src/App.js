import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";

import Login from './Pages/Login';
import "react-toastify/dist/ReactToastify.css";
import Home from './DGST/Home';
import Home1 from "./ADST/Home"
import AddDivOrUnits from './DGST/AddDivOrUnits';
import RequestForSupplies from './ADST/RequestForSupplies';
import StatusOfSendAdst from "./ADST/StatusOfsend";
import ReceivedReqDiv from "./DDST/ReceivedRequests";
import StatusOfreceiveddiv from "./DDST/StatusOfReceived";
import StatusOfReceivedAdst from "./ADST/StatusOfReceived";
import ReceivedReqAdst from "./ADST/ReceivedRequests";
import StatusOfReceivedDgst from './DGST/StatusOfReceived';
import ReceivedReqDgst from "./DGST/ReceivedReq"
import StatusOfSendDdst from "./DDST/StatusOfsend";
import Home2 from "./DDST/Home";
import ReuestForSuppliesDdst from "./DDST/RequestForsupplies";
import PendingRequestsSend from "./DDST/PendingRequestsSend";
export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route  path='/DGST' element={<Home/>}/>

      <Route exact path='/DIVISION' element={<Home2/>}/>
      
      <Route  path='/DGST/AddDiviOrUni' element={<AddDivOrUnits/>}/>
      <Route exact path='/ADST' element={<Home1/>}/>
      <Route exact path="/ADST/RequestForSupplies" element={<RequestForSupplies/>}/>
      <Route exact path="/ADST/StatusOfSend" element={<StatusOfSendAdst/>}/>
      <Route exact path="/DIVISION/StatusOfReceived" element={<StatusOfreceiveddiv/>}/>
      <Route exact path="/DIVISION/ReceivedRequests" element={<ReceivedReqDiv/>}/>
      
      <Route exact path="/ADST/StatusOfReceived" element={<StatusOfReceivedAdst/>}/>
      <Route exact path="/ADST/ReceivedReq" element={<ReceivedReqAdst/>}/>
     
      <Route exact path="/DGST/ReceivedReq" element={<ReceivedReqDgst/>}/>
      <Route exact path="/DGST/StatusOfReceived" element={<StatusOfReceivedDgst/>}/>
      
      <Route exact path="/DDST/StatusOfSend" element={<StatusOfSendDdst/>}/>
      <Route exact path="/DDST/RequestForSupplies" element={<ReuestForSuppliesDdst/>}/>
      
      <Route exact path="/DDST/PendingRequestsSend" element={<PendingRequestsSend/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}
