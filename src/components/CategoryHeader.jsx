import React from 'react';

export default function CategoryHeader({ categoryName, onAddWidget }) {
    return (
        <div className='dashboard-headline'>
            <h3 className='cnapp-dashboard'>{categoryName}</h3>
            <div className='widgets'>
                <button className='add-widgets' onClick={onAddWidget}>
                    Add Widgets
                    <i className="fa-solid fa-plus" style={{ marginLeft: '5px' }}></i>
                </button>
            </div>
        </div>
    );
}
