import React, { useState, useEffect } from 'react';

export default function AddWidgetModal({ isOpen, onClose, onAdd, initialValues = {} }) {
    const [widgetName, setWidgetName] = useState('');
    const [widgetContent, setWidgetContent] = useState('');
    const [addGraph, setAddGraph] = useState(false);
    const [labels, setLabels] = useState('');
    const [dataValues, setDataValues] = useState('');
    const [nameError, setNameError] = useState('');
    const [contentError, setContentError] = useState('');
    const [graphError, setGraphError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (initialValues.name) {
            setWidgetName(initialValues.name);
            setWidgetContent(initialValues.content);
            if (initialValues.Graph) {
                setAddGraph(true);
                setLabels(initialValues.Graph.data.labels.join(', '));
                setDataValues(initialValues.Graph.data.datasets[0].data.join(', '));
            } else {
                setAddGraph(false);
            }
        } else {
            resetForm();
        }
    }, [initialValues]);

    useEffect(() => {
        if (!isOpen) {
            resetErrors();
            setIsSubmitted(false);
        }
    }, [isOpen]);

    const resetErrors = () => {
        setNameError('');
        setContentError('');
        setGraphError('');
    };

    const validateInputs = () => {
        let valid = true;

        if (!widgetName.trim()) {
            setNameError('Widget name is required.');
            valid = false;
        } else {
            setNameError('');
        }

        if (!widgetContent.trim()) {
            setContentError('Widget content is required.');
            valid = false;
        } else {
            setContentError('');
        }

        if (addGraph) {
            if (!labels.trim() || !dataValues.trim()) {
                setGraphError('Labels and data values are required when adding a graph.');
                valid = false;
            } else {
                setGraphError('');
            }
        }

        return valid;
    };

    const handleConfirm = () => {
        setIsSubmitted(true);

        if (!validateInputs()) return;

        let graph = null;
        if (addGraph && labels && dataValues) {
            graph = {
                type: 'doughnut',
                data: {
                    labels: labels.split(',').map(label => label.trim()),
                    datasets: [{
                        data: dataValues.split(',').map(value => Number(value.trim())),
                        backgroundColor: ["#36A2EB", "#A7CDF3", "#FF6384", "#FFCE56"]
                    }]
                }
            };
        }

        onAdd(widgetName, widgetContent, graph);
        onClose();
        resetForm();
    };

    const handleClear = () => {
        resetForm();
    };

    const resetForm = () => {
        setWidgetName('');
        setWidgetContent('');
        setAddGraph(false);
        setLabels('');
        setDataValues('');
        resetErrors();
        setIsSubmitted(false);
    };

    const handleInputChange = (setter, errorSetter) => (e) => {
        setter(e.target.value);
        if (isSubmitted) {
            validateInputs();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{initialValues.name ? 'Edit Widget' : 'Add Widget'}</h3>
                    <button onClick={onClose} className="close-button">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="grid-container">
                        <div className="input-group">
                            <label>Widget Name:</label>
                            <input
                                className={`input-widget ${nameError ? 'input-error' : ''}`}
                                type="text"
                                value={widgetName}
                                onChange={handleInputChange(setWidgetName, setNameError)}
                            />
                            {nameError && isSubmitted && <p className="error-message">{nameError}</p>}
                        </div>
                        <div className="input-group">
                            <label>Widget Content:</label>
                            <input
                                className={`textarea-widget ${contentError ? 'input-error' : ''}`}
                                value={widgetContent}
                                onChange={handleInputChange(setWidgetContent, setContentError)}
                            />
                            {contentError && isSubmitted && <p className="error-message">{contentError}</p>}
                        </div>
                        <div className="input-group full-span">
                            <label className='input-graph'>
                                Add Graph
                                <input
                                type="checkbox"
                                checked={addGraph}
                                onChange={(e) => setAddGraph(e.target.checked)}
                            />
                            </label>
                        </div>
                        {addGraph && (
                            <>
                                <div className="input-group full-span">
                                    <label>Labels (comma separated):</label>
                                    <input
                                        type="text"
                                        value={labels}
                                        onChange={handleInputChange(setLabels, setGraphError)}
                                        placeholder="e.g., Label1, Label2, Label3"
                                    />
                                </div>
                                <div className="input-group full-span">
                                    <label>Data Values (comma separated):</label>
                                    <input
                                        type="text"
                                        value={dataValues}
                                        onChange={handleInputChange(setDataValues, setGraphError)}
                                        placeholder="e.g., 10, 20, 30"
                                    />
                                    {graphError && isSubmitted && <p className="error-message">{graphError}</p>}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={handleConfirm} className="confirm-button">
                        {initialValues.name ? 'Save Changes' : 'Add Widget'}
                    </button>
                    <button className="clear-button" onClick={handleClear}>Clear Data</button>
                </div>
            </div>
        </div>
    );
}
