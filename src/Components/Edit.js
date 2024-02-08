import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

const Edit = () =>{

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState("")
    const {id} = useParams()

    const data = {
        firstname,
        lastname,
        email,
        phone,
        gender
    }

    const submitEdit = (e) =>{
        e.preventDefault()
console.log(data)
    }

    useEffect(()=>{
axios.get(`http://localhost:5080/API/User/getUser/${id}`).then(res=>{
    console.log(res)
    setFirstname(res.data.firstname)
    setLastname(res.data.lastname)
    setEmail(res.data.email)
    setPhone(res.data.phone)
    setGender(res.data.gender)

}).catch(err=>{
    console.log(err)
})
    },[])

    return(
        <div>



<div style={{width:"50%"}} className='createform'>
<form className='form-group' onSubmit={submitEdit}>

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
    <button className='btn btn-success' style={{width:"100%"}}>Update</button>
</div>

</form>
        </div>


        </div>
    )
}

export default Edit