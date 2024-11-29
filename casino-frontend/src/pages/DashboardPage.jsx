import React from 'react';
import { useNavigate } from 'react-router-dom';
import LiveMatches from '../components/LiveMatches';
import UpcomingMatches from '../components/UpcomingMatches';
import PastMatches from '../components/PastMatches';
import '../styles/DashboardPage.css';

function DashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <div className="account-button">
                <button onClick={() => navigate('/account')}>Cuenta</button>
            </div>

            {}
            <div className="matches-container">
                <div className="dashboard-card">
                    <LiveMatches />
                </div>
                <div className="dashboard-card">
                    <UpcomingMatches />
                </div>
                <div className="dashboard-card">
                    <PastMatches />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
