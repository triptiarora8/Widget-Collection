import React from 'react';
import WidgetItem from './WidgetItem';

export default function WidgetList({ category, onEdit, onDelete, onAddWidget, searchQuery }) {
    const handleAddWidgetClick = () => {
        onAddWidget(category.name); 
    };

    const hasWidgets = category.widgets.length > 0;
    const noWidgetsFound = searchQuery && !hasWidgets;

    return (
        <div className='graph'>
            {noWidgetsFound ? (
                <div className="no-widgets-found">
                    <p>No widget found</p>
                </div>
            ) : (
                <>
                    {category.widgets.map((widget, index) => (
                        <WidgetItem
                            key={index}
                            widget={widget}
                            index={index}
                            onEdit={() => onEdit(category.name, index)}
                            onDelete={() => onDelete(category.name, index)}
                        />
                    ))}
                    {!searchQuery && (
                        <div className="graph-body blank-widget" onClick={handleAddWidgetClick}>
                            <i className="fa-solid fa-plus"></i>
                            <p>Add a Widget</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
