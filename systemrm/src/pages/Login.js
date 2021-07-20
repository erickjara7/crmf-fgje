import React, { Component } from 'react';
import'../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from 'axios'; pour le api 

//VARIABLE URL API LOGIN
//const loginurl="urldellogin";
//Login
class Login extends Component{
//ESTADO LOGIN PARA GUARDAR LOS VALORES
    state={
        form:{
            username:'',
            password:''
            
        }
    }

//GUARDA EN EL ESTADO LOGIN DE ACUERDO AL INPUT
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        //console.log(this.state.form)
    }

//METODO INICIAR SESION 
    iniciarSesion=async()=>{
       // window.location.href="./materiales";
        alert("Bienvenido");
        if(this.state.form.username=="juan"){
            window.location.href="./materiales";
        }else{
            window.location.href="./materialesodep";
        }
       /* await axios.get(loginurl,{params:{username: this.state.form.username, password:this.state.form.password}})
        .then(response=>{
            console.log(response.data)
        })
        .catch(error=>{
            console.log(error);
        })*/
    }
    aunnotengocuenta=async()=>{
       alert("Favor de pasar al departamento de Recursos Materiales a registrarse.");
    }
    olvidecontraseña=async()=>{
    alert("Favor de pasar al departamento de Recursos Materiales a solicitar la información correspondiente.");
   
    }

    render(){
        return(
            // Estructura Login
            
            <div className="container1">
                
                
                <div className="containerPrincipal">
                
                    <div className="containerSecundario">
                        <div className="form-group">
                            <h2 color="white">Iniciar Sesión</h2>
                            <br/>
                            <label>Usuario:</label>
                            <br/>
                            <input
                                className="inputPassUs"
                                type="text"
                                className="form-control"
                                placeholder="Ingresa tu nombre de usuario"
                                name="username"
                                onChange={this.handleChange}
                            />
                            <br/>
                            <label>Contraseña:</label>
                            <br/>
                            <input
                                className="inputPassUs"
                                type="password"
                                className="form-control"
                                placeholder="Ingresa tu contraseña"
                                name="password"
                                onChange={this.handleChange}
                            />
                        
                            <button className="buttoncss" onClick={()=> this.iniciarSesion() }>Iniciar Sesión</button>
                            <br/> <br/>
                            <a href="" onClick={()=> this.aunnotengocuenta()}>Aún no tengo una cuenta</a>
                            <br/>
                            <a href="" onClick={()=> this.olvidecontraseña()}>Olvidé mi contraseña</a>

                        </div>

                    </div>
                    
                </div>
            </div>

        );
    }
}
export default Login;