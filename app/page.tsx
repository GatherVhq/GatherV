'use client'
import { useState } from 'react'

const STATEMENTS = [
  { text: "I am an introvert who recharges alone", count: 48291, category: "Personality" },
  { text: "I feel more alive at night than in the morning", count: 31847, category: "Lifestyle" },
  { text: "I have never broken a bone in my life", count: 29103, category: "Health" },
  { text: "I love durian and would eat it every day", count: 8472, category: "Food" },
  { text: "I am INFP — the idealist", count: 22614, category: "MBTI" },
  { text: "I was born under Aries", count: 19203, category: "Horoscope" },
  { text: "I prefer bread over rice", count: 41829, category: "Food" },
  { text: "I am vegetarian for over 3 years", count: 12847, category: "Lifestyle" },
  { text: "I am taller than 180cm", count: 7391, category: "Physical" },
  { text: "I cry at movies more than I admit", count: 63741, category: "Emotion" },
]

const TAGS = [
  "I am INFP", "I love durian", "I am vegetarian",
  "I was born under Aries", "I am over 180cm", "I have blue eyes",
  "I am an introvert", "I love bread more than rice"
]

function getRarity(count: number) {
  if (count > 50000) return { label: "Very common", color: "#6fcf97", pct: 92 }
  if (count > 20000) return { label: "Common", color: "#6fcf97", pct: 72 }
  if (count > 8000) return { label: "Uncommon", color: "#56ccf2", pct: 48 }
  if (count > 2000) return { label: "Rare", color: "#f2c94c", pct: 24 }
  if (count > 500) return { label: "Ultra rare", color: "#eb5757", pct: 8 }
  return { label: "One in a million", color: "#9b51e0", pct: 2 }
}

function formatNum(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : n.toString()
}

