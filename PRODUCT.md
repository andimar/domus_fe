# Domus Medica: prodotto corrente

Sito pubblico del laboratorio di Roma Centocelle: aiuta a consultare pacchetti di analisi, servizi, orari, FAQ, referti e contatti prima della visita. Implementazione locale WordPress, con PHP OOP, ViewModel, Twig e Composer; frontend separato. Nessuna SPA.

Il personale può scegliere Base approvata, Tagli di luce o Vicina, modificare contatti e testi, applicare tre proposte editoriali prima del salvataggio e scegliere raccolte di immagini per sette sezioni. Rotazione a ogni visita, senza slideshow. Orari e FAQ hanno pagine dedicate; i trasporti sono nel Customizer.

`domus_site_settings` conserva identità, testi e layout; `domus_hours`, `domus_faqs`, `domus_section_images` e `domus_rotate_images` conservano i rispettivi controlli. I trasporti usano theme mods. Il plugin indipendente Domus Contenuti mantiene i dati anche cambiando tema: articoli nativi rinominati Pacchetti con metadati, CPT `avvisi` e `altri-servizi`.

Lo snapshot pubblico del 25 ottobre 2026 contiene 18 pubblicazioni: 10 pacchetti, 2 avvisi di agosto scaduti, 5 servizi e un vecchio duplicato intolleranze escluso dalla home. Pap test è un servizio reale. I servizi Covid storici restano fuori dalla home in attesa di revisione. Import esplicito con anteprima in Strumenti → Dati Domus, idempotente, con conservazione di ID/slug/contenuti e modifiche manuali. Non correggere arbitrariamente il conflitto storico degli orari: 07:30–10:00 nelle vecchie schede, 08:00–10:30 nella home.

Contratto completo e limiti di verifica: [documento 15](../docs/15-tema-editoriale-wordpress.md). Sistema visivo corrente: [DESIGN.md](DESIGN.md). Nessuna scrittura o distribuzione online autorizzata in questo lavoro.
