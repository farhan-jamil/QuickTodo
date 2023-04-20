import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { StyleSheet } from "react-native"

export const commonStyle = StyleSheet.create({
    mv_2: { marginVertical: hp(2) },
    ml_4: { marginLeft: wp(4) },
    ml_6: { marginLeft: wp(6) },
    mh_8: { marginHorizontal: wp(8) },
    mr_4: {
        marginRight: wp(4)
    },
    mr_6: { marginRight: wp(6) },

    mb_2: { marginBottom: hp(2) },
    mb_4: { marginBottom: hp(4) },
    mb_6: { marginBottom: hp(6) },
    mb_9: { marginBottom: hp(9) },
    mt_1: { marginTop: hp(1) },
    mt_2: { marginTop: hp(2) },
    mt_3: { marginTop: hp(3) },
    mt_4: { marginTop: hp(4) },
    mt_5: { marginTop: hp(5) },
    mt_9: { marginTop: hp(9) },

    p_2: { padding: wp(2) },

    ph_2: { paddingHorizontal: wp(2) },
    ph_4: { paddingHorizontal: wp(4) },
    ph_5: { paddingHorizontal: wp(5) },
    ph_6: { paddingHorizontal: wp(6) },

    pl_2: { paddingLeft: wp(2) },
    pl_3: { paddingLeft: wp(3) },
    pl_5: { paddingLeft: wp(5) },
    pl_6: { paddingLeft: wp(6) },
    
    pt_1: { paddingTop: hp(1) },
    pt_3: { paddingTop: hp(3) },

    pb_1: { paddingBottom: hp(1) },
    pb_2: { paddingBottom: hp(2) },
    pb_3: { paddingBottom: hp(3) },

    pr_6: { paddingRight: wp(6) },

    pv_1: { paddingVertical: hp(1) },
    pv_2: { paddingVertical: hp(2) },
    pv_3: { paddingVertical: hp(3) },
    pv_6: { paddingVertical: hp(6) },

    f_4: {
        fontSize: wp(4)
    },
    f_5: {
        fontSize: wp(5)
    },
    f_6: {
        fontSize: wp(6)
    },
    f_8: {
        fontSize: wp(8)
    },
    f_12: {
        fontSize: wp(12)
    },

    flex_1: {
        flex: 1
    },
    rowStyle: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})

    // ml_4: wp(4),
    // ml_6: wp(6),
    // mr_4: wp(4),


    // mb_4: hp(4),
    // mt_4: hp(4),
    // mt_3: hp(3),

    // ph_2: wp(2),
    // ph_4: wp(4),

    // pl_6: wp(6),
    // pt_3: hp(3),



    // f_12: wp(12),
    // f_4: wp(4),
    // f_6: wp(6),


    // flex_1: { flex: 1 },

    // rowStyle: {
    //     alignItem: 'center',
    //     flexDirection: 'row'
    // }