export default function Home() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ text: string; count: number } | null>(null)
  const [voted, setVoted] = useState(false)
  const [statements, setStatements] = useState(STATEMENTS)
  const [totalThoughts, setTotalThoughts] = useState(2885)
  const [totalVotes, setTotalVotes] = useState(9921)
  const [votedCards, setVotedCards] = useState<Set<number>>(new Set())

  function discover() {
    if (!input.trim()) return
    const existing = statements.find(s =>
      s.text.toLowerCase().includes(input.toLowerCase().split(' ').slice(0, 3).join(' '))
    )
    const count = existing ? existing.count : Math.floor(Math.random() * 45000) + 300
    const text = existing ? existing.text : input
    if (!existing) setTotalThoughts(t => t + 1)
    setResult({ text, count })
    setVoted(false)
  }

  function castVote() {
    if (!result || voted) return
    setResult(r => r ? { ...r, count: r.count + 1 } : r)
    setVoted(true)
    setTotalVotes(v => v + 1)
  }

  function voteCard(idx: number) {
    if (votedCards.has(idx)) return
    setVotedCards(prev => new Set(prev).add(idx))
    setStatements(prev => prev.map((s, i) => i === idx ? { ...s, count: s.count + 1 } : s))
    setTotalVotes(v => v + 1)
  }

  const rarity = result ? getRarity(result.count) : null

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2.5rem' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1a3a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3" stroke="#6fcf97" strokeWidth="1.5"/>
            <circle cx="6" cy="16" r="2.5" stroke="#6fcf97" strokeWidth="1.5"/>
            <circle cx="18" cy="16" r="2.5" stroke="#6fcf97" strokeWidth="1.5"/>
            <line x1="12" y1="11" x2="6" y2="13.5" stroke="#6fcf97" strokeWidth="1"/>
            <line x1="12" y1="11" x2="18" y2="13.5" stroke="#6fcf97" strokeWidth="1"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, color: '#e8f5ee' }}>GatherV</div>
          <div style={{ fontSize: 11, color: '#6fcf97', letterSpacing: '0.1em', textTransform: 'uppercase' }}>A new map to meaning</div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 38, lineHeight: 1.15, marginBottom: '1rem' }}>
          You&apos;re not alone —<br />
          <em style={{ color: '#6fcf97' }}>you just haven&apos;t seen<br />the data yet.</em>
        </h1>
        <p style={{ fontSize: 15, color: '#9dbfad', lineHeight: 1.7 }}>
          Type one true thing about yourself.<br />See how many people on earth share it.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
        {[
          { num: totalThoughts.toLocaleString(), label: 'Thoughts shared' },
          { num: totalVotes.toLocaleString(), label: 'Me too votes' },
          { num: '147', label: 'Countries' },
        ].map(s => (
          <div key={s.label}>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 28, color: '#6fcf97' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: '#9dbfad', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: '#1a3a2a', marginBottom: '2.5rem' }} />

      {/* Input */}
      <p style={{ fontSize: 13, color: '#9dbfad', marginBottom: 10, textAlign: 'center' }}>Type anything true about yourself</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && discover()}
          placeholder="I am 180cm and I love durian…"
          maxLength={120}
          style={{
            flex: 1, padding: '12px 16px',
            background: '#0f2318', border: '1px solid #1a3a2a',
            borderRadius: 12, color: '#e8f5ee', fontSize: 14,
            outline: 'none', fontFamily: 'DM Sans, sans-serif'
          }}
        />
        <button
          onClick={discover}
          style={{
            padding: '12px 20px', background: '#2d7a52',
            color: '#e8f5ee', border: 'none', borderRadius: 12,
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif'
          }}
        >
          Discover →
        </button>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem' }}>
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setInput(tag)}
            style={{
              padding: '6px 12px', border: '1px solid #1a3a2a',
              borderRadius: 20, fontSize: 12, color: '#9dbfad',
              background: 'transparent', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Result */}
      {result && rarity && (
        <div style={{ background: '#0f2318', border: '1px solid #1a3a2a', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'Instrument Serif, serif', fontSize: 17, fontStyle: 'italic', marginBottom: '1rem', lineHeight: 1.4 }}>
            &ldquo;{result.text}&rdquo;
          </p>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 52, color: '#6fcf97', lineHeight: 1 }}>
            {result.count.toLocaleString()}
          </div>
          <p style={{ fontSize: 13, color: '#9dbfad', marginBottom: '1rem' }}>
            people on GatherV share this
          </p>
          <div style={{ height: 4, background: '#1a3a2a', borderRadius: 2, marginBottom: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${rarity.pct}%`, background: rarity.color, borderRadius: 2, transition: 'width 1s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9dbfad', marginBottom: '1rem' }}>
            <span>Ultra rare</span><span>Very common</span>
          </div>
          <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: '#1a3a2a', color: rarity.color, marginBottom: '1.25rem' }}>
            {rarity.label}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={castVote}
              style={{
                flex: 1, padding: '10px 0',
                background: voted ? '#1a3a2a' : '#2d7a52',
                color: voted ? '#6fcf97' : '#e8f5ee',
                border: 'none', borderRadius: 10,
                fontSize: 13, fontWeight: 500, cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              {voted ? '✓ You\'re one of them' : '♥ Me too'}
            </button>
            <button
              style={{
                padding: '10px 16px', background: 'transparent',
                color: '#9dbfad', border: '1px solid #1a3a2a',
                borderRadius: 10, fontSize: 13, cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif'
              }}
            >
              Share
            </button>
          </div>
        </div>
      )}

      {/* Feed */}
      <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9dbfad', textAlign: 'center', marginBottom: '1rem' }}>
        Recent thoughts from around the world
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {statements.slice(0, 6).map((s, i) => (
          <div key={i} style={{ background: '#0f2318', border: '1px solid #1a3a2a', borderRadius: 14, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, lineHeight: 1.4, marginBottom: 3 }}>&ldquo;{s.text}&rdquo;</p>
              <p style={{ fontSize: 11, color: '#9dbfad' }}>{s.category}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, color: '#6fcf97' }}>{formatNum(s.count)}</div>
              <button
                onClick={() => voteCard(i)}
                style={{
                  padding: '4px 10px', borderRadius: 20, fontSize: 11,
                  border: '1px solid #1a3a2a', cursor: 'pointer',
                  background: votedCards.has(i) ? '#1a3a2a' : 'transparent',
                  color: votedCards.has(i) ? '#6fcf97' : '#9dbfad',
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                {votedCards.has(i) ? '✓ me too' : 'me too'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #1a3a2a' }}>
        <p style={{ fontSize: 11, color: '#9dbfad' }}>Anonymous · No account needed · Your data is never sold</p>
      </div>

    </main>
  )
}
