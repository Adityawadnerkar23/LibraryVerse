import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const AddressList = () => {
  const [display, setDisplayList] = useState([]);
useEffect(() => {
  fetchData()
},[]);
const fetchData =async () =>{
  try{
  const response = await axios.get('http://localhost:5000/api/get_products')
  setDisplayList(response.data?.data);
  console.log(response.data?.data," all product data")
} catch (error) {
  console.error('Error fetching data:', error);
};
};


//////////////////////// element display tables////////////////////////////////
// let demoObj = [
//   {
//     name:"swapnil",
//     surname:'masmar',
//     data:{
//       numbers:[1,2,4,5,{ indata:"hiii",outdata:['byee','welcome']}]
//     }
//   },
//  {
//     name:"aditya",
//     surname:'wadnekar',
//     data:{
//       numbers:[5,6,4,5,{ indata:"aditya hiii",outdata:['aditya byee','aditya welcome']}]
//     }
//   }
// ]
// const names = Object.values(demoObj).map(person => person.name);
// console.log(names);
///////////////////////////////////////////////////////////////////////////////
  return (
    <>
    {/* <p>{demoObj.map((itm,indx)=>itm.name+" ")}</p>  */}
    {/* space */}
   {/* <table className="table-bordered">
    <thead>
 <tr>
  <th>Product Name  </th>
  <th>Product PRICE</th>
  <th>Product QUANTITY</th>
  <th>MANUFACTURING Date</th>
  <th>expiry date</th>
  <th>Category</th>
  </tr>   
    </thead>
    <tbody>
        {display?.map((itm,indx)=>
        <tr key={indx}>
          <td>{itm.product_name}</td>
          <td>{itm.product_price}</td>
          <td>{itm.product_quantity}</td>
          <td>{itm.manufacturing_date}</td>
          <td>{itm.expiry_date}</td>
          <td>{itm.category[0].Category_name}</td>
          </tr>
        )}
    </tbody>
   </table> */}
    </>
  );
};

export default AddressList;
