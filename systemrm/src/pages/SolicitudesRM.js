import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Button, Modal, ModalBody, ModalFooter} from 'reactstrap';
import {Card, Accordion} from 'react-bootstrap';
import axios from 'axios';
import '../css/solisunmenu.css';

/**
 * Traer cookies de inicio de sesión
 */
const cookies = new Cookies();

/**
 * Ruta traer datos de la coleccion solicitud
 */
const versolicitud = "http://localhost:4000/solicitud/getsoli";

/**
 * Ruta traer datos de la coleccion materialsolicitados
 */
const vermaterialsoli = "http://localhost:4000/materialsolicitado/getms";

/**
 * Ruta para modificar un registro en especifico de la coleccion solicitud
 */
const putsoli = "http://localhost:4000/solicitud/";

/**
 * Ruta traer datos de la coleccion materiales
 */
const vermaterial = "http://localhost:4000/materiales/getmaterial";

/**
 * Ruta para eliminar y/o modificar un registro en especifico de materiales
 */
const dpsidmaterial = "http://localhost:4000/materiales/";

/**
 * Ruta para modificar un registro en especifico de la coleccion materialsolicitados
 */
const putmatesoli = "http://localhost:4000/materialsolicitado/";

/**
 * Arreglo para copiar los datos guardados en "datamatesoli" para mantenerlo publico
 */
var materialesSolicitados = [];

/**
 * variable para copiar el valor del id de una solicitud seleccionada para mantenerlo publico
 */
var solicitudID = '';

/**
 * variable para copiar el valor tipodesolicitud de una solicitud seleccionada para mantenerlo publico
 */
var typesoli = '';

/**
 * variable para copiar el valor del id de cada 1 de las materiales solicitados para ser agg al vector
 */
var vecIdMatesoli ='';

/**
 * Arreglo guardar materiales solicitados de una solicitud seleccionada(se guardan doble)
 */
const vector =[];

/**
 * Arreglo guarda materiales solicitados de una solicitud seleccionada(la mitad del arreglo Vector)
 */
let newvector =[];

/**
 * variable para copiar el valor del id de cada 1 de las solicitudes para ser agg al vector
 */
var vecMateid='';

/**
 * variable para copiar el valor de cantidad solicitada de cada 1 de las solicitudes para ser agg al vector
 */
var vecCanSol='';

/**
 * Para iniciar el ciclo for
 */
var i =0;
 



 

class SolicitudesRM extends Component{

    /**
     * Estado para guardar valores
     * @param   {Array}    datamate      Arreglo para guardar los datos obtenidos de la ruta vermaterial
     * @param   {Array}    newdatamate      Arreglo para guardar datos del material
     * @param   {Array}    data      Arreglo para guardar los datos obtenidos de la ruta versolicitud
     * @param   {Array}    datamatesoli      Arreglo para guardar los datos obtenidos de la ruta vermaterialsoli
     * @param   {Boolean}    modalEntregarMaterial      Guarda el valor del modal si es false=modal cerrado y si es true=modal abierto
     * @param   {Boolean}    modalCancelarsoli     Guarda el valor del modal si es false=modal cerrado y si es true=modal abierto
     * @param   {Object}    form        Guardar cada uno de los datos de las solicitudes
     * @param   {String}    _id     Guarda _id de la solicitud
     * @param   {String}    tipoSolicitud   Guarda el tipo de solicitud de la solicitud
     * @param   {Object}    form2        Guardar cada uno de los datos de los materiales
     * @param   {String}    _id     Guarda _id del material
     * @param   {String}    existencia     Guarda la existencia del material
     * @param   {String}    tipoSolicitud   Guarda el tipo de solicitud de la solicitud
     * @param   {Object}    form3        Guardar cada uno de los datos de los materiales solicitados
     * @param   {String}    _id     Guarda _id de los materiales solicitados
     * @param   {String}    cantidadsolicitada     Guarda cantidad solicitada de los materiales solicitados de la solicitud
     */
    state={
        datamate:[],
        newdatamate:[],
        data:[],
        datamatesoli:[],
        modalEntregarMaterial: false,
        modalCancelarsoli: false,

        //Solicitudes
        form:{ 
            _id:'',
            tipoSolicitud:''
           
        },
        //Materiales
        form2:{
            _id:'',
            existencia:'',
            tipoSolicitud:''

        },
        //Materiales solicitados
        form3:{
            _id:'',
            cantidadsolicitada:''
        }
    }

    /**
     * Petición para traer los datos de la url "versolicitud" y guardar en la variable data del estado
     */
    peticiongetsoli = async()=>{
        await axios.get(versolicitud).then(response=>{
            this.setState({data:response.data})
        }).catch(error=>{
            console.log(error.message);
        })    
    }

