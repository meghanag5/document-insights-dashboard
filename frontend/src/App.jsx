import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import StudyLab from "./pages/StudyLab";
import FocusTimer from "./pages/FocusTimer";
import Calendar from "./pages/Calendar";

const PAGES = {
    dashboard: Dashboard,
    studylab: StudyLab,
    focustimer: FocusTimer,
    calendar: Calendar,
};

export default function App() {
    const [activePage, setActivePage] = useState("dashboard");
    const PageComponent = PAGES[activePage];
    return (
        <Layout activePage={activePage} setActivePage={setActivePage}>
            <PageComponent />
        </Layout>
    );
}