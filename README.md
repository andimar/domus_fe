# Domus frontend

Frontend Twig/CSS/JavaScript del tema editoriale WordPress Domus Medica. Mantiene la separazione PHP OOP → ViewModel → Twig con Composer. Tre home selezionabili, catalogo reale, altri servizi, orari, FAQ e contatti. Le fixture sanificate restano utili allo sviluppo; il tema usa i repository WordPress.

Il precedente scaffold di parità Regina Lite è una fase storica superata dall'implementazione editoriale del 25 ottobre 2026. Gli asset di studio conservati non implicano opzioni ulteriori nel prodotto.

Build: dalla radice `node scripts/prepare-copy-presets.mjs`; dalla cartella frontend `npm ci` e `npm run build`; dalla radice `node scripts/assemble-theme.mjs`, poi `python scripts/package-wordpress.py`. Nessuna build modifica versioni, crea commit o esegue push. I frammenti Twig sotto `src/templates/website/` sono sorgenti di produzione: non rigenerarli dal mockup nella normale build.

Consultare [PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md), il sidecar `.impeccable/design.json` e il [contratto WordPress completo](../docs/15-tema-editoriale-wordpress.md). Tema e Domus Contenuti restano pacchetti separati.

Verifiche locali registrate in `outputs/wordpress-review/`: pubblico 109 controlli senza errori; contenuti 10; dominio 18; amministrazione 10; quattro controlli editoriali completati e persistenza trasporti separata. La correzione finale dei link telefonici FAQ è verificata in processo PHP su cinque partial. L'interruzione del ripristino prezzo tramite pulsante nativo è documentata; ripristino CLI verificato. I dati QA sono stati rimossi o ripristinati.

Le sei catture iniziali aggiornate coprono Base/Tagli/Vicina a 1440 e 390px; altre catture documentano sezioni e contenuti. Le immagini amministrative sono prove funzionali precedenti, non una documentazione completa dell'ultima UI. Maps nativa, disponibilità trasporti live e compatibilità dei plugin in produzione non verificate. Yoast SEO 18.3 è disattivato solo nel clone 8092 per errori JS verificati, con metadati conservati; produzione intatta.