    /**
     * Petición para traer los datos de la url "vermaterialsoli" y guardar en la variable datamatesoli del estado
     */
    peticiongetmatesoli = async()=>{
        await axios.get(vermaterialsoli).then(response=>{
            this.setState({datamatesoli: response.data});
        }).catch(error=>{
            console.log(error.message);
        })  

    }

    /**
     * Petición para modificar las solicitudes(cambiar estado a entregada)
     */
    peticionPutestadoSoli = ()=>{
        axios.put(putsoli+this.state.form._id, this.state.form).then(response=>{
            this.modalEntregarMaterial();
            alert("Si desea descargar la solicitud, dirijase a solicitudes entregadas");
            window.location.href='./solicitudes';
        }).catch(error=>{
            alert("Error al entregar");
           
        })  
           
    }

    /** 
     * Petición para traer los datos de la url "vermaterial" y guardar en la variable datamate del estado 
     */
    peticiongetColletionMateriales=async()=>{
        await axios.get(vermaterial).then(response=>{
            this.setState({datamate: response.data});
           // console.log("get");
            //console.log(this.state.datamate);
        }).catch(error=>{
            console.log(error.message);
        })
    }

    /**
     * Cambia el estado del modal (abrir y cerrar)
     */
    modalEntregarMaterial =()=>{
        this.setState({modalEntregarMaterial: !this.state.modalEntregarMaterial});
        window.location.href='./solicitudes';
    }

    /**
     * Cambia el estado del modal (abrir y cerrar)
     */
    modalCancelarsoli=()=>{
        this.setState({modalCancelarsoli: !this.state.modalCancelarsoli})
    }

    /**
     * Petición put a url "putsoli" para cambiar estado de la solicitud a cancelada
     */
    peticionDelete=()=>{
        axios.put(putsoli+this.state.form._id, this.state.form).then(response =>{
            this.modalCancelarsoli();
            //this.setState({modalCancelarsoli:false});
            this.peticiongetsoli();       
        }).catch(error=>{
            console.log(error.message);
            alert("Error al Eliminar");
    
        })
    }


    /**
     * Cambia el valor de las variables del usuario por el usuario seleccionado y estado "Cancelada"
     * @param {String}  solicitudes Guarda todos los datos de la solicitud seleccionada
     */
    selecSoliCancelar=(solicitudes)=>{
        this.setState({
            form:{
                _id: solicitudes._id,
                estado: 'Cancelada' 
            }
        })
        console.log(this.state.form._id)
        if(this.state.form._id === ''){

        }else{
            this.setState({modalCancelarsoli :true})
            console.log(`ya tengo: ${this.state.form._id}`);
        }
    }

    /**
     * Se llena el vector con id del material, y cantidad solicitada y id de registro del material solicitado
     * correspondientes a la solicitud seleccionada
     * @param {String}  materialesSolicitados Guarda todos los datos de los materiales solicitados en la solicitud seleccionada
     */
    selecMaterialaCambiar=async(materialesSolicitados)=>{
        if(solicitudID !== ''){
            if(materialesSolicitados.idSolicitud === solicitudID){
                this.state.form2._id = materialesSolicitados.idMaterial;
                this.state.form2.tipoSolicitud = typesoli;
                vecIdMatesoli = materialesSolicitados._id;
                vecCanSol = materialesSolicitados.cantidadsolicitada;
                vecMateid = this.state.form2._id;  

                vector.push({vecIdMatesoli, vecMateid,vecCanSol});
                    
            }
        }   
    }
    
