import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import {addProduct, deleteProduct, getRequest} from '..//actions/actions'


function ProductAdd(){

    const [creator, setCreator] = useState(false);
    const [deleteInfo, setDeleteInfo] = useState(false);
    const [name, setName] = useState('')
    const [_id, set_id] = useState('')
    const [avatar, setAvatar] = useState('')
    const [upload, setUpload] = useState({loading:false, success:false, error:false});
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [qty, setQty] = useState('')
    const [description, setDescription] = useState('')
    const {productData, loading:saveLoading, success:saveSuccess, error:saveError} = useSelector(state=>state.saveProduct)
    const {loading:deleteLoading, success:deleteSuccess, error:deleteError} = useSelector(state=>state.deleteProduct)
    const products = useSelector(state => state.products)
    const {data} = products;
    const {userInfo} = useSelector(state=>state.userData)

    const dispatch = useDispatch()
 
    let history = useHistory();

    if(!userInfo || !userInfo.isAdmin){
        history.push('/')
    }
    
    useEffect(()=>{

        if(productData){
        
        alert('Product added')}
    },[productData])

    useEffect(()=>{
       dispatch(getRequest())
       return () => {
        //
      };
    },[saveSuccess, deleteSuccess])

    function handleAdd(e){
        e.preventDefault();
        dispatch(addProduct({_id:_id, name, avatar,price, brand, category, qty, description}))
        setCreator(false)
    }

    const uploadFileHandler = async (e)=>{
        const image = e.target.files[0]
        const uploadBodyData = new FormData();
        uploadBodyData.append('image',image)
try{
    setUpload({loading:true, success:false, error:false})
        const {data} = await Axios.post('/api/uploads/', uploadBodyData,
         {headers:{Authorization:`bearer ${userInfo.token}`, 'Content-Type':'multipart/form-data'}})
        if(data){
            setUpload({loading:false, success:true, error:false})
            setAvatar(data)
        }
}
catch(error){
setUpload({error:true, success:false, loading:false})
}
    }
    function openCreator(product){
        if(_id){
            set_id('')
            setName('')
            setAvatar('')
            setPrice('')
            setBrand('')
            setCategory('')
            setQty('')
            setDescription('')

        }
        else{
        set_id(product._id)
        setName(product.name)
        setAvatar(product.avatar)
        setPrice(product.price)
        setBrand(product.brand)
        setCategory(product.category)
        setQty(product.qty)
        setDescription(product.description)}
        setCreator(true);
        

    }
    function handleDelete(deleteInfo){
        dispatch(deleteProduct(deleteInfo));
        setDeleteInfo(false);
    }

    return(
        <main className="main">
        <table className="admin__table">
            <thead>
                <tr>
                    <th>Product Id</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map(product=>{
                    return(
                        <tr>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                            <td><button disabled={deleteInfo} onClick={()=>openCreator(product)} className="admin__button admin__button-edit">Edit</button><button onClick={()=>setDeleteInfo(product)} className="admin__button admin__button-delete">Delete</button></td>
                        </tr>

                    )
                })}
            </tbody>
            <button disabled={deleteInfo}  onClick={()=>openCreator({})} className="admin__button">Create product</button>

        </table>
        {deleteInfo && <div className="delete__warning">
            <p>Are you sure you want to delete this product?</p>
            <div className="delete__warning-buttons">
            <button onClick={()=>handleDelete(deleteInfo)}>Delete product</button>
            <button onClick={()=>setDeleteInfo(false)}>Cancel</button>
            </div>
            
            </div>}

        {creator &&
        <div className="form__wrapper">
            <h1>Welcome to MyShop!</h1>
          
            <form onSubmit={handleAdd} className="form">
            <label for="name">Name: </label>
                <input required type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                <label for="avatar">Avatar: </label>
                <input required type="text" id="avatar" name="avatar" value={avatar} onChange={(e)=>setAvatar(e.target.value)}></input>
                <label for="file">Avatar file: </label>
                <input required type="file" id="file" name="file" onChange={uploadFileHandler}></input>
                <label for="price">Price: </label>
                <input required type="number" id="price" name="price" value={price} onChange={(e)=>setPrice(e.target.value)}></input>
                <label for="brand">Brand: </label>
                <input required type="text" id="brand" name="brand" value={brand} onChange={(e)=>setBrand(e.target.value)}></input>
                <label for="category">Category: </label>
                <input required type="text" id="category" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}></input>
                <label for="qty">Quantity: </label>
                <input required type="number" id="qty" name="qty" value={qty} onChange={(e)=>setQty(e.target.value)}></input>
                <label for="description">Retype description: </label>
                <textarea id="description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                
                <button type="submit">{_id ? 'Update' : 'Add'}</button>
             
                


            </form>


        </div>}
        </main>
        
    
    )
}

export default ProductAdd;