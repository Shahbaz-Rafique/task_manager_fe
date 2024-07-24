import React from 'react';

const DashboardMainPage = () => {
  return (
    <div className="dashboard-container">

      
      <div className="left-section">
      <img src="logotask.png" alt="Bankole Logo" className="logo" />

        <div>
          <div className="centered-text">
            <h1 className="welcome">
              Welcome to Bankole Task
              <br />
              Manage Your Task With Ease
            </h1>
          </div>
        </div>
      </div>
      <div className="right-section mt-5 shadow-lg">
        <img src="logotask.png" alt="Bankole Logo" className="logo1" />
        <div className="center-button">
          <a href="/login" className="dashboard-button">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainPage;
