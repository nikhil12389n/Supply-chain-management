import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import $ from "jquery";
import 'datatables.net';
import ConnectContext from "../Connection/Connection";
import "./Requestforsupplies.css"
import {nanoid} from "nanoid";
export default function RequestForSupplies() {


    const {account,contract}=useContext(ConnectContext);
    const [formData, setFormData] = useState({
        product: "",
        quantity: "",
    });
    const [endTime,setEndTime]=useState("");

    const finalSubmit=async(e)=>{
        e.preventDefault();

        const data=$('#supplytable').DataTable().rows().data().toArray();

        let products=[];

        let quantities=[];
        for(let i=0;i<data.length;i++){
            products.push(data[i][0]);
            quantities.push(parseInt(data[i][1]));
        }


        let divno=0;
        let adstname=localStorage.getItem("rolename");
        for(let i=1;i<adstname.length;i++){
            if(parseInt(adstname[i],10)){
                divno=divno*10+parseInt(adstname[i],10);
            }
            else{
                break;
            }
        }
        let divname="DIVISION"+String(divno);
        try{
           
             let track=["sent from "+adstname,"sent to "+divname];

             let data2=await contract.methods.adstsend(nanoid(),adstname,divname,products,quantities,endTime).send({from:account});


             alert("Request Sent Successfully!");
             window.location.reload();
        }
        catch(err){
              console.log(err);
        }
        


       
    }

    const [modelOpen,setmodelOpen]=useState(false);
    
    const [rowCount,setrowCount]=useState(0);

    useEffect(() => {
      
        $('#supplytable').DataTable();


     const table=$('#supplytable').DataTable();
     

     table.on('draw',function(){
        setrowCount(table.rows().count());
     })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        $('#supplytable').DataTable().row.add([
            formData.product,
            formData.quantity,
        ]).draw();

       
        setFormData({
            product: "",
            quantity: "",
        });
    }

    return (
        <>
            <Navbar />

            <h1>Request For Supplies</h1>

            <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="dropdownprod">Products</label>
                    <select
                        id="dropdownprod"
                        name="product"
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    >
                        <option value="">Select a product</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Rice">Rice</option>
                        <option value="Meals">Meals</option>
                        <option value="Dal">Dal</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Quantities</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />
                </div>

                <button className="btn btn-dark" type="submit">Add another product</button>
            </form>

            <div>
                <table id="supplytable" className="table tablereqforsupply">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
            
                {
                    rowCount>0 && (
                        <button className="btn btn-dark my-3" onClick={()=>setmodelOpen(true)}>Submit</button>
                    )
                }


{modelOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Enter End Time</h2>
                        <input
                            type="datetime-local"
                            name="endtime"
                            onChange={(e)=>setEndTime(e.target.value)}
                        />
                        <button
                            className="btn btn-dark my-2"
                            onClick={finalSubmit}
                        >
                            Submit 
                        </button>
                        <button
                            className="btn btn-secondary my-2"
                            onClick={() => setmodelOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}
