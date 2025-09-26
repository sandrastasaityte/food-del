import React, { useState, useEffect } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const List = () => {
  const url = "http://localhost:4000"
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      console.log(response.data)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error("Error fetching list")
      }
    } catch (error) {
      toast.error("Server error")
      console.error(error)
    }
  }
  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id: foodId});
    await fetchList();
    if (response.data.success) {
        toast.success(response.data.message)
    }
    else{
        toast.error("Error");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className="list add flex-col">
      <h2>Food List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={item.image ? `${url}/images/${item.image}` : assets.upload_area} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)} className="cursor">x</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default List
