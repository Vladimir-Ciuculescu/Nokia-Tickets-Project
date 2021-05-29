import React, {useState, useEffect} from 'react';
import './MainPage.css';
import axios from 'axios';
import Posts from '../../components/Posts/Posts'
import Pagination from '../../components/Pagination/Pagination';

const MainPage = () => {

    var Tickets = [];
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);


    useEffect(() => {
        /*
        axios.get('http://localhost/NOKIA-entire-project/php/team4/afiseaza_notificare.php')
          .then( response =>{
            console.log(response);
            this.setState({row:response.data});
          })
          .catch(function (error) {
          console.log(error);
          })
          .then(function () {

          });
          */

        const fetchTickets = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost/NOKIA-entire-project/php/team4/afiseaza_incidente.php');
            setPosts(response.data);
            setLoading(false);
        }

        fetchTickets();
    }, []);

   

    const renderPosts = (props) =>{
        return (props.map(item => {
            <li>{}</li>
        }))
    }

    console.log(posts);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost * postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const Items = posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
        return (
            <li>{item.STATUS}</li>
        )
    })

    
    
    
    return (
        <div className = "main-page">
            <text>TICKETS</text>


            
           

            <table id = "customers" className = "table">
                <tr>
                    <th style = {{width:"130px"}}>Incident number</th>
                    <th style = {{width:"40px"}}>Status</th>
                    <th style = {{width:"170px"}}>Submit date</th>
                    <th style = {{width:"60px"}}>Priority</th>
                    <th style = {{width:"175px"}}>Respond date</th>
                    <th>Incident last modified date</th>
                    <th>Assigned group</th>
                    <th>Cat tier</th>
                    <th>Product cat tier</th>
                    <th>Resolution category</th>
                    <th>ID</th>
                </tr>
            </table>
            <table className="table table2">

            

             { /*Here we render the incident number*/ }
                <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style = {{background:"crimson",width:"130px"}}>{item.INCIDENT_NUMBER}</td>
                    
        )
        })}
                </tr>
                { /*Here we render the status*/ }
                <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style={{ background: "pink",width:"49px"}}>{item.STATUS}</td>
        )
        })}
                </tr>
                { /*Here we render the submit date*/ }
                 <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style = {{background:"green",width:"170px"}}>{item.SUBMIT_DATE}</td>
        )
        })}
                </tr>
                { /*Here we render the priority*/ }
                 <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style = {{background:"blue",width:"60px"}}>{item.PRIORITY}</td>
        )
        })}
                </tr>
                { /*Here we render the respond date*/ }
                 <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style = {{background:"red"}}>{item.RESPONDED_DATE ? item.RESPONDED_DATE : "NULL"}</td>
        )
        })}
                </tr>
                { /*Here we render the incident last modified date*/ }
                 <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style = {{background:"grey",width:"203px"}}>{item.INCIDENT_LAST_MODIFIED_DATE}</td>
        )
        })}
                </tr>
                { /*Here we render the assigned group*/}
                 <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style = {{background:"violet"}}>{item.ASSIGNED_GROUP ? item.ASSIGNED_GROUP : "NULL"}</td>
        )
        })}
                </tr>
                { /*Here we render the cat tier 1*/}
                 <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style = {{background:"orange"}}>{item.CAT_TIER_1}</td>
        )
        })}
                </tr>
                { /*Here we render the product cat tier 1*/}
                 <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style = {{background:"wheat"}}>{item.PRODUCT_CAT_TIER_1 ? item.PRODUCT_CAT_TIER_1 : "NULL"}</td>
        )
        })}
                </tr>
                 { /*Here we render the resolution category*/}
                 <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td style = {{background:"lime"}}>{item.RESOLUTION_CATEGORY ? item.RESOLUTION_CATEGORY : "NULL"}</td>
        )
        })}
                </tr>
                 { /*Here we render the ID*/}
                 <tr>
                      {posts.slice(((localStorage.getItem("currentPage") * 10) - 9),localStorage.getItem("currentPage") * 10).map(item => {
                return (
            
                    <td>{item.ID}</td>
        )
        })}
                </tr>
                
               
                </table>
          

            <Pagination  postsPerPage = {postsPerPage} totalPosts = {posts.length}></Pagination>
            
        </div>
    )

}

export default MainPage;