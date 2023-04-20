import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppStack } from './stack';
export const QuickTodo = () => {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}
