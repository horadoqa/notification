# API de notificação, serverest.dev

Fluxo geral:

```
Buscar usuários → Salvar usuários → Verificar quem já recebeu hoje → Enviar notificação → Registrar envio
```

## 1️⃣ Visão geral da solução

O projeto pode ser dividido em **4 partes principais**:

1. **Consumo da API do Serverest**
2. **Armazenamento dos usuários**
3. **Controle de notificações já enviadas**
4. **Envio da notificação (simulada ou real)**

---

## 2️⃣ Estrutura recomendada do projeto

Exemplo simples (Node.js, mas o conceito vale para qualquer linguagem):

```
/project
 ├─ data/
 │   ├─ usuarios.json
 │   └─ notificacoes_enviadas.json
 ├─ services/
 │   ├─ serverestService.js
 │   ├─ notificationService.js
 │   └─ storageService.js
 ├─ index.js
 └─ README.md
```

---

## 3️⃣ Buscar usuários do Serverest

* Fazer um **request GET** para a API de usuários
* Extrair apenas:

  * `nome`
  * `email`
* Salvar no arquivo `usuarios.json`

📌 **Boas práticas**

* Sempre sobrescrever ou atualizar o arquivo
* Evitar duplicados (usar email como identificador)

curl -X POST http://localhost:3000/users/sync
{"message":"Usuários sincronizados com sucesso","totalRecebidos":3,"totalSalvos":3}%

---

## 4️⃣ Controle para não enviar mais de uma vez por dia

Esse é o ponto mais importante da regra.

Crie um arquivo, por exemplo:

### `notificacoes_enviadas.json`

```json
[
  {
    "email": "teste@email.com",
    "data": "2025-12-30"
  }
]
```

### Lógica:

1. Antes de enviar a notificação:

   * Verifique se o email já existe
   * Verifique se a data é **igual à data atual**
2. Se existir → **não envia**
3. Se não existir ou for outro dia → **envia e registra**

📌 Use a data no formato `YYYY-MM-DD` para facilitar a comparação.

---

## 5️⃣ Envio da notificação

Você pode começar de forma simples:

### Opções:

* 📄 **Log no console**
* 📄 **Salvar em arquivo**
* 📧 **Simular envio de email**
* 🔔 **Integração real (futuro)**

Mensagem:

```
Caro {nome}, obrigado por usar o serverest, esperamos que esteja ajudando no seu desenvolvimento.

Lembramos que os cadastros ficam registrados no nosso banco por 24 horas.

Atenciosamente,
```

---

## 6️⃣ Agendamento (opcional, mas recomendado)

Para rodar automaticamente:

* `node-cron` (Node.js)
* Cron do sistema
* GitHub Actions (para aprendizado)

Exemplo:

* Executar **1 vez por dia**
* Ou a cada X horas

---

## 7️⃣ Por que essa abordagem é a melhor?

✅ Separação de responsabilidades
✅ Fácil de testar
✅ Simples de evoluir
✅ Regras claras
✅ Não depende de banco de dados no início

Depois, você pode evoluir para:

* Banco de dados
* API própria
* Envio real de email
* Dashboard

---

## 8️⃣ Próximo passo

Se quiser, posso:

* Te ajudar a **escolher a stack**
* Montar o **fluxo em pseudocódigo**
* Criar um **exemplo de código**
* Ajudar a transformar isso em um **projeto de portfólio**

É só me dizer 😄
