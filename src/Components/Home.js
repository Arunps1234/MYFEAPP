import React, { useState, useEffect } from 'react'
import axios from "axios"
import Male from "./Assets/Male.png"
import Female from  "./Assets/Female.png"
import { Link , useNavigate} from 'react-router-dom'


const Home = () => {
    const [users, setUsers] = useState([])
    const [deletemessage, setDeletemessage] = useState(false)
    const [searchvalue, setSearch] = useState("")
    useEffect(() => {
        axios.get("http://localhost:5080/API/User/getUsers").then(res => {
            setUsers(res.data)
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
    
    return (
        <>
<div>
    <Link to="/create" className='btn btn-primary' style={{float:"right"}}>Create User</Link>
</div>

<div style={{float:"right", marginRight:"5px"}}>
    <button className='btn btn-danger' onClick={logout}>Logout</button>
</div>

<div style={{float:"right", marginRight:"5px"}}>
<input type="search" value={searchvalue} onChange={(e)=>setSearch(e.target.value)} /></div>

           
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
                        { users.length > 0 ? 
                            users.map((user, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.gender}</td>
                                    <td >

                                        {
                                            user.gender =="Male" ? 
                                            <img src={Male} style={{width:"80px", height:"80px"}}/>
                                            : 
                                            <img src={Female} style={{width:"80px", height:"80px"}}/>
                                        }
                                    </td>
                                    <td style={{display:"flex"}}>
                                        <button className='btn btn-warning' style={{ width: "100px" }} onClick={()=>editUser(user._id)}>Edit</button> &nbsp;
                                        <button className='btn btn-danger' style={{ width: "100px" }} onClick={() => deleteUser(user._id, user.firstname)}> Delete</button>

                                    </td>



                                </tr>
                            )) : <div >No User found</div>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home