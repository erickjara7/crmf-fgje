import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button,  Modal,ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import '../css/Materiales.css';
import '../img/logofiscalia.png';
import Cookies from 'universal-cookie';
import md5 from 'md5';

//Ruta traer datos de la coleccion User
const usersurl="http://localhost:4000/users/getuser";

//Ruta para hacer post y agg usuarios
const agguser = "http://localhost:4000/users/add";

//Ruta para eliminar usuarios
const deleteuser = "http://localhost:4000/users/";

//Arreglo para almacenar nombres de usuarios Nombre+ApellidoP+ApellidoM
const nombresUsuariosArray = [];

//Traer cookies de inicio de sesión
const cookies = new Cookies();

class ConfigRM extends Component{

    //Estado para guardar valores
    state={
        //Guardar lo que se escribe en el input de barra buscadora
        busqueda:'',

        //Arreglo para guardar los datos obtenidos de la ruta usersurl
        data:[],    
        datausertype:['Seleccione','Administrador','Usuario'],
        modalInsertar: false,
        modalEliminar: false,

        //Form para guardar cada uno de los datos de la api users
        form:{
            _id:'',
            nombres:'',
            apellidoP:'',
            apellidoM:'',
            username:'',
            municipio:'',
            password: '',
            departamento:'',
            userType:'',
        }
    }

    peticionGet = async() =>{
        await  axios.get(usersurl).then(response =>{
             this.setState({data:response.data});
             
         }).catch(error=>{
            console.log(error.message);
         })
    }


