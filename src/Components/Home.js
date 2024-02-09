import React, { useState, useEffect } from 'react'
import axios from "axios"
import Male from "./Assets/Male.png"
import Female from  "./Assets/Female.png"
import { Link , useNavigate} from 'react-router-dom'


const Home = () => {
    const [users, setUsers] = useState([])
    const [deletemessage, setDeletemessage] = useState(false)
    const [searchvalue, setSearch] = useState("")

    const [finalUser, setFinalUser] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5080/API/User/getUsers").then(res => {
            setUsers(res.data)
            console.log(users)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const deleteUser = (id, name) => {

        if (window.confirm(`Are you sure you want to delete ${name}`)){
        axios.delete(`http://localhost:5080/API/User/delete/${id}`).then(res => {
            setDeletemessage(res.data.msg)
            setTimeout(() => {
                setDeletemessage(false);
                window.location.reload()
            }, 2000)
        }).catch(err => {
            console.log(err)
        })
    }
    else {

    }
    }

const navigate = useNavigate()

    const logout = () =>{

        if (window.confirm("Are you sure you sant to logout?")) {

        axios.post("http://localhost:5080/API/Auth/logout").then(res=>{
            console.log(res);
            navigate("/login")
        }).catch(err=>{
            console.log(err)
        })
    }
    else {
        
    }

    }

    const editUser = (id) =>{
        navigate(`/edit/${id}`)

        
    }


    const filterUser = users.filter(user=>user.firstname.toLowerCase().includes(searchvalue))
    console.log(filterUser)
    
    return (
        <>
<div>
    <Link to="/create" className='btn btn-primary' style={{float:"right"}}>Create User</Link>
</div>

<div style={{float:"right", marginRight:"5px"}}>
    <button className='btn btn-danger' onClick={logout}>Logout</button>
</div>

<div style={{float:"right", marginRight:"5px"}}>
<input type="search" value={searchvalue} onChange={(e)=>setSearch(e.target.value)}  placeholder ="Search user..." style={{borderRadius:"10px", }}/></div>

           
            <div style={{ margin: "50px" }}>
                <table className="table"  >
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Profile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody>
{
                    users.filter(user=>user.firstname.toLowerCase().includes(searchvalue)).  map((val,i)=>(
                        <tr>
                            <td>{i+1}</td>
                            <td>{val.firstname}</td>
                            <td>{val.lastname}</td>
                            <td>{val.email}</td>
                            <td>{val.phone}</td>
                            <td>{val.gender}</td>
                            <td>{val.gender =="Male" ? <img src={Male}  style={{width:"70px", height : "70px"}}/> : <img src={Female}   style={{width:"70px", height : "70px"}}/>} </td>
<td>
    <button className='btn btn-warning' onClick={()=>editUser(val._id)} style={{width:"70px"}} >Edit</button> &nbsp;
    <button className='btn btn-danger' onClick={()=>deleteUser(val._id, val.firstname)} style={{width:"70px"}}>Delete</button>
</td>

                        </tr>
                    )) 
}      
                       </tbody>
                </table>
            </div>
        </>
    )
}

export default Home