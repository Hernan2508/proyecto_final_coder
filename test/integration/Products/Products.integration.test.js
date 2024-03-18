import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');
describe('Pruebas de integración módulo de productos', () => {
    it('POST de /api/products debe crear un producto correctamente', async () => {
        const productMock = {
            "title": "test",
            "description": "test",
            "price": 2500,
            "thumbnail": "test.jpg",
            "code": "test-01",
            "stock": 200
        };
        //statusCode: 200, 400, etc || _body acceder al body que estamos obteniendo
        const { statusCode, _body } = await requester.post('/api/products').send(productMock);
        expect(statusCode).to.be.eql(200); //validar
        expect(_body.payload).to.have.property('_id'); //validar
    })

    it('POST de /api/products se debe corroborar que si se desea crear un producto sin el campo stock, el módulo debe responder con un status 400', async () => {
        const productMock = {
            "title": "test",
            "description": "test",
            "price": 2500,
            "thumbnail": "test.jpg",
            "code": "test-01"
        };

        const { statusCode } = await requester.post('/api/products').send(productMock);
        expect(statusCode).to.be.eql(400);
    })

    it('GET de /api/products la respuesta debe tener los campos de status y payload. Además, payload debe ser de tipo arreglo', async () => {
        const {statusCode, _body} = await requester.get('/api/products');
        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('status');
        expect(_body).to.have.property('payload');
        expect(Array.isArray(_body.payload.docs)).to.be.eql(true);
    });
});