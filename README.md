# Pubblicazione sito su Cloudflare Pages con dominio battesimo-mia.it

Questa guida ti accompagna passo passo per mettere online il sito e collegare il dominio personalizzato `battesimo-mia.it`.

## 1) Prerequisiti

- Hai un account Cloudflare.
- Hai un account GitHub.
- Il progetto e gia su GitHub (nel tuo caso si, hai gia fatto push).
- Possiedi il dominio `battesimo-mia.it`.

## 2) Verifica repository GitHub

Nel repository devono esserci almeno:

- `index.html`
- `styles.css`
- `script.js`
- cartella `assets`

Se fai modifiche locali, pubblicale cosi:

```powershell
git add .
git commit -m "Aggiornamento sito"
git push
```

## 3) Crea progetto su Cloudflare Pages

1. Accedi a Cloudflare Dashboard.
2. Vai su **Workers & Pages**.
3. Clicca **Create application**.
4. Seleziona **Pages**.
5. Clicca **Connect to Git**.
6. Autorizza GitHub (se richiesto).
7. Seleziona il repository del sito.

### Build settings consigliate per questo progetto statico

- **Framework preset**: `None`
- **Build command**: lascia vuoto
- **Build output directory**: `.`
- **Root directory**: lascia vuoto

Poi clicca **Save and Deploy**.

Alla fine avrai un URL temporaneo tipo:

- `https://nome-progetto.pages.dev`

## 4) Collega il dominio battesimo-mia.it

1. Apri il progetto Pages appena creato.
2. Vai su **Custom domains**.
3. Clicca **Set up a custom domain**.
4. Inserisci `battesimo-mia.it`.
5. Conferma la configurazione proposta.

Ti consiglio di aggiungere anche `www.battesimo-mia.it`.

## 5) DNS: due casi possibili

## Caso A: dominio gia su Cloudflare

Cloudflare crea/aggiorna in automatico i record necessari.

Controlla in **DNS > Records** che ci siano i record per il dominio root (`@`) e per `www` collegati al progetto Pages.

## Caso B: dominio registrato altrove (es. Aruba, GoDaddy, OVH)

Devi prima delegare il dominio a Cloudflare cambiando i nameserver presso il registrar:

1. In Cloudflare aggiungi il sito `battesimo-mia.it`.
2. Cloudflare ti mostra 2 nameserver.
3. Nel pannello del provider dominio sostituisci i nameserver vecchi con quelli Cloudflare.
4. Attendi propagazione (da pochi minuti a 24h, a volte fino a 48h).

Dopo propagazione, torna al punto 4 per collegare il dominio al progetto Pages.

## 6) SSL/HTTPS

Cloudflare abilita HTTPS automaticamente.

Verifica:

- `https://battesimo-mia.it`
- `https://www.battesimo-mia.it`

Se in Cloudflare vedi certificato in emissione, attendi qualche minuto.

## 7) Reindirizzamento www -> root (opzionale ma consigliato)

Puoi scegliere un solo dominio canonico (es. `battesimo-mia.it`) e reindirizzare `www` al root con una Redirect Rule:

1. **Rules > Redirect Rules**
2. Crea regola:
   - If hostname equals `www.battesimo-mia.it`
   - Then dynamic redirect to `https://battesimo-mia.it/$1` (o equivalente UI)

## 8) Aggiornare il sito in futuro

Ogni `git push` su branch di produzione attiva un nuovo deploy automatico su Cloudflare Pages.

Flusso tipico:

```powershell
git add .
git commit -m "Modifiche invito"
git push
```

Poi controlla deploy in **Workers & Pages > tuo progetto > Deployments**.

## 9) Checklist finale

- [ ] Deploy su `pages.dev` funzionante
- [ ] Dominio `battesimo-mia.it` collegato
- [ ] `www.battesimo-mia.it` collegato (opzionale ma utile)
- [ ] HTTPS attivo su entrambe le varianti
- [ ] Navigazione da mobile testata (pulsanti WhatsApp e mappe)

## 10) Risoluzione problemi rapida

- Dominio non si apre: controlla stato nameserver e propagazione DNS.
- SSL non attivo subito: attendi 5-20 minuti e riprova.
- 404 dopo deploy: verifica che `index.html` sia nella root del repo e output directory sia `.`.
- Asset non caricati: controlla percorsi relativi (`assets/...`) e maiuscole/minuscole nomi file.

---

Se vuoi, posso aggiungere anche una sezione "Go Live in 10 minuti" super sintetica (solo passaggi essenziali) nello stesso README.
