import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ConnectionContext from '../Connection/Connection';
import $ from "jquery";

export default function ReceivedRequests() {
    const { account, contract } = useContext(ConnectionContext);
    const [contractdata, setcontractdata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await contract.methods.getallhashes(localStorage.getItem("rolename"), 1).call();
                let findata = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = await contract.methods.getallreceivedrole(localStorage.getItem("rolename"), data[i]).call();
                    findata.push(temp);
                }
                console.log(findata[0]);

                const table = $("#statusofreceivedadst").DataTable();
                table.clear();
                for (let i = 0; i < findata.length; i++) {
                   if(findata[i].status=="pending"){
                    table.row.add([findata[i].hash, findata[i].from, findata[i].origin, 
                        Object.values(findata[i].products).join(","), 
                        Object.values(findata[i].quantities).join(","), 
                        findata[i].endtime, 
                        '<button class="btn btn-success accept-btn">accept</button>',
                        '<button class="btn btn-danger decline-btn">decline</button>']);
                   }
                }
                table.draw();
                setcontractdata(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();

        // Using event delegation
        $("#statusofreceivedadst").on('click', '.accept-btn', async function () {
            console.log('Accept button clicked');
            const row = $(this).closest('tr');
            const rowdata = $("#statusofreceivedadst").DataTable().row(row).data();
            console.log('Row data:', rowdata);

            let status = "accepted by " + localStorage.getItem("rolename");
            let pattern1 = new RegExp('^D\\d+ADST\\d+$');
            let pattern2 = new RegExp('^DIVISION\\d+$');
            if (pattern1.test(rowdata[2])) {
                try {
                    console.log("hello");
                    let data = await contract.methods.adstaccept(
                        localStorage.getItem("rolename"),
                        rowdata[0],
                        rowdata[2],
                        rowdata[1],
                        true,
                        status
                    ).send({ from: account });
                    console.log('Accept response:', data);
                } catch (err) {
                    console.log(err);
                }
            }
            else{
                try {
                    let data = await contract.methods.adstaccept(
                        localStorage.getItem("rolename"),
                        rowdata[0],
                        rowdata[2],
                        rowdata[1],
                        false,
                        status
                    ).send({ from: account });
                    console.log('Accept response:', data);
                } catch (err) {
                    console.log(err);
                }
            }
        });

        $("#statusofreceivedadst").on('click', '.decline-btn', async function () {
            let row=$(this).closest('tr');
            let rowdata=$('#statusofreceivedadst').DataTable().row(row).data();
             try{
                let data=await contract.methods.adstdecline(rowdata[0],rowdata[2],localStorage.getItem("rolename"),rowdata[1]).send({from:account});
             }
             catch(err){
                console.log(err);
             }
        });

        return () => {
            // Clean up event handlers on component unmount
            $("#statusofreceivedadst").off('click', '.accept-btn');
            $("#statusofreceivedadst").off('click', '.decline-btn');
        };
    }, [contractdata, contract, account]);

    return (
        <>
            <Navbar />
            <h1>Received Requests</h1>
            <table id="statusofreceivedadst" className="table tablereqforsupply">
                <thead>
                    <tr>
                        <th>Hash</th>
                        <th>From</th>
                        <th>Origin</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>End time</th>
                        <th>Accept</th>
                        <th>Decline</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </>
    );
}
