import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setSearchField, requestRobots } from '../actions'
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';

const App = () => {
    const dispatch = useDispatch() 
    const { searchField } = useSelector((state) => state.searchRobots)
    const { robots, isPending, error } = useSelector(
        (state) => state.requestRobots
    )

    useEffect(() => {
        onRequestRobots()
    }, [])

    const onRequestRobots = () => {
        dispatch(requestRobots())
    }

    const onSearchChange = (event) => {
        dispatch(setSearchField(event.target.value))
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    if (isPending)
        return <h1 className='f1 tc'>LOADING</h1>

    if (!error)
        return (
            <div  className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>
        )
}

export default App;