    /**
     * Entrega de material, se modifica la existencia de la tabla materiales
     * se descuentan los materiales que se pidieron en la solicitud
     */
    peticionPutExistencia=()=>{
        //se llena un nuevo vector con la mitad del vector de los materiales solicitados
        for(  i = i; i < vector.length/2; i ++){
            newvector.push(vector[i]);
        }
        
        //se recorre vector, se trae y se recorre los materiales
        newvector.map((materialesvec)=>{
            axios.get(vermaterial)
            .then(response=>{
                response.data.map(materiales=>{
                    if(this.state.form2.tipoSolicitud === 'Requisición'){
                        
                        //console.log("requisiscion");
                        //se busca el material por id y si es igual al del arreglo se cambian el valor exixtencia 
                        if(materiales._id === materialesvec.vecMateid){
                            
                            
                            console.log(`material : ${materialesvec.vecMateid}`);
                            console.log(`cantidad: ${materialesvec.vecCanSol}`);
                            // si no hay material se elimina de la solicitud la requsicion de ese material 
                            if(materiales.existencia === 0){
                                this.setState({
                                    form3:{
                                        _id:materialesvec.vecIdMatesoli,                                        
                                    }                            
                                });
                            
                                console.log(`MATERIAL EXIS = 0 `);
                                console.log("------------------------");
                                //this.state.form2.existencia = materiales.existencia;
                                axios.delete(putmatesoli+this.state.form3._id).then(response=>{

                                });
                               

                            

                                // si lo que hay es menor a lo que pidió se modifica la cantidad solicitada por la existencia
                            }else{
                                if(materiales.existencia === materialesvec.vecCanSol){
                                    this.setState({
                                        form3:{
                                            _id:materialesvec.vecIdMatesoli,
                                            cantidadsolicitada: materialesvec.vecCanSol
                                        }
                                    })
                                    console.log(`EXIS = CANSOL  existencia = ${materiales.existencia}`);
                                    this.state.form2.existencia = materiales.existencia - this.state.form3.cantidadsolicitada;
                                    this.state.form2._id = materialesvec.vecMateid;

                                    axios.put(dpsidmaterial+this.state.form2._id, this.state.form2).then(response=>{                    
                                    }).catch(error=>{
                                        alert("Error al entregar los materiales");
                                    })
                                    
                                    
                                }else{
                                    if(materiales.existencia < materialesvec.vecCanSol){
                                        this.setState({
                                            form3:{
                                                _id:materialesvec.vecIdMatesoli,
                                                cantidadsolicitada: materiales.existencia
                                            }                            
                                        });
                                        console.log(`EXIS MENOR A CANSOL mate exis: ${materiales.existencia}`);
                                        console.log(`CANSOL: ${this.state.form3.cantidadsolicitada}`);
                                        this.state.form2.existencia = materiales.existencia - this.state.form3.cantidadsolicitada;
                                        this.state.form2._id = materialesvec.vecMateid;
                                        

                                        axios.put(dpsidmaterial+this.state.form2._id, this.state.form2).then(response=>{                    
                                        }).catch(error=>{
                                            alert("Error al entregar los materiales");
                                        });
                                        //this.state.form3.cantidadsolicitada = materiales.existencia;
                                       
                                        axios.put(putmatesoli+ this.state.form3._id, this.state.form3).then(response=>{
                                        }).catch(error=>{
                                            alert("Error al entregar los materiales");
                                        });
                                        

                                    }else{
                                        if(materiales.existencia > materialesvec.vecCanSol){
                                            this.state.form2._id = materialesvec.vecMateid;
                                            this.state.form2.existencia = materiales.existencia - materialesvec.vecCanSol;
                                            console.log(`EXIS MAYOR mate exis ${materiales.existencia}`);
        
                                            axios.put(dpsidmaterial+this.state.form2._id, this.state.form2).then(response=>{         
                                            }).catch(error=>{
                                                alert("Error al entregar los materiales");
                                            })


                                        }
                                    }
                                }                                                            
                            }   

                        }else{
                            if(this.state.form2.tipoSolicitud === 'Préstamo'){
                                console.log("prestamoo");

                            }
                        }

                    }           
                })
                
 
            })  
        })
        this.peticionPutestadoSoli();
    }
    
    /**
     * Cambia los valores de las solicitudes por la de la solicitud seleccionada
     * @param {String}  solicitudes Guarda todos los datos de la solicitud seleccionada
     */
    seleccionarsoliput =(solicitudes)=>{
        //cambia los valores segun la solicitud seleccionada para hacer el put
        this.setState({
            form:{
                _id:solicitudes._id,
                tipoSolicitud: solicitudes.tipoSolicitud,
                estado:'Entregada'
            }
        })
        //guarda valores en variables publicas para usar en otros metodos.
        solicitudID = this.state.form._id;
        typesoli = this.state.form.tipoSolicitud;

        console.log(`${solicitudID} tipo: ${typesoli}`)
        //seleccionar la solicitud, doble click uno selecciona, el segundo jala el idsolicitud
        if(solicitudID === ''){

        }else{
            //si tiene id abrir el modal solo si es estado pendiente(desactivar boton)
            if(solicitudes.estado === 'Pendiente'){
                this.setState({modalEntregarMaterial :true})
            }else{

            }
            
        }
        

    }

    /**
     * Elimina las cookies de sesión y redirige al login
     */
    cerrarSesion =() =>{
    //eliminar cookies para no ir a paginas sin autenticarse
        cookies.remove('_id',{path:"/"});
        cookies.remove('nombres',{path:"/"});
        cookies.remove('apellidoP',{path:"/"});
        cookies.remove('apellidoM',{path:"/"});
        cookies.remove('municipious',{path:"/"});
        cookies.remove('username',{path:"/"});
        cookies.remove('departamento',{path:"/"});
        cookies.remove('userType',{path:"/"});
        window.location.href='./';
    }

