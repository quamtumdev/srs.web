import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AdminRoute from "./componets/routes/AdminRoute";
import StudentRoute from "./componets/routes/StudentRoute";
import { Navigate } from "react-router-dom";
import { FounderMssg } from "./componets/About-UI/FounderMssg";
import { Header } from "./componets/pages/layout/Header";
import { Home } from "./componets/pages/Home";
import { Footer } from "./componets/pages/layout/Footer";
import { About } from "./componets/pages/About";
import { Login } from "./componets/pages/Login";
import Register from "./componets/pages/Register";
import { Contact } from "./componets/pages/Contact";
import JEENurtureBatchClass11 from "./componets/featured-courses/JEE-Courses/JEENurtureBatchClass11";
import { JEENurtureBatchclass12 } from "./componets/featured-courses/JEE-Courses/JEENurtureBatchclass12";
import JEEDroperBatchClass12 from "./componets/featured-courses/JEE-Courses/JEEDroperBatchClass12";
import NeetClass11 from "./componets/featured-courses/NEET-Courses/NeetClass11";
import NeetClass12 from "./componets/featured-courses/NEET-Courses/NeetClass12";
import NeetDropper from "./componets/featured-courses/NEET-Courses/NeetDropper";
import OlympiadsclassName5 from "./componets/featured-courses/Olympiads-Program/Olympiadsclass5";
import TapasyaClass from "./componets/featured-courses/Olympiads-Program/TapasyaClass";
import ColleagePredictor from "./componets/pages/ColleagePredictor";
import Sip from "./componets/pages/Sip";
import TopBar from "./componets/pages/layout/TopBar";
import { VisionMission } from "./componets/About-UI/VisionMission";
import { WhyEducares } from "./componets/About-UI/WhyEducares";
import { TeachingMethodology } from "./componets/About-UI/TeachingMethodology";
import Center from "./componets/pages/Center";
import { LoginUi } from "./componets/Login-UI/LoginUi";
import Auth from "./componets/firebase/Auth";

import StudentMasterLayout from "./componets/backend/Student-Panel/StudentLayout/StudentMasterLayout/StudentMasterLayout";

import AdminMasterLayout from "./componets/backend/Admin-pages/AdminLayout/AdminMaster/AdminMasterLayout";
import StudentLogin from "./componets/Student_Login/StudentLogin";
import Ckeditor from "./componets/backend/Admin-pages/CkEditor/Ckeditor";

function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

function AppContent() {
  const location = useLocation();

  const hideHeaderFooterRoutes = ["/login", "/register", "/admin", "/student"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideHeaderFooter && <TopBar />}
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/editor" element={<Ckeditor />} />
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jeeclass11" element={<JEENurtureBatchClass11 />} />
        <Route path="/jeeclass12" element={<JEENurtureBatchclass12 />} />
        <Route path="/jeedropper" element={<JEEDroperBatchClass12 />} />
        <Route path="/neetclass11" element={<NeetClass11 />} />
        <Route path="/neetclass12" element={<NeetClass12 />} />
        <Route path="/neetdroper" element={<NeetDropper />} />
        <Route path="/olympiad-batch" element={<OlympiadsclassName5 />} />
        <Route path="/tapasay-batch" element={<TapasyaClass />} />
        <Route path="/college-predictor" element={<ColleagePredictor />} />
        <Route path="/sip" element={<Sip />} />
        <Route path="/founder-msg" element={<FounderMssg />} />
        <Route path="/vision-mission" element={<VisionMission />} />
        <Route path="/why-srs-educares" element={<WhyEducares />} />
        <Route path="/teaching-methodolgy" element={<TeachingMethodology />} />
        <Route path="/center" element={<Center />} />
        <Route path="/login-ui" element={<LoginUi />} />
        <Route path="/admin" element={<AdminMasterLayout />} />
        <Route path="/student" element={<StudentMasterLayout />} />
        {AdminRoute.map(route => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children &&
              route.children.map(childRoute => (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
          </Route>
        ))}
        {StudentRoute.map(route => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children &&
              route.children.map(childRoute => (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={childRoute.element}
                  index={childRoute.index} // ⭐ Index route support
                >
                  {/* ⭐ Handle deeper nested routes */}
                  {childRoute.children &&
                    childRoute.children.map(grandChild => (
                      <Route
                        key={grandChild.path}
                        path={grandChild.path}
                        element={grandChild.element}
                        index={grandChild.index}
                      />
                    ))}
                </Route>
              ))}
          </Route>
        ))}

        <Route path="/admin/*" element={<Navigate to="/admin" />} />
        <Route path="/student/*" element={<Navigate to="/student" />} />
        {/* <Route path="*" element={<Navigate to="/admin" />} /> */}
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