    validacionModalReUser = () =>{
        if(this.state.form.nombres === '' || this.state.form.apellidoP === '' || this.state.form.apellidoM === '' || this.state.form.departamento === '' 
           || this.state.form.municipio === '' || this.state.form.username === '' || this.state.form.password === '' || this.state.form.userType === '' 
           || this.state.form === '' ){
               alert("Favor de llenar todos los campos");

        }else{
            const resultado = nombresUsuariosArray.find(nombres => nombres === this.state.form.nombres+' '+ this.state.form.apellidoP+' '+ this.state.form.apellidoM ||
                nombres.toLowerCase() === this.state.form.nombres+' '+ this.state.form.apellidoP+' '+ this.state.form.apellidoM || 
                nombres.toUpperCase() === this.state.form.nombres+' '+ this.state.form.apellidoP+' '+ this.state.form.apellidoM ||  
                
                nombres.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === this.state.form.nombres+' '+ this.state.form.apellidoP+' '+ this.state.form.apellidoM || 
                nombres.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === this.state.form.nombres+' '+ this.state.form.apellidoP+' '+ this.state.form.apellidoM || 
                nombres.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() === this.state.form.nombres+' '+ this.state.form.apellidoP+' '+ this.state.form.apellidoM 

            
            
            );
            if(resultado){
                console.log(resultado);
                alert("El usuario ya existe, favor de verificar el nombre")

            }else{
                console.log("else");

                this.convertirmd5password();
                this.peticionPost();

            }
            

        }
    }

    
    peticionPost=async()=>{
        await axios.post(agguser, this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
        }).catch(error=>{
            console.log(error.message);
            alert("Error al guardar");
        })
        
    }

    peticionDelete=()=>{
        axios.delete(deleteuser+this.state.form._id).then(response =>{
            this.setState({modalEliminar:false});
            this.peticionGet()       
         }).catch(error=>{
            console.log(error.message);
            alert("Error al Eliminar");

         })
    }
    
    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }

    modalEliminar=()=>{
        this.setState({modalEliminar: !this.state.modalEliminar});
    }

    convertirmd5password=()=>{
        this.state.form.password = md5(this.state.form.password)
    }

    listausers=()=>{
        this.state.data.map((nombresusers) =>{
            nombresUsuariosArray.push(nombresusers.nombres+' '+nombresusers.apellidoP+' '+nombresusers.apellidoM);
        })

    }



    seleccionarUsuario = (usuario)=>{
        this.setState({
            tipoModal:'actualizar',
            form:{
                _id: usuario._id,
                nombres: usuario.nombres,
                apellidoP:usuario.apellidoP,
                apellidoM:usuario.apellidoM,
                municipio: usuario.municipio,
                username: usuario.username,
                password: usuario.password,
                departamento: usuario.departamento,
                userType: usuario.userType,
    
            }
        })
    }

    handleChange = async e =>{
        e.persist();
        await this.setState({
            
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
            
        });
       
    }

    onChange = async e =>{
        e.persist();
        await this.setState({busqueda: e.target.value});
       
    
    }

    cerrarSesion =() =>{
        cookies.remove('_id',{path:"/"});
        cookies.remove('nombres',{path:"/"});
        cookies.remove('apellidoP',{path:"/"});
        cookies.remove('apellidoM',{path:"/"});
        cookies.remove('municipious',{path:"/"})
        cookies.remove('username',{path:"/"});
        cookies.remove('departamento',{path:"/"});
        cookies.remove('userType',{path:"/"});
        window.location.href='./';
    }

    componentDidMount(){
        this.peticionGet();
        if (!cookies.get('username')){
            window.location.href="./";
        }else if(cookies.get('userType') === 'Usuario'){
            alert('Página no permitida, favor de autenticarse nuevamente.');
            this.cerrarSesion(); 
        }
    }



    render(){
        const {form} = this.state;
        return(
            <div class="container">
                <div class="navbar">
                    <img src="data:image/jpeg;base64,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" class="logo" alt="Main Logo"/>

                    <ul>
                        
                        <li><a href="./materiales">Materiales</a></li>
                        <li><a href="./solicitudes">Solicitudes</a></li>
                        <li><a href="./reportes">Reportes</a></li>
                        <li><a href="./configuracion">Usuarios</a></li>
                        <li><a href="/" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</a></li>
                        
                    </ul>
                </div>
            
                <div class="raya"/>
                <br></br>
                <h2>Gestión de Usuarios</h2>
                <br></br>
                <div>
                    <div class="barraBusqueda">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="form-control"
                            name="busqueda"
                            value = {this.state.busqueda}
                            onChange={this.onChange}
                            //value
                        />
                    </div>
                </div>

                <Button color="success" onClick={()=>{this.setState({
                    form:{
                        nombres:'',
                        apellidoP:'',
                        apellidoM:'',
                        username:'',
                        municipio:'',
                        password: '',
                        departamento:'',
                        userType:'',
                    }
                    }); 
                    this.listausers(); 
                    this.modalInsertar()}}>Registrar Usuario</Button>

                <table class="table table-striped table-bordered">

                    <thead>
                        <tr class="tablaencabezado">
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Nombre de Usuario</th>
                            
                            <th>Departamento</th>
                            <th>Municipio</th>
                            <th>Tipo de Usuario</th>
                            <th>Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(usuarios=>{
                            if(this.state.busqueda ===""){
                                return(
                                    <tr>
                                        <td>{usuarios.nombres}</td>
                                        <td>{usuarios.apellidoP}</td>
                                        <td>{usuarios.apellidoM}</td>
                                        <td>{usuarios.username}</td>
                                        <td>{usuarios.departamento}</td>
                                        <td>{usuarios.municipio}</td>
                                        <td>{usuarios.userType}</td>
                                        <td>
                                            <Button color="danger btn-sm" onClick ={()=> {this.seleccionarUsuario(usuarios); this.setState({modalEliminar :true})}} >Eliminar</Button>
                                        </td>
                                    </tr>  
                                )
                            }else if(usuarios.nombres.toLowerCase().includes(this.state.busqueda.toLowerCase()) || 
                                usuarios.apellidoP.toLowerCase().includes(this.state.busqueda.toLowerCase()) || 
                                usuarios.apellidoM.toLowerCase().includes(this.state.busqueda.toLowerCase()) || 
                                usuarios.username.toLowerCase().includes(this.state.busqueda.toLowerCase()) || 
                                usuarios.departamento.toLowerCase().includes(this.state.busqueda.toLowerCase()) || 
                                usuarios.userType.toLowerCase().includes(this.state.busqueda.toLowerCase())){

                                    return(
                                        <tr>
                                            <td>{usuarios.nombres}</td>
                                            <td>{usuarios.apellidoP}</td>
                                            <td>{usuarios.apellidoM}</td>
                                            <td>{usuarios.username}</td>
                                            <td>{usuarios.departamento}</td>
                                            <td>{usuarios.municipio}</td>
                                            <td>{usuarios.userType}</td>
                                            <td>
                                                <Button color="danger btn-sm" onClick ={()=> {this.seleccionarUsuario(usuarios); this.setState({modalEliminar :true})}} >Eliminar</Button>
                                            </td>
                                        </tr>  
                                    )

                            }

                        })}
                        
                    </tbody>

                </table>               

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}} >
                        <span style={{float:'left'}}>Registrar nuevo usuario</span>
                    </ModalHeader>

                    <ModalBody>
                        <div className="form-group" >
                            <label htmlFor='nombres'>Nombres:</label><br/>
                            <input class="form-control" type="text" name="nombres" id="nombres" onChange ={this.handleChange} value={form.nombres}></input>
                            <br/>

                            <label htmlFor='apellidoP'>Apellido Paterno:</label><br/>
                            <input class="form-control" type="text" name="apellidoP" id="apellidoP" onChange ={this.handleChange} value={form.apellidoP}></input>
                            <br/>

                            <label htmlFor='apellidoM'>Apellido Materno:</label><br/>
                            <input class="form-control" type="text" name="apellidoM" id="apellidoM" onChange ={this.handleChange} value={form.apellidoM}></input>
                            <label htmlFor='departamento'>Departamento:</label><br/>
                            <input class="form-control" type="text" name="departamento" id="departamento" onChange ={this.handleChange} value={form.departamento}></input>

                            <label htmlFor='municipio'>Municipio:</label><br/>
                            <select class="form-control"  type="text" name="municipio" id="municipio" onChange ={this.handleChange} value={form.municipio}>
                                    <option></option>
                                    <option>Aconchi</option>
                                    <option>Agua Prieta</option>
                                    <option>Alamos</option>
                                    <option>Altar</option>
                                    <option>Arivechi</option>
                                    <option>Arizpe</option>
                                    <option>Atil</option>
                                    <option>Bacadéhuachi</option>
                                    <option>Bacanora</option>
                                    <option>Bacerac</option>
                                    <option>Bacoachi</option>
                                    <option>Bácum</option>
                                    <option>Banámichi</option>
                                    <option>Baviácora</option>
                                    <option>Bavispe</option>
                                    <option>Benjamín Hill</option>
                                    <option>Caborca</option>
                                    <option>Cajeme</option>
                                    <option>Cananea</option>
                                    <option>Carbó</option>
                                    <option>La Colorada</option>
                                    <option>Cucurpe</option>
                                    <option>Cumpas</option>
                                    <option>Divisaderos</option>
                                    <option>Empalme</option>
                                    <option>Etchojoa</option>
                                    <option>Fronteras</option>
                                    <option>Granados</option>
                                    <option>Guaymas</option>
                                    <option>Hermosillo</option>
                                    <option>Huachinera</option>
                                    <option>Huásabas</option>
                                    <option>Huatabampo</option>
                                    <option>Huépac</option>
                                    <option>Imuris</option>
                                    <option>Magdalena</option>
                                    <option>Mazatán</option>
                                    <option>Moctezuma</option>
                                    <option>Naco</option>
                                    <option>Nácori Chico</option>
                                    <option>Nacozari de García</option>
                                    <option>Navojoa</option>
                                    <option>Nogales</option>
                                    <option>Onavas</option>
                                    <option>Opodepe</option>
                                    <option>Oquitoa</option>
                                    <option>Pitiquito</option>
                                    <option>Puerto Peñasco</option>
                                    <option>Quiriego</option>
                                    <option>Rayón</option>
                                    <option>Rosario</option>
                                    <option>Sahuaripa</option>
                                    <option>San Felipe de Jesús</option>
                                    <option>San Javier</option>
                                    <option>San Luis Río Colorado</option>
                                    <option>San Miguel de Horcasitas</option>
                                    <option>San Pedro de la Cueva</option>
                                    <option>Santa Ana</option>
                                    <option>Santa Cruz</option>
                                    <option>Sáric</option>
                                    <option>Soyopa</option>
                                    <option>Suaqui Grande</option>
                                    <option>Tepache</option>
                                    <option>Trincheras</option>
                                    <option>Tubutama</option>
                                    <option>Ures</option>
                                    <option>Villa Hidalgo</option>
                                    <option>Villa Pesqueira</option>
                                    <option>Yécora</option>
                                    <option>General Plutarco Elías Calles</option>
                                    <option>Benito Juárez</option>
                                    <option>San Ignacio Río Muerto</option>


                            </select>
                            <br/>


                            <br/>
                                                   

                            <label htmlFor='username'>Nombre de usuario:</label><br/>
                            <input class="form-control form-control-sm" type="text" name="username" id="username"onChange ={this.handleChange} value={form.username} ></input>
                            <br/>

                            <label htmlFor='password'>Contraseña:</label><br/>
                            <input class="form-control form-control-sm" type="password" name="password" id="password" onChange ={this.handleChange} value= {form.password}>
                               
                            </input>
                            <br/>

                           

                            <label htmlFor='userType'>Tipo de usuario:</label><br/>
                            <select className="form-control form-control-sm" type="text" name="userType" id="userType" onChange ={this.handleChange} value={form.userType}>
                            {this.state.datausertype.map(elemento =>(
                                    <option>{elemento}</option>
                                ))}

                            </select>
                            <br/>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button className="btn btn-success" onClick={ () => { this.validacionModalReUser() }}>Insertar</button>
                        <button className="btn btn-danger" onClick={()=> this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar a este usuario?
                    </ModalBody>

                    <ModalFooter>
                    <button className="btn btn-success" onClick={ () => this.peticionDelete()}>Si</button>
                    <button className="btn btn-danger" onClick={()=> this.modalEliminar()}>No</button>

                    </ModalFooter>
                </Modal>

                <footer class="footer">
                    Jacqueline Leal  | 2021© 
                </footer>
                                           
            </div>
            
        );
    }
}
export default ConfigRM;