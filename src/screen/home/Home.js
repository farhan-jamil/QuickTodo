import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { SafeArea, SwipeList, TopTab } from '../../component';
import { color, commonStyle, family, imagepath } from '../../utils';
import { CreateTodo } from '../createTodo';

export const Home = () => {

    const [selectedTab, setSelectedTab] = useState("Today");
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [todos, setTodos] = useState([]);
    const [filteredTodo, setFilteredTodo] = useState([]);

    useEffect(() => {
        // Fetch todos from AsyncStorage when the component mounts
        fetchTodos();
    }, []);


    const fetchTodos = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('todos');
            const valued = jsonValue != null ? JSON.parse(jsonValue) : []
            const shallowArry = [...valued]
            const filteredTodos = shallowArry.filter((todo) => {
                if (selectedTab === 'All') {
                    return true;
                } else if (selectedTab === 'Important') {
                    return todo?.todoImp === true;
                }
                else if (selectedTab === 'Today') {
                    console.log('....;', todo.todoText, todo.status)
                    return todo?.status === 'Today';
                }
                else if (selectedTab === 'Up Coming') {
                    return todo?.status === 'Upcoming';
                }
            })
            // console.log('seletet tab', selectedTab, ' filteredTodos', filteredTodos)
            setFilteredTodo(filteredTodos)
            setTodos(valued)
            // setFilteredTodo(jsonValue != null ? JSON.parse(jsonValue) : [])
        } catch (e) {
            console.log(e);
        }
    };

    const tabPressHandler = useMemo(() => {
        // console.log('----------tabPressHandler')
        const shallowArry = [...todos]
        const filteredTodos = shallowArry.filter((todo) => {
            if (selectedTab === 'All') {
                return true;
            } else if (selectedTab === 'Important') {
                return todo?.todoImp === true;
            }
            else if (selectedTab === 'Today') {
                console.log('....;', todo.todoText, todo.status)
                return todo?.status === 'Today';
            }
            else if (selectedTab === 'Up Coming') {
                return todo?.status === 'Upcoming';
            }
        })
        console.log('seletet tab', selectedTab, ' filteredTodos', filteredTodos)
        setFilteredTodo(filteredTodos)
    }, [selectedTab, todos])

    const submitTodoHandler = async (newTodo) => {
        try {
            const jsonValue = await AsyncStorage.getItem('todos');
            let existingTodos = jsonValue != null ? JSON.parse(jsonValue) : [];
            existingTodos = [newTodo, ...existingTodos]

            const sortedData = existingTodos.sort((a, b) => {
                if (a.completeTodo === b.completeTodo) {
                    return 0;
                } else if (a.completeTodo === false) {
                    return -1;
                } else {
                    return 1;
                }
            });

            const updatedTodos = JSON.stringify(existingTodos);
            await AsyncStorage.setItem('todos', updatedTodos);
            const filteredTodos = existingTodos.filter((todo) => {
                if (selectedTab === 'All') {
                    return true;
                } else if (selectedTab === 'Important') {
                    return todo?.todoImp === true;
                }
                else if (selectedTab === 'Today') {
                    console.log('....;', todo.todoText, todo.status)
                    return todo?.status === 'Today';
                }
                else if (selectedTab === 'Up Coming') {
                    return todo?.status === 'Upcoming';
                }
            })
            setTodos(existingTodos);
            setFilteredTodo(filteredTodos)

        } catch (e) {
            console.log(e);
        }
    };

    const deleteTodoHandler = async (data) => {
        const newData = [...todos];
        newData.splice(data?.index, 1)
        setFilteredTodo(newData)
        setTodos(newData)
        await AsyncStorage.setItem('todos', JSON.stringify(newData));
    };

    const completeTodoHandler = async (data) => {
        const newTodos = [...todos];
        console.log('data>>>>>', data)
        newTodos[data?.index].completeTodo = true;
        const sortedData = newTodos.sort((a, b) => {
            if (a.completeTodo === b.completeTodo) {
                return 0;
            } else if (a.completeTodo === false) {
                return -1;
            } else {
                return 1;
            }
        });

        setTodos(sortedData);
        setFilteredTodo(sortedData)
        await AsyncStorage.setItem('todos', JSON.stringify(sortedData));
    }

    const starTodoHandler = async (data) => {
        console.log('data', data)
        const newTodos = [...todos];
        newTodos[data?.index].todoImp = !data?.item?.todoImp;

        console.log('newTodos', newTodos)
        // Stringify the updated JavaScript object
        const updatedTodoList = JSON.stringify(newTodos);

        // Save the updated data back to AsyncStorage
        await AsyncStorage.setItem('todoList', updatedTodoList);


        const filteredTodos = newTodos.filter((todo) => {
            if (selectedTab === 'All') {
                return true;
            } else if (selectedTab === 'Important') {
                return todo?.todoImp === true;
            }
            else if (selectedTab === 'Today') {
                console.log('....;', todo.todoText, todo.status)
                return todo?.status === 'Today';
            }
            else if (selectedTab === 'Up Coming') {
                return todo?.status === 'Upcoming';
            }
        })
        // console.log('seletet tab', selectedTab, ' filteredTodos', filteredTodos)
        setFilteredTodo(filteredTodos)
        setTodos(newTodos)

    }

    const listHeaderComponent = () => {
        return (
            <View style={{
                ...commonStyle.mt_3

            }}>
                <Text style={styles.heading}>My {'\n'}Todos</Text>
                <View>

                    <ScrollView
                        horizontal
                        contentContainerStyle={{ ...commonStyle.pr_6, ...commonStyle.mt_3, }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <TopTab
                            title={'Important'}
                            onPress={() => setSelectedTab('Important')}
                            selectedTab={selectedTab}
                            showImage={true}
                        />
                        <TopTab
                            title={'Today'}
                            onPress={() => setSelectedTab('Today')}
                            selectedTab={selectedTab}
                        />
                        <TopTab
                            title={'Upcoming'}
                            onPress={() => setSelectedTab('Upcoming')}
                            selectedTab={selectedTab}
                        />
                        <TopTab
                            title={'All'}
                            onPress={() => setSelectedTab('All')}
                            selectedTab={selectedTab}
                        />
                    </ScrollView>
                </View>
            </View >
        )
    }
    return (
        <SafeArea>

            {listHeaderComponent()}


            <SwipeList
                swipeListData={filteredTodo}
                deleteTodo={deleteTodoHandler}
                completeTodo={completeTodoHandler}
                onPressStar={starTodoHandler}

            />

            <TouchableOpacity
                style={styles.addBtn}
                activeOpacity={0.8} onPress={() => setShowAddTodo(true)}>
                <AntDesign name='plus' size={wp(10)} color={color.blac100} />
            </TouchableOpacity>
            {
                showAddTodo &&
                <CreateTodo
                    visible={showAddTodo}
                    onClose={() => setShowAddTodo(false)}
                    submitTodo={submitTodoHandler}

                />
            }

        </SafeArea >
    )
}
const styles = StyleSheet.create({
    heading: {
        color: color.white50,
        ...commonStyle.f_12,
        ...commonStyle.pl_6,
        fontFamily: family.Title
    },
    itemSeparator: {
        height: 1,
        backgroundColor: color.grey200,
        ...commonStyle.mv_2
    },
    addBtn: {
        backgroundColor: color.primary50,
        borderRadius: 100,
        width: wp(16),
        height: wp(16),
        position: 'absolute',
        right: wp(6),
        bottom: hp(4),
        alignItems: 'center',
        justifyContent: 'center'
    }
})