import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ParkingSpotsPage from "../pages/ParkingSpots";
import NewParkingPage from "../pages/AddNewParking";
import RegistrationPage from "../pages/Registration";

interface IRoute {
  path: string;
  name: string;
  auth: boolean;
  component: any;
}

const authRoutes: IRoute[] = [
  {
    path: '/login',
    auth: false,
    component: LoginPage,
    name: 'Login'
  }
];

const registerRoutes: IRoute[] = [
  {
    path: '/registration',
    auth: false,
    component: RegistrationPage,
    name: 'Registration'
  }
];

const scooterParkingSpotsRoutes: IRoute[] = [
  {
    path: '/parkings/spots',
    auth: true,
    component: ParkingSpotsPage,
    name: 'ParkingSpots'
  }
];

const newParkingRoutes: IRoute[] = [
    {
      path: '/parkings/new',
      auth: true,
      component: NewParkingPage,
      name: 'NewParking'
    }
  ];

const mainRoutes: IRoute[] = [
  {
    path: '/',
    auth: false,
    component: HomePage,
    name: 'Home'
  }
];

const routes: IRoute[] = [
  ...authRoutes,
  ...registerRoutes,
  ...scooterParkingSpotsRoutes,
  ...newParkingRoutes,
  ...mainRoutes
];

export default routes;
