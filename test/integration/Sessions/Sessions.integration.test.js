import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');
describe('Pruebas de integración módulo de sessions', () => {

    it('POST de /api/sessions debe crear un usuario correctamente', async () => {
        const sessionMock = {
            "first_name": "test",
            "last_name": "test",
            "email": "test@gmail.com",
            "age": "28",
            "password": "1234",
            "role": "admin"
        };
        const { statusCode, _body } = await requester.post('/api/sessions/register').send(sessionMock);
        expect(statusCode).to.be.eql(201); //validar
    })   
   

    it('POST de /api/sessions debe loguearse correctamente', async () => {
        const sessionMock = {
            "email": "trompetita@gmail.com",
            "password": "1234"
        };
        //statusCode: 200, 400, etc || _body acceder al body que estamos obteniendo
        const { statusCode } = await requester.post('/api/sessions/login').send(sessionMock);
        expect(statusCode).to.be.eql(200); //validar
    })

    it('GET de /api/sessions/current debe obtener la sesión actual correctamente', async () => {
        // Simular autenticación de usuario (sin credenciales válidas)
        const { statusCode, body } = await requester.get('/api/sessions/current');
    
        if (statusCode === 401) {
            // Verifica que el código de estado sea 401, indicando un error de autenticación
            expect(statusCode).to.be.eql(401);
            // Verifica que la respuesta contenga el mensaje de error esperado
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('message', 'No user authenticated');
        } else {
            // Verifica que el código de estado sea 200, indicando una solicitud exitosa
            expect(statusCode).to.be.eql(201);
            // Verifica que la respuesta contenga los datos esperados de la sesión actual
            expect(body).to.have.property('status', 'success');
            expect(body).to.have.property('user');
            expect(body.user).to.have.property('name');
            expect(body.user).to.have.property('email');
            expect(body.user).to.have.property('age');
        }
    });

});