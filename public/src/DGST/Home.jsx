import React from "react";
import Navbar from "../Navbar";
import "./Home.css"
import {  useNavigate } from "react-router-dom";

export default function Home(){
  const navigate=useNavigate();

  function AddDivisionsorUni(){
    navigate("/DGST/AddDiviOrUni");
  }
  function sendReq(){
    navigate("")
  }

  function receivedreq(){
    navigate("/DGST/ReceivedReq");
  }
  function statusofreceived(){
    navigate("/DGST/StatusOfReceived");
  }

    return (
        <>
          <Navbar/>


          <div className="container homedgst-cont">

             
             <button onClick={receivedreq} className="btn btn-dark">Received Requests</button>
             <button onClick={statusofreceived} className="btn btn-dark ">Status Of Received Requests</button>

             <button onClick={AddDivisionsorUni} className="btn btn-dark">Add Divisions or Units</button>

          </div>
        </>
    )
}