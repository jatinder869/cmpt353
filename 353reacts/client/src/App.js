import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Login} from "./Login"
import {Home} from "./Home";
import {AddStudent} from "./AddStudent";
import {AddStaff} from "./AddStaff";
import { EditStaff } from "./EditStaff";
import { StaffMember } from "./StaffMember";
import { EditStudent } from "./EditStudent";
import { AddReport } from './AddReport';
import { LoginError } from './LoginError';
import { PageNotFound } from "./PageNotFound";

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Login/></Route>
        <Route path="/home" ><Home/></Route>
        <Route path="/newstudent" ><AddStudent/></Route>
        <Route path="/addstaff" ><AddStaff/></Route>
        <Route path="/editstaff" ><EditStaff/></Route>
        <Route path="/staff/:id" ><StaffMember/></Route>
        <Route path="/editstudent"><EditStudent/></Route>
        <Route path="/student/addreport/:phone/r"><AddReport/></Route>
        <Route path="/loginerror"><LoginError/></Route>
        <Route path={"*"}><PageNotFound/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
