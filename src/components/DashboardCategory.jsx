import React from 'react';
import CategoryHeader from './CategoryHeader';
import WidgetList from './WidgetList';

export default function DashboardCategory({ category, onAddWidget, onEditWidget, onRemoveWidget, searchQuery }) {
    return (
        <div>
            <CategoryHeader
                categoryName={category.name}
                onAddWidget={() => onAddWidget(category.name)} 
            />
            <WidgetList
                category={category}
                onEdit={onEditWidget} 
                onDelete={onRemoveWidget}
                onAddWidget={onAddWidget} 
                searchQuery={searchQuery}  
            />
        </div>
    );
}
