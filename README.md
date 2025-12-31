# API de notificação

Utilizando o servido do API REST: serverest.dev/usuarios

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

## 2️⃣ Estrutura do projeto

```bash
/project
  ├── README.md
  ├─ data/
  │   ├─ notificacoes_enviadas.json
  │   └─ usuarios.json
  ├─ services/
  │   ├─ serverestService.js
  │   ├─ notificationService.js
  │   └─ storageService.js
  ├── package-lock.json
  ├── package.json
  ├── scripts
  │   ├── buscar-lista.sh
  │   ├── create.sh
  │   └── enviar-notificacao.sh
  ├── src
  │   ├── app.js
  │   ├── routes
  │   │   ├── notificationsRoutes.js
  │   │   └── usersRoutes.js
  │   ├── services
  │   │   ├── notificationService.js
  │   │   ├── serverestService.js
  │   │   └── storageService.js
  │   └── utils
  │       └── file.util.js
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
---

## 4️⃣ Controle para não enviar mais de uma vez por dia

Esse é o ponto mais importante da regra.

Salva os emails que foram notificados em um arquivo:

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

   * Verifique se o email já existe na lista
   * Verifique se a data é **igual à data atual**
2. Se existir → **não envia**
3. Se não existir ou for outro dia → **envia e registra**

---

## 5️⃣ Envio da notificação

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

## 6️⃣ Implementação

* GitHub Actions

Exemplo:

* Executar **1 vez por dia**
* Ou a cada X horas

---

## 7️⃣ Por que essa abordagem é a melhor?

* Separação de responsabilidades 
* Fácil de testar
* Simples de evoluir
* Regras claras
* Não depende de banco de dados no início

Depois, podemos evoluir para:

* Banco de dados
* API própria
* Envio real de email
* Dashboard (Grafana)

---

## 8️⃣ Contribuições

Contribuições são bem-vindas!  
Sinta-se à vontade para abrir **issues** ou **pull requests** com melhorias, correções ou sugestões.

Antes de contribuir:
- Crie uma branch a partir da `main`
- Mantenha o padrão de código do projeto
- Descreva claramente as mudanças no pull request
