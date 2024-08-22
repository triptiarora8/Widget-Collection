import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function WidgetItem({ widget, index, onEdit, onDelete }) {
    const [dropDown, setDropDown] = React.useState(false);
    const [timeoutId, setTimeoutId] = React.useState(null);

    const handleToggleDropdown = () => {
        if (timeoutId) {
            clearTimeout(timeoutId); 
        }
        
        setDropDown(!dropDown);

        if (!dropDown) {
            const id = setTimeout(() => setDropDown(false), 3000);
            setTimeoutId(id);
        }
    };

    const handleEdit = () => {
        onEdit();
        setDropDown(false); 
    };

    const handleDelete = () => {
        onDelete();
        setDropDown(false); 
    };

    React.useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <div className="graph-body" key={index}>
            <h4>{widget.name}</h4>
            <p>{widget.content}</p>
            {widget.Graph ? (
                <Doughnut data={widget.Graph.data} />
            ) : (
                <p className="no-graph-message">No Graph Data Available</p>
            )}
            <div className="widget-options">
                {!dropDown ? (
                    <button
                        className='remove-button'
                        onClick={handleToggleDropdown}
                    >
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                ) : (
                    <div className="dropdown-menu">
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}
