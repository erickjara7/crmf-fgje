import React, { Component } from 'react';
import'../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';  
import md5 from 'md5';
import {Button} from 'reactstrap';
import Cookies from 'universal-cookie';

/**
 * Ruta traer datos de la coleccion User
 */
const loginurl="http://localhost:4000/users/getuser";

/**
 * Traer cookies de inicio de sesión
 */
const cookies = new Cookies();


class Login extends Component{
    /**
     * ESTADO LOGIN PARA GUARDAR LOS VALORES
     * @param   {Object}    form    Guardar cada uno de los datos de la api users
     * @param   {String}    username    Guarda el nombre de usuario del usuario
     * @param   {String}    password     Guarda la contraseña del usuario
     */
    state={
        form:{
            username:'',
            password:''
            
        }
    }

    /**
     * GUARDA EN EL ESTADO LOGIN DE ACUERDO AL INPUT
     */
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });   
    }

    /**
     * METODO INICIAR SESION
     * Valída que los campos esten llenos y que la información corresponda 
     * Genera las cookies de inicio de sesión  
     * */ 
    iniciarSesion=async()=>{
        await axios.get(loginurl)
        .then(response=>{
            if(this.state.form.username === "" || this.state.form.password === ""){
                alert("Favor de llenar todos los campos")
            }else{
                response.data.map(usuarios=>{
                    if (usuarios.username.includes(this.state.form.username)  && usuarios.password.includes(md5(this.state.form.password))){
                        response[0] = usuarios;
                        response.length = 0;
                        response.data = response[0];
                    }
                    
                })    
            }
            return response;
            
        })
        .then(response=>{
           
                if(response.length === 0){
                   
                    var respuesta = response[0];
                    
                    cookies.set('_id',respuesta._id,{path:"/"});
                    cookies.set('nombres',respuesta.nombres,{path:"/"});
                    cookies.set('apellidoP',respuesta.apellidoP,{path:"/"});
                    cookies.set('apellidoM',respuesta.apellidoM,{path:"/"});
                    cookies.set('municipious', respuesta.municipio,{path:"/"});
                    cookies.set('username',respuesta.username,{path:"/"});
                    cookies.set('departamento',respuesta.departamento,{path:"/"});
                    cookies.set('userType',respuesta.userType,{path:"/"});
                    alert(`Bienvenido(a)  ${respuesta.nombres} ${respuesta.apellidoP}`)
                    if(respuesta.userType === 'Administrador'){
                        window.location.href="./materiales";
                    }else{
                        window.location.href="./solicitudesodep";
                    }

                }else{
                    if(this.state.form.username === "" || this.state.form.password === ""){

                    }else{
                        alert('El usuario y/o contraseña son incorrectos');
                    }
                    
                }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    /**
     * Alert para el link de "Aun no tengo una cuenta"
     */
    aunnotengocuenta=async()=>{
        alert("Favor de pasar al departamento de Recursos Materiales a registrarse.");        
    }

    /**
     * Alert para el link de "Olvidé mi contraseña"
     */
    olvidecontraseña=async()=>{
        alert("Favor de pasar al departamento de Recursos Materiales a solicitar la información correspondiente.");
   
    }

    /**
     * Ciclo del vida: se ejecuta siempre.
     * Valída los permisos de usuario
     */
    componentDidMount(){  
        if (cookies.get('username')){
            if(cookies.get('userType') === 'Usuario'){
                window.location.href="./materialesodep";
               
            }else if(cookies.get('userType') === 'Administrador'){
                window.location.href="./materiales";     
            } 
        }
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
                                class="inputPassUs"
                                type="text"
                                className="form-control"
                                placeholder="Ingresa tu nombre de usuario"
                                name="username"
                                onChange={this.handleChange}
                            required/>
                            <br/>
                            <label>Contraseña:</label>
                            <br/>

                              
                                <input
                                    class="inputPassUs"
                                    type="password"
                                    className="form-control"
                                    placeholder="Ingresa tu contraseña"
                                    name="password"
                                    onChange={this.handleChange} 
                                required/>
                               
                            
                            <Button className="buttoncss"  onClick={()=> this.iniciarSesion() }>Iniciar Sesión</Button>
                            <br/> <br/>
                            <a href="/" onClick={()=> this.aunnotengocuenta()}>Aún no tengo una cuenta</a>
                            <br/>
                            <a href="/" onClick={()=> this.olvidecontraseña()}>Olvidé mi contraseña</a>

                        </div>

                    </div>
                    
                    
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <footer class="footer">
                   <a class= "a" href="https://github.com/JacquelineLeal"> Jacqueline Leal  | 2021© </a>
                </footer>
            </div>
            

        );
    }
}
export default Login;