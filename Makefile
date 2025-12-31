.PHONY: menu

menu:
	@clear
	@while true; do \
		echo "==============================="; \
		echo "   MENU - Notification System  "; \
		echo "==============================="; \
		echo "1) Sincronizar usuários"; \
		echo "2) Enviar notificações"; \
		echo "0) Sair"; \
		echo "==============================="; \
		read -p "Escolha uma opção: " opt; \
		case $$opt in \
			1) \
				echo "➡️  Sincronizando usuários..."; \
				npm run sync:users ;; \
			2) \
				echo "➡️  Enviando notificações..."; \
				npm run notify:users ;; \
			0) \
				echo "Saindo..."; \
				break ;; \
			*) \
				echo "Opção inválida"; \
				sleep 1 ;; \
		esac; \
		echo ""; \
	done
