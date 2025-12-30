# Executando os Jobs

## Buscar usuários

```bash
npm run sync:users

> notification@1.0.0 sync:users
> node src/jobs/sync-users.job.js

{
  message: 'Usuários sincronizados com sucesso',
  totalRecebidos: 54,
  totalSalvos: 54
}

```

## Executar notificação

```bash
npm run notify:users

> notification@1.0.0 notify:users
> node src/jobs/send-notifications.job.js

{
  message: 'Processo de notificação finalizado',
  enviados: 0,
  ignorados: 53
}
```