import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/RegisterPage.css'; // Importa los estilos

const Register = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        password: '',
        celular: '',
        tipoDocumento: 'CC',
        numeroDocumento: '',
        fechaNacimiento: '',
        pais: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await api.post('http://localhost:5000/api/auth/register', formData, {
                withCredentials: true,
            });
            setSuccess('Usuario registrado exitosamente');

            // Redirigir al login tras el registro exitoso
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Ocurrió un error');
        }
    };

    return (
        <div className="card"> {/* Aquí envolvemos todo el contenido en una card */}
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombres"
                    placeholder="Nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="apellidos"
                    placeholder="Apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo Electrónico"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="celular"
                    placeholder="Celular"
                    value={formData.celular}
                    onChange={handleChange}
                    required
                />
                <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange}>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="Pasaporte">Pasaporte</option>
                </select>
                <input
                    type="text"
                    name="numeroDocumento"
                    placeholder="Número de Documento"
                    value={formData.numeroDocumento}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="pais"
                    placeholder="País"
                    value={formData.pais}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default Register;
