import React, { Fragment } from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout,isauthenticated} from '../auth';
import Shop from './shop';
import { itemtotal } from './carthelper';
const isactive=(history,path)=>{
    if(history.location.pathname===path){
        return {
            color:'#ff9900'
        }
    }
    else{
        return {
            color:'#ffffff'
        }
    }
}
const Menu=({history})=>{
    return(
       
            <ul className="nav nav-tabs bg-primary">
            <li className="nav-items">
                <Link className="nav-link" to="/" style={isactive(history,"/")}>Home</Link>
                </li>

            
                
                {isauthenticated() && (
                    <li className="nav-items">
                    <span className="nav-link" to="/" style={{cursor:'pointer',color:'#ffffff'}} onClick={()=>signout(()=>{
                        history.push("/");
                    })} >Signout</span>
                </li>
                )}
                {!isauthenticated() && (
 <Fragment>
      <li className="nav-items">
                <Link className="nav-link" to="/signup" style={isactive(history,"/signup")} >Signup</Link>
            </li>
  
                <li className="nav-items">
                <Link className="nav-link" to="/signin" style={isactive(history,"/signin")} >Signin</Link>
            </li>
            
            </Fragment>
                )}
                
           
                {isauthenticated() && isauthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isactive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
                
            )}

            {isauthenticated() && isauthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isactive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}
            <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isactive(history, "/shop")}
                        to="/shop"
                    >
                            Shop
                    </Link>
                </li>
                <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isactive(history, "/cart")}
                    to="/cart"
                >
                          <span className="glyphicon glyphicon-shopping-cart"><sup><small className="cart-badge">{itemtotal()}</small></sup></span>
                </Link>
            </li>
            </ul>
        
    )
}

export default withRouter(Menu);