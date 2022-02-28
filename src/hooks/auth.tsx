import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextData = {};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthProviderProps);

function AuthProvider({ children }: AuthProviderProps) {}
