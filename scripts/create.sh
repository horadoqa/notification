curl -X 'POST' \
  'https://serverest.dev/usuarios' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "nome": "Hora do QA",
  "email": "horadoqa@qa.com.br",
  "password": "teste",
  "administrador": "true"
}'