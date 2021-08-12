import React, { Component } from 'react';
import'../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';  
import md5 from 'md5';
import Cookies from 'universal-cookie';


//VARIABLE URL API LOGIN
const loginurl="http://localhost:4000/users/getuser";
const cookies = new Cookies();

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
        //Params: {username: this.state.form.username, password:this.state.form.password}
        await axios.get(loginurl)
        .then(response=>{
            if(this.state.form.username === "" || this.state.form.password === ""){
                alert("Favor de llenar todos los campos")

            }else{
                {response.data.map(usuarios=>{
                    if (usuarios.username.includes(this.state.form.username)  && usuarios.password.includes(md5(this.state.form.password))){
                    response[0] = usuarios;
                    response.length = 0;
                    response.data = response[0];
                    }
                    
                }) }    
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
                    cookies.set('username',respuesta.username,{path:"/"});
                    cookies.set('departamento',respuesta.departamento,{path:"/"});
                    cookies.set('userType',respuesta.userType,{path:"/"});
                    alert(`Bienvenido(a)  ${respuesta.nombres} ${respuesta.apellidoP}`)
                    if(respuesta.userType === 'Administrador'){
                        window.location.href="./materiales";
                    }else{
                        window.location.href="./materialesodep";
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

    
    aunnotengocuenta=async()=>{
        alert("Favor de pasar al departamento de Recursos Materiales a registrarse.");
    }
    olvidecontraseña=async()=>{
        alert("Favor de pasar al departamento de Recursos Materiales a solicitar la información correspondiente.");
   
    }
    componentDidMount(){
        //cookies.get('username') && cookies.get('userType') == 'usuario'
        if (cookies.get('username')){
            if(cookies.get('userType') === 'Usuario'){
                window.location.href="./materialesodep";
                console.log('entre al if');
            }else if(cookies.get('userType') === 'Administrador'){
                window.location.href="./materiales";
                console.log('entre al else');  
            }
              
            //window.location.href="./materialesodep"; 
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
                                className="inputPassUs"
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
                                    className="inputPassUs"
                                    type="password"
                                    className="form-control"
                                    placeholder="Ingresa tu contraseña"
                                    name="password"
                                    onChange={this.handleChange} 
                                required/>
                               
                            
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