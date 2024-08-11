import React  from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
export default function Home(){
    const navigate=useNavigate();
    function statusofreceived(){
        navigate("/DIVISION/StatusOfReceived");
    }

    function receivedreq(){
        navigate('/DIVISION/ReceivedRequests');
    }
    function statusofsend(){
        navigate("/DDST/StatusOfSend");
    }
    function requestforsupplies(){
        navigate("/DDST/RequestForSupplies");
    }
    function pendingrequests(){
        navigate("/DDST/PendingRequestsSend")
    }
    return (
        <>
        <Navbar/>
        <div className="container homedgst-cont">

<button  onClick={requestforsupplies} className="btn btn-dark ">Request for supplies</button>


<button onClick={statusofsend} className="btn btn-dark ">Status Of Send Request</button>
<button onClick={receivedreq} className="btn btn-dark">Received Requests</button>
<button onClick={statusofreceived} className="btn btn-dark ">Status Of Received Requests</button>

 <button onClick={pendingrequests} className="btn btn-dark">Pending Requests Send</button>
</div>
        </>
    );
}