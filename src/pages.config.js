import AIChatbot from './pages/AIChatbot';
import AptitudeQuiz from './pages/AptitudeQuiz';
import CareerCounselor from './pages/CareerCounselor';
import CollegeAdvisor from './pages/CollegeAdvisor';
import Counselors from './pages/Counselors';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import InterestFinder from './pages/InterestFinder';
import Profile from './pages/Profile';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AIChatbot": AIChatbot,
    "AptitudeQuiz": AptitudeQuiz,
    "CareerCounselor": CareerCounselor,
    "CollegeAdvisor": CollegeAdvisor,
    "Counselors": Counselors,
    "Dashboard": Dashboard,
    "Home": Home,
    "InterestFinder": InterestFinder,
    "Profile": Profile,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};