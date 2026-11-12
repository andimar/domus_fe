---
name: Domus Medica
description: Sistema editoriale WordPress del laboratorio a Centocelle
colors:
  brand-blue: "#009fe3"
  blue-06: "color-mix(in srgb, #009fe3 6%, white)"
  blue-10: "color-mix(in srgb, #009fe3 10%, white)"
  blue-border: "color-mix(in srgb, #009fe3 28%, white)"
  blue-action: "color-mix(in srgb, #009fe3 75%, black)"
  blue-link: "color-mix(in srgb, #009fe3 66%, black)"
  blue-ink: "color-mix(in srgb, #009fe3 22%, #202020)"
  sand-faq: "#faf1d2"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontWeight: 400
  body:
    fontFamily: "Source Sans 3, Arial, sans-serif"
  price:
    fontFamily: "Georgia, Times New Roman, serif"
rounded:
  button: "6px"
  photo: "12px"
spacing:
  button: "14px 24px"
components:
  button-primary:
    backgroundColor: "{colors.blue-action}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "{spacing.button}"
  button-primary-hover:
    backgroundColor: "{colors.blue-link}"
---

# Design System: Domus Medica

## Overview

Sistema editoriale del laboratorio a Centocelle, documentato dal frontend WordPress corrente il 25 ottobre 2026. Le decisioni approvate governano questa registrazione: leggibilità, informazioni pratiche e tono accogliente. Nessuna nuova direzione creativa è introdotta.

Autorità: `src/styles/website.css`, asset riusati sotto `src/assets/prototype/`, template `src/templates/website*.twig` e `src/templates/website/`. Le alternative storiche nei mockup restano riferimenti, non configurazioni disponibili nel tema.

## Colors

Un solo azzurro di marca, schiarito con bianco o scurito con neutri; il frontmatter conserva le formule CSS normative. Le superfici chiare distinguono sezioni, card e contatti. L'azzurro scuro governa azioni e collegamenti; l'inchiostro governa la lettura.

L'oro chiarissimo è riservato alla sezione FAQ. Il footer comune usa `--footer-dark`, miscela dell'azzurro al 12% con `#080d10`, con testo chiaro. Il sito resta in modalità chiara; la modalità scura è rinviata.

## Typography

Newsreader per titoli editoriali; Source Sans 3 per testo, navigazione e titoli delle card; Georgia per prezzi. Le famiglie sono fissate, senza selettore pubblico. I font principali sono locali.

I titoli delle pagine contenuto usano `clamp(40px,4.6vw,64px)` con interlinea 1.12. Il corpo delle pagine contenuto usa 18px/1.75, massimo 80ch, e scende a 17px su schermi piccoli. Le cifre degli orari mantengono allineamento tabulare.

## Layout

Tre layout selezionabili: Base · approvata (`base`), Tagli di luce (`obliqua`), Vicina, ogni giorno (`vicina`). Il modello PHP e i dati sono condivisi. Il template mantiene `data-layout=obliqua` per il sistema CSS comune; `data-variant` distingue la scelta effettiva.

Contenitore principale fino a 1280px. Le griglie di servizi, contenuti e archivi passano a una colonna entro 700px; adattamenti intermedi a 980px. Le immagini di sezione facoltative non riempiono automaticamente sezioni senza fotografia nel mockup.

## Elevation & Depth

Gerarchia affidata soprattutto a campiture, bordi sottili e spazio. Conservare i trattamenti dei componenti esistenti senza introdurre nuove ombre decorative.

## Shapes

Base conserva bordi di sezione diritti; Tagli di luce e Vicina impiegano un solo taglio obliquo per transizione. Tutti condividono il footer scuro con bordo superiore curvo. Foto e pulsanti mantengono le proprie forme, indipendenti dai bordi delle sezioni.

## Components

Pulsante primario: azzurro scuro, testo bianco, altezza minima 52px, peso 700, interlinea 1.4, transizione di sfondo e trasformazione .18s. Il secondario ha fondo bianco e bordo azzurro. Focus visibile con colore del collegamento.

Card pacchetti: superficie azzurro tenue, bordo leggero, titoli Source Sans 3, prezzo Georgia. Il prezzo assente usa una richiesta di informazioni, non zero. Filtri e pulsante per mostrare tutti agiscono sul catalogo reale.

FAQ: righe trasparenti sulla campitura oro, apertura nativa tramite details/summary. I collegamenti telefonici di servizio leggono il contatto configurato.

Avvisi negli orari: evidenza per data singola o intervallo inclusivo nel fuso WordPress. Navigazione e contenuti mantengono link reali a pacchetti, Pap test, referti e contatti.

## Do's and Don'ts

- Conservare palette, ruoli tipografici e tre layout approvati.
- Conservare focus visibile, adattamento mobile e riduzione del movimento.
- Dichiarare le scene illustrative generate e consentirne la sostituzione con foto reali.
- Non introdurre palette alternative, modalità scura o sfondi individuali nelle FAQ.
- Non trasformare asset e varianti di studio storiche in nuove opzioni del prodotto.
