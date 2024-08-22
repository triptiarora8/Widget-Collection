import React, { useState } from 'react';
import DashboardCategory from './DashboardCategory';
import AddWidgetModal from './AddWidgetModal';
import widgetsData from '../../widgets.json';
import Heading from './Heading';

export default function Dashboard() {
    const [data, setData] = useState(widgetsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');
    const [editWidget, setEditWidget] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const addWidget = (widgetName, widgetContent, graph) => {
        const updatedCategories = data.categories.map(category => {
            if (category.name === currentCategory) {
                return {
                    ...category,
                    widgets: [
                        ...category.widgets,
                        { name: widgetName, content: widgetContent, Graph: graph }
                    ]
                };
            }
            return category;
        });
        setData({ ...data, categories: updatedCategories });
    };

    const updateWidget = (index, widgetName, widgetContent, graph) => {
        const updatedCategories = data.categories.map(category => {
            if (category.name === currentCategory) {
                return {
                    ...category,
                    widgets: category.widgets.map((widget, i) =>
                        i === index
                            ? { ...widget, name: widgetName, content: widgetContent, Graph: graph }
                            : widget
                    )
                };
            }
            return category;
        });
        setData({ ...data, categories: updatedCategories });
    };

    const removeWidget = (categoryName, index) => {
        const updatedCategories = data.categories.map(category => {
            if (category.name === categoryName) {
                return {
                    ...category,
                    widgets: category.widgets.filter((_, i) => i !== index)
                };
            }
            return category;
        });
        setData({ ...data, categories: updatedCategories });
    };

    const handleAddWidgetClick = (categoryName) => {
        setCurrentCategory(categoryName);
        setEditWidget(null);
        setIsModalOpen(true);
    };

    const handleEditWidget = (categoryName, index) => {
        if (index !== null) {
            setCurrentCategory(categoryName);
            setEditWidget({ ...data.categories.find(cat => cat.name === categoryName).widgets[index], index });
        } else {
            setEditWidget(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmModal = (widgetName, widgetContent, graph) => {
        if (editWidget) {
            updateWidget(editWidget.index, widgetName, widgetContent, graph);
        } else {
            addWidget(widgetName, widgetContent, graph);
        }
        handleCloseModal();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredCategories = data.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget =>
            widget.name.toLowerCase().includes(searchQuery) ||
            widget.content.toLowerCase().includes(searchQuery)
        )
    }));

    return (
        <>
            <Heading onSearchChange={handleSearchChange} />
            <main className='dashboard-main'>
                {filteredCategories.map(category => (
                    <DashboardCategory
                        key={category.name}
                        category={category}
                        onAddWidget={handleAddWidgetClick}
                        onEditWidget={handleEditWidget}
                        onRemoveWidget={removeWidget}
                        searchQuery={searchQuery}  
                    />
                ))}
                <AddWidgetModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onAdd={handleConfirmModal}
                    initialValues={editWidget || {}}
                />
            </main>
        </>
    );
}