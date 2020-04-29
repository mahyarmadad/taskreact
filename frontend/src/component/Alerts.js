import React, { useContext } from 'react';
import AlertContect from '../context/Alert/AlertContext';
import { Alert, Container } from 'react-bootstrap';
function Alerts(props) {
    const alertContext = useContext(AlertContect);
    const { alerts } = alertContext;
    return (
        alerts && alerts.map(alert => (
            <Container>
                <Alert key={alert.id} variant={alert.type} className="w5 mt-3">
                    {alert.msg}
                </Alert>
            </Container>
        ))
    );
}

export default Alerts;