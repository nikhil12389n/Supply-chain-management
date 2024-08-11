import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ConnectionContext from '../Connection/Connection';
import $ from "jquery";

export default function ReceivedReq() {
    const { account, contract } = useContext(ConnectionContext);
    const [contractdata,setcontractdata]=useState([]);
    useEffect(()=>{
        let table=$("#receiveddgst").DataTable();
        const fetchdata = async () => {
            try {
                const data = await contract.methods.getallhashes(localStorage.getItem("rolename"),1).call();

               let findata=[];
               for(let i=0;i<data.length;i++){
                let temp=await contract.methods.getallreceivedrole(localStorage.getItem("rolename"),data[i]).call();
                findata.push(temp);
               }
               console.log(findata);
               table.clear();
               for(let i=0;i<findata.length;i++){
                if(findata[i].status!="pending" && findata[i].status!="accepted"){
                    try{
                        let d=await contract.methods.check(findata[i].from,findata[i].hash).call();
                        if(d==true){
                            table.row.add([findata[i].hash,findata[i].from,findata[i].origin,Object.values(findata[i].products).join(","),Object.values(findata[i].quantities).join(","),findata[i].endtime,'<button class="btn btn-success accept-dgst">Accept</button>','<button class="btn btn-dark">Send to manuf</button>']);
                        }
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                else{
                    if(findata[i].status!="accepted"){
                        table.row.add([findata[i].hash,findata[i].from,findata[i].origin,Object.values(findata[i].products).join(","),Object.values(findata[i].quantities).join(","),findata[i].endtime,'<button class="btn btn-dark send-divisions">Send to divisions</button>',findata[i].status]);
                    }
                }
               }
               table.draw();
                setcontractdata(data);
            } catch (err) {
                console.log(err);
            }
        };
        $("#receiveddgst").on('click','.accept-dgst',async function() {
            let row=$(this).closest("tr");
            let rowdata=table.row(row).data();
            console.log(rowdata);

            try{
                let data=await contract.methods.dgstaccept(rowdata[0],rowdata[2],"accepted by dgst").send({from:account});
            }
            catch(err){
                console.log(err);
            }
        });

        $("#receiveddgst").on('click','.send-divisions',async function(){
            let row=$(this).closest("tr");
            let rowdata=table.row(row).data();

            //string memory from,string memory hash,string memory origin,string[] memory p,uint[] memory q,string memory endtime
            console.log(rowdata);
            const products=rowdata[3].split(",");
            console.log(products)
              const quantities=rowdata[4].split(",");
              for(let i=0;i<quantities.length;i++){
                  quantities[i]=parseInt(quantities[i],10);
              }
            try{
                let data=await contract.methods.dgstsentodivisions(rowdata[1],rowdata[0],rowdata[2],products,quantities,rowdata[5]).send({from:account});
            }
            catch(err){

            }
        })

        fetchdata();
    },[]);
    return (
        <>

        <Navbar/>
        <h1>Received Request</h1>

            <table id="receiveddgst" className="table tablereqforsupply">
                <thead>
                    <tr>
                        <th>Hash</th>
                        <th>From</th>
                        <th>Origin</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>End time</th>
                        <th>Function</th>
                        <th>Accept/Send to manuf</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </>
    );
}

