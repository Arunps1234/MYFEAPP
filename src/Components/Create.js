import React, {useState} from 'react'
import "./Create.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Create = () =>{
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState("")

    const naviagte = useNavigate()

    const data = {
        firstname,
        lastname,
        email,
        phone,
        gender
    }

    const submitCreate = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:5080/API/User/create",data ).then(res=>{
            console.log(res)
            alert("User Created Successfully!")
            naviagte("/home")
        }).catch(err=>{
            alert(err.response.data.msg)
            naviagte("/home")
        })
    }
    return(
        <div style={{width:"50%"}} className='createform'>
<form className='form-group' onSubmit={submitCreate}>

<div>
    <label className='form-label'>FirstName</label>
    <input type="text" className='form-control' value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
</div>


<div>
    <label className='form-label'>Lastname</label>
    <input type="text" className='form-control' value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
</div>


<div>
    <label className='form-label'>Email</label>
    <input type="text" className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>
</div>

<div>
    <label className='form-label'>Phone</label>
    <input type="text" className='form-control' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
</div>

<div>
    <label className='form-label'>Gender :</label> &nbsp;
    <label>
        <input type="radio" name="gender" value="Male" checked={gender=="Male" } onChange={(e)=>setGender("Male")}/> Male
    </label>
&nbsp;
    <label>
        <input type="radio" name="gender" Value="Female" checked={gender=="Female" } onChange={(e)=>setGender("Female")}/> Female
    </label>
</div>



<div>
    <button className='btn btn-success' style={{width:"100%"}}>Crete</button>
</div>

</form>
        </div>
    )
}

export default Create