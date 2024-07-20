import React from 'react';
import LeftSide from './LeftSIde';
import RightSide from './RightSide';

const MainScreen = () => {
    return (
        <div className='main-page-screen'>
            <LeftSide />
            <RightSide />
        </div>
    );
};

export default MainScreen;