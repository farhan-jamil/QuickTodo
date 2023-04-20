import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { color } from '../../utils'

export const SafeArea = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black50,
    }
})