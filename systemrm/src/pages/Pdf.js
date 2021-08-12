import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import jsPDF from 'jspdf';


const cookies = new Cookies();

class Pdf extends Component{


    generarPdf = () =>{
        const doc = new jsPDF();
        
        doc.text(`${cookies.get('nombres')}`,10,10)
      
        doc.save('1.pdf')
    }
    
    render(){
        return(
            <div>

            <button onClick={()=>this.generarPdf()}>descargar</button>
            </div>
            
            

        );
    }
}

export default Pdf;