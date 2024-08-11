import React, { useContext, useEffect, useState } from "react";
import ConnectionContext from "../Connection/Connection";
import Navbar from "../Navbar";
import $ from "jquery";
import 'datatables.net';

export default function ReceivedRequests() {
    const { account, contract } = useContext(ConnectionContext);
    const [contractdata, setcontractdata] = useState([]);

   
    useEffect(() => {
       const table= $('#receiveddiv').DataTable();
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
                if(findata[i].status=="pending"){
                    table.row.add([findata[i].hash,findata[i].from,findata[i].origin,Object.values(findata[i].products).join(","),Object.values(findata[i].quantities).join(","),findata[i].endtime,'<button class="btn btn-dark send-button">Send to adsts</button>']);
                }
                else if(findata[i].status=="declined by adsts" && findata[i].from!="DGST"){
                    table.row.add([findata[i].hash,findata[i].from,findata[i].origin,Object.values(findata[i].products).join(","),Object.values(findata[i].quantities).join(","),findata[i].endtime,'<button class="btn btn-success send-dgst">Send to Dgst</button>']);
                }
               }
               table.draw();
                setcontractdata(data);
            } catch (err) {
                console.log(err);
            }
        };
        $('#receiveddiv').on('click','.send-dgst',async function() {

            let row=$(this).closest('tr');
            let rowdata=table.row(row).data();
            //string memory origin,string memory hash,string memory div,string[] memory p,uint[] memory q,string memory endtime
            console.log(rowdata);
            const products=rowdata[3].split(",");
          console.log(products)
            const quantities=rowdata[4].split(",");
            for(let i=0;i<quantities.length;i++){
                quantities[i]=parseInt(quantities[i],10);
            }

            try{
                let data=await contract.methods.ddstsendtodgst(rowdata[2],rowdata[0],localStorage.getItem("rolename"),products,quantities,rowdata[5]).send({from:account});
            }
            catch(err){
                console.log(err);
            }
        });
        $("#receiveddiv").on('click','.send-button',async function(){
            let row=$(this).closest('tr');
            let rowdata=table.row(row).data();
            console.log(rowdata);

            const products=rowdata[3].split(",");
          
            const quantities=rowdata[4].split(",");
            for(let i=0;i<quantities.length;i++){
                quantities[i]=parseInt(quantities[i],10);
            }
            console.log(account);
           
                try{
                    let data=await contract.methods.ddstsenttoadsts(rowdata[1],localStorage.getItem("rolename"),rowdata[2],rowdata[0],products,quantities,rowdata[5]).send({from:account});
                }
                catch(err){
                    console.log(err);
                }
            
        });

        fetchdata();
    }, [contract]); 


    useEffect(() => {
        
    }, [contractdata]); 
    return (
        <>
            <Navbar />
            <h1>Received Requests</h1>

            <table id="receiveddiv" className="table tablereqforsupply">
                <thead>
                    <tr>
                        <th>Req no</th>
                        <th>From</th>
                        <th>Origin</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>End time</th>
                        <th>Send to adsts</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </>
    );
}
