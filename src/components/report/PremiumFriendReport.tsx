'use client';
import { FriendFull } from '../../types/report';
import { SafeShareCard } from '../ui/SafeShareCard';
import { Chapter, CopyScript, PremiumReport } from './PremiumReport';

const chapters = ['Your friendship read', 'The evidence', 'Your next move', 'Words for both of you', 'Your next 7 days', 'Keep what works']
  .map((title, i) => ({ id: 'friend-chapter-' + (i + 1), title }));

export function PremiumFriendReport({ result: r }: { result: FriendFull }) {
  const chapter = (i: number, children: React.ReactNode, eyebrow?: string) => <Chapter chapter={chapters[i - 1]} index={i} eyebrow={eyebrow}>{children}</Chapter>;
  const rec = r.recommendation;
  const groups = [{ label: 'Time together', ids: [0, 3] }, { label: 'Everyday contact', ids: [1, 6] }, { label: 'Support & closeness', ids: [2, 5] }, { label: 'Repair & limits', ids: [4, 7] }];
  return <PremiumReport title={r.name} summary={r.previewSummary} mode="friend" chapters={chapters} compactContents>
    {chapter(1, <>
      <div className="design-paper premium-short">
        <p className="eyebrow">YOUR SHARED PREFERENCES</p>
        <div className="premium-match"><strong>{r.matches}<small> / 8</small></strong><span>Person 1 ✿ Person 2</span></div>
        <div className="premium-match-track" role="img" aria-label={r.matches + ' of eight preferences match'}><span style={{ width: r.matches / 8 * 100 + '%' }} /></div>
        <h3>{r.summary}</h3><p>{r.explanation}</p>
        <p className="small-copy">This count describes matching choices. It does not score friendship quality or how well you know each other.</p>
      </div>
      <div className="design-paper tint-1"><p className="eyebrow">ONE USEFUL STARTING POINT</p><h3>{rec.title}</h3><p>{rec.reason}</p><p className="small-copy">Person 1 started the quiz. Person 2 used the invitation. These roles stay the same in both reports.</p></div>
    </>, 'WHY THIS PATTERN')}
    {chapter(2, <>
      <div className="analysis-findings">{r.findings.map(finding => <article className="design-paper analysis-finding" key={finding.id}>
        <p className="eyebrow">WHAT THE COMBINATION SUGGESTS</p><h3>{finding.title}</h3><p>{finding.interpretation}</p>
        <ul>{finding.evidence.map(ref => <li key={ref.questionId}><span>Q{ref.questionId}</span><div><blockquote>Person 1: “{ref.person1}”</blockquote><blockquote>Person 2: “{ref.person2}”</blockquote></div></li>)}</ul>
      </article>)}</div>
      <div className="premium-glance friend-glance">{groups.map(group => <article className="design-paper" key={group.label}><p className="eyebrow">{group.label}</p><strong>{group.ids.filter(i => r.rows[i].same).length} / 2 shared</strong><p>{group.ids.map(i => r.rows[i].category).join(' · ')}</p></article>)}</div>
      <details className="design-paper premium-answer-detail"><summary>All eight answers at a glance</summary><div className="premium-answer-table"><table><thead><tr><th>Question</th><th>Person 1</th><th>Person 2</th></tr></thead><tbody>{r.rows.map(row => <tr key={row.questionId} className={row.same ? 'shared' : 'different'}><th scope="row">{row.category}</th><td>{row.a}</td><td>{row.b}</td></tr>)}</tbody></table></div></details>
      <div className="integrated-section-intro"><h3>All eight preferences, explained</h3><p>These describe what you each prefer. Compare an actual example before treating a possible misunderstanding as something that has happened.</p></div>
      <div className="friend-evidence-grid">{r.rows.map(row => <article className="design-paper comparison-card friend-pair-read" key={row.questionId} data-question={row.questionId}>
        <p className="eyebrow">Q{row.questionId} · {row.category} · {row.same ? 'SHARED CHOICE' : 'DIFFERENT CHOICES'}</p><h3>{row.title}</h3>
        <div className="partner-columns"><div><span>PERSON 1</span><p>“{row.a}”</p><p className="small-copy">This choice emphasizes {row.person1Need}.</p></div><div><span>PERSON 2</span><p>“{row.b}”</p><p className="small-copy">This choice emphasizes {row.person2Need}.</p></div></div>
        <p>{row.opportunity}</p><div className="premium-observe"><p><strong>Try together:</strong> {row.agreement}</p></div>
      </article>)}</div>
    </>, 'ALL EIGHT REVEALS')}
    {chapter(3, <>
      <article className="design-paper focused-action friend-recommendation"><p className="eyebrow">YOUR ONE RECOMMENDED FIRST STEP</p><h3>{rec.title}</h3><p className="analysis-action">{rec.action}</p>
        <div className="analysis-basis"><p className="eyebrow">WHY START HERE</p><p>{rec.contextReason}</p>{rec.evidence.map(ref => <p key={ref.questionId}><strong>Q{ref.questionId} · {ref.category}:</strong> Person 1 chose “{ref.person1}”; Person 2 chose “{ref.person2}”.</p>)}</div>
        <p><strong>Notice next:</strong> {rec.progress}</p><p className="small-copy">If you already have a workable agreement about this, keep it. Choose another relevant preference from the evidence rather than forcing a problem.</p>
      </article>
    </>)}
    {chapter(4, <>
      <div className="integrated-section-intro"><p>Start with your own opening below, then listen to the other person. Both requests deserve room; neither person is assigned the job of changing alone.</p></div>
      <div className="friend-direction-scripts">{r.scripts.slice(0, 2).map(script => <CopyScript key={script.title} title={script.title} text={script.text} note={script.when} />)}</div>
      <div className="design-paper integrated-talk"><h3>Make a request you can both understand</h3><dl><div><dt>Ask</dt><dd>Check what the preference means in a real situation, and whether there is room to talk now.</dd></div><div><dt>Agree</dt><dd>{rec.action}</dd></div><div><dt>Return</dt><dd>{r.rows[4].agreement} You do not need to create a disagreement to discuss how a future repair could work.</dd></div></dl></div>
      <div className="integrated-section-intro"><h3>For support, repair, and limits</h3><p>Use these when the situation actually applies. A selected preference does not establish a problem in that area.</p></div>
      <div className="premium-stack">{r.scripts.slice(2).map(script => <CopyScript key={script.title} title={script.title} text={script.text} note={script.when} />)}</div>
      <div className="integrated-section-intro"><p className="eyebrow">AFTER YOU TALK</p><h3>What the follow-through would look like</h3></div><div className="integrated-response-stack">{r.responseGuide.map(item => <article className={'design-paper premium-response ' + item.type} key={item.type}><h3>{item.title}</h3><p>{item.meaning}</p><p><strong>Next:</strong> {item.action}</p></article>)}</div>
    </>, 'FIND YOUR WORDS')}
    {chapter(5, <>
      <div className="design-paper integrated-week-intro"><p>One small shared adjustment, with time to see whether it helps. These are invitations to understand each other; there is no hidden test or required deadline.</p></div>
      <div className="design-paper premium-days friend-daily-plan">{r.sevenDayPlan.map(day => <article key={day.day}><span>Day {day.day}</span><div><h3>{day.title}</h3><p>{day.action}</p><p className="small-copy"><strong>Ask:</strong> {day.question}</p></div></article>)}</div>
      <div className="design-paper tint-2"><p className="eyebrow">YOUR CHECKPOINT</p><ul className="analysis-outcomes premium-bullets"><li><strong>Progress:</strong> {rec.progress}</li><li><strong>Still unclear:</strong> {rec.unresolved}</li><li><strong>No relevant opportunity:</strong> leave the outcome open. A hypothetical preference is not evidence of behavior.</li><li><strong>Reconsider the arrangement:</strong> {rec.reconsider}</li></ul></div>
    </>, 'YOUR NEXT SEVEN DAYS')}
    {chapter(6, <>
      <div className="design-paper"><h3>{r.strengths.length ? 'Build on what you share' : 'Make room for different preferences'}</h3><p>{r.strengths.length ? 'Keep a shared preference you both enjoy. Similar choices still leave room for different reasons.' : 'None of the eight choices match exactly. The options below are possible shared adjustments, not invented agreements.'}</p><ul className="premium-bullets">{(r.strengths.length ? r.strengths : r.differences).map(row => <li key={row.questionId}><strong>{row.category}:</strong> {row.agreement}</li>)}</ul></div>
      <div className="design-paper"><h3>A plan you would both enjoy</h3><p>{r.rows[0].agreement}</p><p>{r.rows[3].agreement}</p><p className="small-copy">Choose one plan that fits both budgets, schedules, and energy levels.</p></div>
      <div className="design-paper"><h3>Keep the conversation useful</h3><ol className="premium-questions">{r.checkpoint.map(question => <li key={question}>{question}</li>)}</ol></div>
      <details className="design-paper premium-answer-detail"><summary>If it helps, keep going over the next month</summary><div className="focused-details-body premium-stack"><p><strong>Week 2:</strong> Try the same small agreement in another relevant situation. Check whether both still choose it.</p><p><strong>Week 3:</strong> {r.rows[7].agreement}</p><p><strong>Week 4:</strong> Each name one useful adjustment to keep and one that needs changing. A retake is useful only if preferences actually changed.</p></div></details>
      <details className="design-paper premium-answer-detail"><summary>How this report was made · Method & limits</summary><div className="focused-details-body premium-stack"><p>{r.method}</p><p>{r.limitation}</p><p>The ten broad types describe answer combinations. Exact shared-choice count, broad type, and the first recommended conversation are separate outputs. Person 1 remains the initiator and Person 2 the invited friend.</p><p>{rec.selectionReason}</p></div></details>
    </>, 'WHAT WORKS BETWEEN YOU')}
    <SafeShareCard title={r.name} symbol="✳" mode="friend" caption={r.matches + ' / 8 shared preferences · a little new lore'} path="/friend" />
  </PremiumReport>;
}
