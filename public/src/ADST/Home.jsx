import React from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";


export default function Home(){
    const navigate=useNavigate();

    function reqforsupply(){
        navigate("/ADST/RequestForSupplies");

    }
    function statusofsend(){
        navigate("/ADST/StatusOfSend");
    }
    function statusofreceived(){
        navigate("/ADST/StatusOfReceived");
    }
    function receivedreq(){
        navigate("/ADST/ReceivedReq");
    }
    return (
        <>
          <Navbar/>
          <div className="container homedgst-cont">

             <button onClick={reqforsupply} className="btn btn-dark ">Request for supplies</button>
             

             <button onClick={statusofsend} className="btn btn-dark ">Status Of Send Request</button>
             <button onClick={receivedreq} className="btn btn-dark">Received Requests</button>
             <button onClick={statusofreceived} className="btn btn-dark ">Status Of Received Requests</button>

            
          </div>
        </>
    );
}