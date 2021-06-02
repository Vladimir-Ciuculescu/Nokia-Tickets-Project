import React, {useState, useEffect} from 'react';
import './MainPage.css';
import axios from 'axios';
import Posts from '../../components/Posts/Posts'
import Pagination from '../../components/Pagination/Pagination';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import ContentEditable from 'react-contenteditable'



const MainPage = () => {

    var Tickets = [];
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [input, setInput] = useState("DADADA");


    useEffect(() => {
       
        const fetchTickets = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost/NOKIA-entire-project/php/team4/afiseaza_incidente.php');
            setPosts(response.data);
            setLoading(false);
        }

        fetchTickets();
    }, []);

    
    const changeData = (e) =>{

        var payload = new FormData();
        //payload.append('Data', e);
        payload.append('initial', input);
        axios.post('http://localhost/NOKIA-entire-project/php/team4/modifica_incident.php', payload).then(
            res => {
                console.log(res);
            }
        )
    }
    
    

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost * postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
    return (
        
        <div className = "main-page">
            <text>TICKETS</text>

             <table id = "customers">
                <tr>
                    <th >Incident number</th>
                    <th >Status</th>
                    <th >Submit date</th>
                    <th >Priority</th>
                    <th>Respond date</th>
                    <th>Incident last modified date</th>
                    <th>Assigned group</th>
                    <th>Cat tier</th>
                    <th>Product cat tier</th>
                    <th>Resolution category</th>
                    <th>ID</th>
                </tr>

                 {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <tr>
                        <td>
                            <ContentEditable
                                onFocus={(e) => { setInput(e.target.innerText)}}
                                onBlur={(e) => changeData(e.target.innerText)}
                            html = {item.INCIDENT_NUMBER}></ContentEditable>
                        </td>
                        <td>{item.STATUS}</td>
                        <td>{item.SUBMIT_DATE}</td>
                        <td>{item.PRIORITY}</td>
                        <td>{item.RESPONDED_DATE ? item.RESPONDED_DATE : "NULL"}</td>
                        <td>{item.INCIDENT_LAST_MODIFIED_DATE}</td>
                        <td>{item.ASSIGNED_GROUP ? item.ASSIGNED_GROUP : "NULL"}</td>
                        <td>{item.CAT_TIER_1}</td>
                        <td>{item.PRODUCT_CAT_TIER_1 ? item.PRODUCT_CAT_TIER_1 : "NULL"}</td>
                        <td>{item.RESOLUTION_CATEGORY ? item.RESOLUTION_CATEGORY : "NULL"}</td>
                        <td>{item.ID}</td>
                        
                   </tr>
        )
        })}
            </table>

            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length}></Pagination>
            
            <text>{input}</text>
            
            
        
            
        </div>
    )

}

export default MainPage;