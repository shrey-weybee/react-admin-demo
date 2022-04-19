import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const auth = useSelector((state) => state.auth);
  if (!auth.isLogedin) {
    return <Navigate to="/login" />;
  }
  return children;
}
