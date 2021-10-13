import react from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import MaterialesV1RM from '../pages/MaterialesV1RM';
import SolicitudesRM from '../pages/SolicitudesRM';
import ReportesRM from '../pages/ReportesRM';
import ConfigRM from '../pages/ConfigRM';
import MaterialesV1OD from '../pages/MaterialesV1OD';

import SolicitudesOD from '../pages/SolicitudesOD';
import SolicitudesRMEntregadas from '../pages/SolicitudesRMEntregadas';
import SoliRMExterna from '../pages/SoliRMExterna';
import MaterialesAERM from '../pages/MaterialesAERM';

import ReportexDepto from '../pages/ReportexDepto';
import ReportexMate from '../pages/ReportexMate';
import Entradasmaterial from '../pages/Entradasmaterial';


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
      <Route exact path="/solicitudesodep" component={SolicitudesOD}/>
      <Route exact path="/solicitudesrmen" component={SolicitudesRMEntregadas}/>
      <Route exact path="/solicitudesrmext" component={SoliRMExterna}/>
      <Route exact path="/materialesaerm" component={MaterialesAERM}/>
      <Route exact path="/reportesdepto" component={ReportexDepto}/>
      <Route exact path="/reportesmate" component={ReportexMate}/>
      <Route exact path="/entradasmate" component={Entradasmaterial}/>
    </Switch>
    </BrowserRouter>
  );
}
export default Routess;
