import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserInfo';

const AdminBalance = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Administrar Saldo</h1>
            <UserInfo showName={false} showEmail={false} showBalance={true} />

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                {/* Botón Recargar Saldo */}
                <button
                    onClick={() => navigate('/recargaPage')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Recargar Saldo
                </button>

                {/* Botón Retirar Saldo */}
                <button
                    onClick={() => navigate('/retiroPage')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Retirar Saldo
                </button>
            </div>
        </div>
    );
};

export default AdminBalance;