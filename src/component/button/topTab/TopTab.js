import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { color, commonStyle, family } from '../../../utils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const TopTab = ({
    title,
    onPress,
    selectedTab,
    showImage = false
}) => {

    return (
        <TouchableOpacity
            style={[styles.container,
            (selectedTab === title && !showImage) && { backgroundColor: color.primary50 },
            showImage && { borderWidth: 0 ,...commonStyle.ph_2}
            ]}
            activeOpacity={0.8}
            onPress={onPress}
        >
            {
                showImage ?
                    <AntDesign name={'star'} size={wp(8)} color={selectedTab === title ? color.primary50 : color.grey400} />
                    :
                    <Text style={[styles.heading,
                    selectedTab === title && { color: color.blac100, fontFamily: family.SemiBold }
                    ]}>{title}</Text>
            }
        </TouchableOpacity >
    )
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: color.primary50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...commonStyle.ml_4,
        ...commonStyle.ph_6,
        ...commonStyle.pv_1
    },
    heading: {
        color: color.white50,
        ...commonStyle.f_4,
        fontFamily: family.Medium
    }
})