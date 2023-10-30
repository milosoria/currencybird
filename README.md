# Prueba Técnica Currency Bird

## Instrucciones de ejecución

0. Generar archivo .env con:

```txt
PORT=puerto
API_URL=https://env.developers-test.currencybird.cl
```

El env de la url será reemplazado según la variable de entorno `NODE_ENV`

1. Para crear la imágen del contenedor:

```sh
docker build -t currencybird --build-arg ENV_FILE=.env .
```

2. Luego para correrla y exponerla en el puerto 8000:

```sh
docker run -t -i -p 8000:8000 currencybird
```

Sin el contenedor, basta con:

- DEV:

  ```sh
  npm install && npm run dev
  ```

- PROD:

  ```sh
  npm install && npm start:prod
  ```

## Documentación

### Endpoint: `POST /payment`

**Descripción:** Este endpoint permite realizar un pago. Envía una solicitud POST para procesar un pago con los datos proporcionados en el cuerpo de la solicitud.

**Parámetros de entrada:**

- `transferCode`(string): El código de transferencia asociado al pago.
- `amount` (integer): La cantidad a pagar.

**Respuestas:**

- Código de estado 200: El pago se ha procesado con éxito. La respuesta contendrá detalles sobre el pago.
- Código de estado 400: Si hay un error en la solicitud o datos de entrada incorrectos.
- Código de estado 500: Si ocurre un error interno del servidor.

**Ejemplo de solicitud:**

```json
POST /payment
{
  "transferCode": "your_email@email.com",
  "amount": 5000
}
```

### Endpoint: `GET /payment`

**Descripción:** Este endpoint permite obtener información sobre un pago. Envía una solicitud GET para obtener detalles sobre el estado de un pago en función del código de transferencia.

**Parámetros de entrada:**

- `transferCode`(string): El código de transferencia del pago que se desea consultar.

**Respuestas:**

- Código de estado 200: La consulta se ha realizado con éxito y se proporciona información sobre el pago.
- Código de estado 400: Si hay un error en la solicitud o datos de entrada incorrectos.
- Código de estado 500: Si ocurre un error interno del servidor.

**Ejemplo de solicitud:**

```json
GET /payment?transferCode=the_transfer_code
```
