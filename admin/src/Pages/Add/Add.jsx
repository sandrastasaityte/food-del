import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets';


const Add = () => {
  return (
    <div className='add'>
        <form className="flex-col">
            <div className="add-image-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={assets.upload_area} alt="" />
                </label>
                <input type="file" id="image" hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input type="text" name='name' placeholder='Type Here' />

            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea name="description" rows="6" placeholder='Write content here' required>
                </textarea>
            </div>
            <div className="add-category price">
                <div className="add-category flex-col">
                    <p>Product catefory</p>
                    <select name="category">
                        <option value="Salad"></option>
                        <option value="Rolls"></option>
                        <option value="Deserts"></option>
                        <option value="Sandwitch"></option>
                        <option value="Cake"></option>
                        <option value="Pure Veg"></option>
                        <option value="Pasta"></option>
                        <option value="Noodles"></option>

                    </select>

                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input type="Number" name='price' placeholder='$20' />

                </div>
                <button type='Submit' className='add-btn'>Add</button>
            </div>
        </form>
      
    </div>
  )
}

export default Add
