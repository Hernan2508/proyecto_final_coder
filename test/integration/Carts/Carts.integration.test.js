import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');
describe('Pruebas de integración módulo de carritos', () => {
    it('POST de /api/carts debe crear un carrito correctamente', async () => {
        const { statusCode, _body } = await requester.post('/api/carts');
        expect(statusCode).to.be.eql(201); //validar
        expect(_body.payload).to.have.property('_id'); //validar
    })

    it('GET de /api/carts la respuesta debe tener los campos de status y payload. Además, payload debe ser de tipo arreglo', async () => {
        const {statusCode, _body} = await requester.get('/api/carts');
        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('status');
        expect(_body).to.have.property('payload');
        expect(Array.isArray(_body.payload)).to.be.eql(true);
    });

    it('GET de /api/carts la respuesta debe tener los campos de status y payload. Además dentro payload products debe ser de tipo arreglo', async () => {
        const id = '6594aae2250582db19fe0e0a'; // ID de ejemplo para la solicitud GET
        const {statusCode, _body} = await requester.get(`/api/carts/${id}`); // Hacer la solicitud GET con el ID
        expect(statusCode).to.be.eql(200); // Verificar que el código de estado sea 200 (éxito)
        expect(_body).to.have.property('status'); // Verificar que la respuesta tenga el campo 'status'
        expect(_body).to.have.property('payload'); // Verificar que la respuesta tenga el campo 'payload'
        expect(Array.isArray(_body.payload.products)).to.be.eql(true); // Verificar que 'payload.products' sea un arreglo
    });

});