import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ConnectionContext from '../Connection/Connection';
import $ from "jquery";

export default function StatusOfReceived () {
    const { account, contract } = useContext(ConnectionContext);
    const [contractdata,setcontractdata]=useState([]);
    useEffect(()=>{
        let table=$("#statusofreceivedadst").DataTable();
        const fetchdata = async () => {
            try {
                const data = await contract.methods.getallhashes(localStorage.getItem("rolename"),1).call();

               let findata=[];
               for(let i=0;i<data.length;i++){
                let temp=await contract.methods.getallreceivedrole(localStorage.getItem("rolename"),data[i]).call();
                findata.push(temp);
               }
               console.log(findata[0]);
               table.clear();
               for(let i=0;i<findata.length;i++){
                table.row.add([findata[i].hash,findata[i].from,findata[i].origin,Object.values(findata[i].products).join(","),Object.values(findata[i].quantities).join(","),findata[i].endtime,findata[i].status]);
               }
               table.draw();
                setcontractdata(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchdata();
    },[]);
    return (
        <>

        <Navbar/>
        <h1>Status Of Received</h1>

            <table id="statusofreceivedadst" className="table tablereqforsupply">
                <thead>
                    <tr>
                        <th>Hash</th>
                        <th>From</th>
                        <th>Origin</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>End time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </>
    );
}


