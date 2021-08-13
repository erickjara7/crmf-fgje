import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import jsPDF from 'jspdf';


const cookies = new Cookies();

class Pdf extends Component{



   /* generarPdf = () => <document>
        <page size="A4">
            <view>
                <text>holi</text>
            </view>
        </page>
    </document>


    generarPdf = () =>{
        const doc = new jsPDF();
        
        doc.text(`${cookies.get('nombres')}`,10,10)
      
        doc.save('1.pdf')
    }*/
    
    
    render(){
        return(
            <div>
               {/*  <object
                    data={require()}
                    type="application/pdf"
                    width="100%"
                    height="100%"              
                >


                </object>
               <pdfviewer width='600px' height='600px' type="application/pdf">
                    <this.generarPdf/>
        </pdfviewer>
         <button onClick={()=>this.generarPdf()}>descargar</button>
        */}



                
            </div>
            
            

        );
    }
}

export default Pdf;