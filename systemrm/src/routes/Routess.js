import react from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import MaterialesV1RM from '../pages/MaterialesV1RM';
import SolicitudesRM from '../pages/SolicitudesRM';
import ReportesRM from '../pages/ReportesRM';
import ConfigRM from '../pages/ConfigRM';
import MaterialesV1OD from '../pages/MaterialesV1OD';
import Pdf from '../pages/Pdf';


function Routess() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/materiales" component={MaterialesV1RM}/>
      <Route exact path="/solicitudes" component={SolicitudesRM} />
      <Route exact path="/reportes" component={ReportesRM} />
      <Route exact path="/configuracion" component={ConfigRM} />
      <Route exact path="/materialesodep" component={MaterialesV1OD}/>
      <Route exact path="/Pdf" component={Pdf}/>
    </Switch>
    </BrowserRouter>
  );
}
export default Routess;