    /**
     * Ciclo del vida: se ejecuta siempre.
     * Valída los permisos de usuario
     */
    
    componentDidMount(){
        this.peticiongetmatesoli();
        this.peticiongetsoli();
        this.peticiongetColletionMateriales();
        if (!cookies.get('username')){
            window.location.href="./";
        }else if(cookies.get('userType') === 'Usuario'){
            alert('Página no permitida, favor de autenticarse nuevamente.');
            this.cerrarSesion(); 
        }
    }

    
    render(){
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

                <br/>
                                                               
                <button type="button" className="ssmbutton col-4" disabled onClick={()=> window.location.href="./solicitudes"}>Solicitudes Pendientes</button> 
                <button type="button" className="btn btn-outline-light col-4" onClick={()=> window.location.href="./solicitudesrmen"}>Solicitudes Entregadas</button>
                <button type="button" className="btn btn-outline-light col-4"  onClick={()=> window.location.href="./solicitudesrmext"}>Solicitudes Externas</button>
                <br/>
                <h2>Solicitudes Pendientes</h2>
                <br/> <br/> 
                <h6>De click en una solicitud para ver su información</h6>
                

                {this.state.data.map((solicitudes,index)=>{
                    if(solicitudes.estado === 'Pendiente'){ 
                        var solifech = solicitudes.fecha;
                        var cutfechacompleta = solifech.substr(0,10);                      
                        return(

                            <Accordion key={index}>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey={solicitudes}>
                                        {solicitudes.departamentosoli + ' / ' + solicitudes.area + ' -- ' + cutfechacompleta}
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey={solicitudes}>
                                        <Card.Body>                                    
                                            <div id="invoice" >
                                                <label><b>Fecha:</b> {cutfechacompleta}</label><br/>
                                                <label><b>Solicitante:</b> {solicitudes.solicitante}</label><br/>
                                                <label><b>Municipio:</b> {solicitudes.municipiosoli}</label><br/>
                                                <label><b>Departamento: </b>{solicitudes.departamentosoli}</label><br/>
                                                <label><b>Área:</b> {solicitudes.area}</label><br/>
                                                <label><b>Tipo de solicitud: </b>{solicitudes.tipoSolicitud}</label><br/>
                                                <label><b>Estado de la solicitud:</b> {solicitudes.estado}</label><br/>

                                                
                                                        
                                                <br/><br/>
                                                <h5>Materiales:</h5>
                                            </div>

                                            <table className="table table-bordered" id="tablamate">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Cantidad</th>
                                                        <th>Unidad de medida</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {this.state.datamatesoli.map(materialsoli=>{
                                                        if(materialsoli.idSolicitud === solicitudes._id){
                                                                
                                                            materialesSolicitados = materialsoli;
                                                            this.selecMaterialaCambiar(materialesSolicitados);
                                                            return(
                                                                <tr>
                                                                    <td>{materialsoli.nombreMaterial}</td>
                                                                    <td>{materialsoli.cantidadsolicitada}</td>
                                                                    <td>{materialsoli.unidadMedidaMS}</td>
                                                                </tr>                                                                    
                                                            )                                                                                                                                                                                    
                                                        }                                                    
                                                    })}                                                                                                                
                                                </tbody>
                                            </table>
                                          

                                            <Button color="success" onClick={()=>{this.seleccionarsoliput(solicitudes)}}>Entregar</Button>  
                                            <h6>De click si desea cancelar la solicitud y eliminarla</h6>
                                            <Button color="danger" onClick={()=>this.selecSoliCancelar(solicitudes)}>Cancelar Solicitud</Button>                                                                                
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card> 
                            </Accordion>                        
                        )
                    }
                })}


                <Modal isOpen={this.state.modalEntregarMaterial}>
                    <ModalBody>
                        ¿Esta solicitud ya fue entregada?
                    </ModalBody>
                    <ModalFooter>                {/** this.peticionPutestadoSoli();*/}
                        <button className="btn btn-success" onClick={()=> {this.peticionPutExistencia()  }}>Si</button>
                        <button className="btn btn-danger" onClick={()=> this.modalEntregarMaterial()}>No</button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalCancelarsoli}>
                    <ModalBody>
                        ¿Seguro de cancelar esta solicitud?
                        La solicitud será eliminada permanentemente
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success"  onClick={()=>this.peticionDelete()} >Si</button>
                        <button className="btn btn-danger"  onClick={()=> this.modalCancelarsoli()}>No</button>
                    </ModalFooter>
                </Modal>




                <footer class="footer">
                    <a class= "a" href="https://github.com/JacquelineLeal"> Jacqueline Leal  | 2021© </a>
                </footer>           
            </div>
        );
    }
}
export default SolicitudesRM;     