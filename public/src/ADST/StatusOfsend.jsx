import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import ConnectionContext from "../Connection/Connection";
import $ from "jquery";
import 'datatables.net';
export default function StatusOfSend() {
    const { account, contract } = useContext(ConnectionContext);
    const [contractData, setContractData] = useState([]);
    const [dataTable, setDataTable] = useState(null);
    useEffect(() => {
        const table = $('#statusofsendadst').DataTable();
        const fetchData = async () => {
            try {
                let data = await contract.methods.getallhashes(localStorage.getItem("rolename"), 0).call();
                let findata = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = await contract.methods.getalladstsrole(localStorage.getItem("rolename"), data[i]).call();
                    findata.push(temp);
                }

               
                table.clear();
                for (let i = 0; i < findata.length; i++) {
                    table.row.add([findata[i].hash, Object.values(findata[i].products).join(", "), Object.values(findata[i].quantities).join(", "), findata[i].endtime, findata[i].status]);
                }
                table.draw();
                setContractData(findata);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();

        
        
    }, [contract, dataTable]);

    return (
        <>
            <Navbar />
            <h1>Status Of Send Requests</h1>
            <table className="table tablereqforsupply" id="statusofsendadst">
                <thead>
                    <tr>
                        <th>Unique id</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>End Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </>
    );
}
