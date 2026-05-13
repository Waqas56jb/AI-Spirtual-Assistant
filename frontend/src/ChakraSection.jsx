/** Seven chakras: bija mantra, gifts, suggested asana — IT / EN labels for iltuoangelo audience */
const CHAKRAS = [
  {
    id: 'muladhara',
    nameIt: 'Muladhara',
    nameEn: 'Root',
    color: '#c62828',
    bija: 'LAM (लं)',
    mantra: 'Ripeti mentalmente LAM con consapevolezza della radice.',
    gift: 'Radicamento, sicurezza, appartenenza alla Terra.',
    asana: 'Tadasana (montagna), Malasana.',
  },
  {
    id: 'svadhisthana',
    nameIt: 'Svādhisthāna',
    nameEn: 'Sacral',
    color: '#f57c00',
    bija: 'VAM (वं)',
    mantra: 'Ripeti VAM dolcemente, lasciando fluire creatività ed emozione.',
    gift: 'Piacere sano, creatività, flusso emotivo.',
    asana: 'Baddha Koṇāsana, movimenti fluidi di bacino.',
  },
  {
    id: 'manipura',
    nameIt: 'Maṇipūra',
    nameEn: 'Solar plexus',
    color: '#fbc02d',
    bija: 'RAM (रं)',
    mantra: 'Ripeti RAM per accendere la volontà e la dignità personale.',
    gift: 'Forza interiore, autostima, trasformazione.',
    asana: 'Navāsana (barca), twist delicati.',
  },
  {
    id: 'anahata',
    nameIt: 'Anāhata',
    nameEn: 'Heart',
    color: '#43a047',
    bija: 'YAM (यं)',
    mantra: 'Ripeti YAM aprendo il petto verso compassione e perdono.',
    gift: 'Amore incondizionato, guarigione del cuore.',
    asana: 'Matsyāsana leggero, Ustrāsana (cammello) con guida.',
  },
  {
    id: 'vishuddha',
    nameIt: 'Viśuddha',
    nameEn: 'Throat',
    color: '#039be5',
    bija: 'HAM (हं)',
    mantra: 'Ripeti HAM onorando la tua verità autentica.',
    gift: 'Espressione chiara, ascolto profondo, verità.',
    asana: 'Matsyāsana (pesce), allungamento del collo con attenzione.',
  },
  {
    id: 'ajna',
    nameIt: 'Ājñā',
    nameEn: 'Third eye',
    color: '#5e35b1',
    bija: 'AH AUM',
    mantra: 'Ripeti AH AUM nel terzo occhio, con respiro lento e mente raccolta.',
    gift: 'Intuizione, visione interiore, discernimento.',
    asana: 'Balāsana con consapevolezza del terzo occhio.',
  },
  {
    id: 'sahasrara',
    nameIt: 'Sahasrāra',
    nameEn: 'Crown',
    color: '#8e24aa',
    bija: 'OGUM SATYAM AUM',
    mantra: 'Ripeti OGUM SATYAM AUM, lasciando risuonare la verità e la connessione divina.',
    gift: 'Unità spirituale, pace, illuminazione.',
    asana: 'Sukhāsana meditazione, Śavāsana integrativa.',
  },
];

export function ChakraSection() {
  return (
    <section id="chakras">
      <div className="chakras-header reveal">
        <div className="section-label">Energia &amp; Meditazione</div>
        <h2 className="section-title">I 7 Chakra — bija mantra &amp; pratica</h2>
        <div className="divider" />
        <p className="section-desc">
          Un percorso guidato: per ogni chakra trovi il <strong>beeja mantra</strong>, i{' '}
          <strong>doni</strong> energetici e un <strong>suggerimento di asana</strong>. Medita un chakra alla volta,
          con respiro lento e presenza angelica.
        </p>
      </div>
      <div className="chakras-grid">
        {CHAKRAS.map((c, i) => (
          <article key={c.id} className={`chakra-card reveal reveal-delay-${(i % 5) + 1}`}>
            <div className="chakra-visual" style={{ '--chakra': c.color }} aria-hidden>
              <span className="chakra-dot" />
              <span className="chakra-ring" />
            </div>
            <h3 className="chakra-title">
              {c.nameIt} <span className="chakra-sub">({c.nameEn})</span>
            </h3>
            <p className="chakra-bija">
              <strong>Bija:</strong> {c.bija}
            </p>
            <p className="chakra-mantra">{c.mantra}</p>
            <p className="chakra-gift">
              <strong>Doni:</strong> {c.gift}
            </p>
            <p className="chakra-asana">
              <strong>Asana suggerita:</strong> {c.asana}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
