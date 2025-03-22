
import React from 'react';

const Patients = () => {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
      <p className="text-muted-foreground">Manage and view all patient records</p>
      
      <div className="bg-background border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-muted-foreground">Patient list will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Patients;
